import React, { useState, useEffect, useMemo } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  MapPin, 
  Calendar, 
  Eye, 
  Star, 
  Download, 
  Filter, 
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  Zap,
  Globe
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { cn } from '@/lib/utils'
import {
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Bar,
  Area,
  Cell,
  Pie
} from 'recharts'

// Types
interface AnalyticsData {
  overview: OverviewStats
  revenue: RevenueData[]
  bookings: BookingData[]
  locations: LocationStats[]
  users: UserStats[]
  performance: PerformanceMetrics
  trends: TrendData[]
}

interface OverviewStats {
  totalRevenue: number
  revenueChange: number
  totalBookings: number
  bookingsChange: number
  totalLocations: number
  locationsChange: number
  totalUsers: number
  usersChange: number
  averageRating: number
  ratingChange: number
  conversionRate: number
  conversionChange: number
}

interface RevenueData {
  month: string
  revenue: number
  bookings: number
  avgBookingValue: number
}

interface BookingData {
  date: string
  bookings: number
  revenue: number
  status: 'confirmed' | 'pending' | 'cancelled'
}

interface LocationStats {
  id: string
  name: string
  bookings: number
  revenue: number
  rating: number
  views: number
  conversionRate: number
}

interface UserStats {
  month: string
  newUsers: number
  activeUsers: number
  returningUsers: number
}

interface PerformanceMetrics {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  topPages: Array<{ page: string; views: number }>
  topSources: Array<{ source: string; visitors: number }>
}

interface TrendData {
  period: string
  metric: string
  value: number
  change: number
}

// Mock data
const mockAnalyticsData: AnalyticsData = {
  overview: {
    totalRevenue: 2847500,
    revenueChange: 12.5,
    totalBookings: 324,
    bookingsChange: 8.3,
    totalLocations: 156,
    locationsChange: 5.1,
    totalUsers: 2847,
    usersChange: 15.2,
    averageRating: 4.7,
    ratingChange: 0.2,
    conversionRate: 3.4,
    conversionChange: -0.3
  },
  revenue: [
    { month: 'Jan', revenue: 185000, bookings: 24, avgBookingValue: 7708 },
    { month: 'Feb', revenue: 220000, bookings: 28, avgBookingValue: 7857 },
    { month: 'Mar', revenue: 275000, bookings: 35, avgBookingValue: 7857 },
    { month: 'Apr', revenue: 310000, bookings: 42, avgBookingValue: 7381 },
    { month: 'May', revenue: 285000, bookings: 38, avgBookingValue: 7500 },
    { month: 'Jun', revenue: 340000, bookings: 45, avgBookingValue: 7556 },
    { month: 'Jul', revenue: 380000, bookings: 52, avgBookingValue: 7308 },
    { month: 'Aug', revenue: 420000, bookings: 58, avgBookingValue: 7241 },
    { month: 'Sep', revenue: 395000, bookings: 54, avgBookingValue: 7315 },
    { month: 'Oct', revenue: 445000, bookings: 61, avgBookingValue: 7295 },
    { month: 'Nov', revenue: 485000, bookings: 67, avgBookingValue: 7239 },
    { month: 'Dec', revenue: 520000, bookings: 72, avgBookingValue: 7222 }
  ],
  bookings: [
    { date: '2024-12-01', bookings: 12, revenue: 85000, status: 'confirmed' },
    { date: '2024-12-02', bookings: 8, revenue: 62000, status: 'confirmed' },
    { date: '2024-12-03', bookings: 15, revenue: 110000, status: 'confirmed' },
    { date: '2024-12-04', bookings: 10, revenue: 75000, status: 'pending' },
    { date: '2024-12-05', bookings: 18, revenue: 135000, status: 'confirmed' }
  ],
  locations: [
    { id: '1', name: 'Modern Studio Makati', bookings: 45, revenue: 675000, rating: 4.8, views: 2340, conversionRate: 1.9 },
    { id: '2', name: 'Rooftop BGC', bookings: 67, revenue: 804000, rating: 4.9, views: 3120, conversionRate: 2.1 },
    { id: '3', name: 'Industrial QC', bookings: 23, revenue: 184000, rating: 4.6, views: 1560, conversionRate: 1.5 },
    { id: '4', name: 'Garden Tagaytay', bookings: 34, revenue: 510000, rating: 4.7, views: 1890, conversionRate: 1.8 },
    { id: '5', name: 'Beach Batangas', bookings: 56, revenue: 1120000, rating: 4.9, views: 4230, conversionRate: 1.3 }
  ],
  users: [
    { month: 'Jan', newUsers: 145, activeUsers: 890, returningUsers: 234 },
    { month: 'Feb', newUsers: 167, activeUsers: 945, returningUsers: 278 },
    { month: 'Mar', newUsers: 189, activeUsers: 1020, returningUsers: 312 },
    { month: 'Apr', newUsers: 203, activeUsers: 1150, returningUsers: 345 },
    { month: 'May', newUsers: 178, activeUsers: 1080, returningUsers: 389 },
    { month: 'Jun', newUsers: 234, activeUsers: 1280, returningUsers: 423 }
  ],
  performance: {
    pageViews: 45231,
    uniqueVisitors: 12847,
    bounceRate: 34.2,
    avgSessionDuration: 4.3,
    topPages: [
      { page: '/locations', views: 12450 },
      { page: '/search', views: 8930 },
      { page: '/location/modern-studio', views: 6780 },
      { page: '/booking', views: 5670 },
      { page: '/profile', views: 4320 }
    ],
    topSources: [
      { source: 'Google', visitors: 6890 },
      { source: 'Direct', visitors: 3450 },
      { source: 'Facebook', visitors: 1890 },
      { source: 'Instagram', visitors: 1230 },
      { source: 'Referral', visitors: 890 }
    ]
  },
  trends: [
    { period: 'This Week', metric: 'Revenue', value: 125000, change: 15.3 },
    { period: 'This Week', metric: 'Bookings', value: 28, change: 12.0 },
    { period: 'This Week', metric: 'Users', value: 156, change: 8.7 },
    { period: 'This Week', metric: 'Views', value: 3420, change: -2.1 }
  ]
}

// Animated counter component
const AnimatedCounter: React.FC<{
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}> = ({ value, duration = 2000, prefix = '', suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(value * easeOutQuart)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span>
      {prefix}{count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}
    </span>
  )
}

// Stat card component
const StatCard: React.FC<{
  title: string
  value: number
  change: number
  icon: React.ComponentType<{ className?: string }>
  prefix?: string
  suffix?: string
  decimals?: number
}> = ({ title, value, change, icon: Icon, prefix = '', suffix = '', decimals = 0 }) => {
  const isPositive = change > 0
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <AnimatedCounter 
            value={value} 
            prefix={prefix} 
            suffix={suffix} 
            decimals={decimals}
          />
        </div>
        <div className={cn(
          "flex items-center text-xs",
          isPositive ? "text-green-600" : "text-red-600"
        )}>
          {isPositive ? (
            <ArrowUpRight className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 mr-1" />
          )}
          {Math.abs(change)}% from last month
        </div>
      </CardContent>
    </Card>
  )
}

// Data table component
const DataTable: React.FC<{
  data: any[]
  columns: Array<{
    key: string
    label: string
    render?: (value: any, row: any) => React.ReactNode
  }>
  sortable?: boolean
}> = ({ data, columns, sortable = true }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)

  const sortedData = useMemo(() => {
    if (!sortConfig) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])

  const handleSort = (key: string) => {
    if (!sortable) return

    setSortConfig(current => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        }
      }
      return { key, direction: 'asc' }
    })
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            {columns.map(column => (
              <th
                key={column.key}
                className={cn(
                  "text-left p-3 font-medium text-sm",
                  sortable && "cursor-pointer hover:bg-muted"
                )}
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {sortable && sortConfig?.key === column.key && (
                    <div className="text-xs">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index} className="border-b hover:bg-muted/50">
              {columns.map(column => (
                <td key={column.key} className="p-3 text-sm">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Main analytics dashboard component
const AnalyticsDashboard: React.FC<{
  data?: AnalyticsData
  onExport?: (type: 'csv' | 'pdf' | 'excel') => void
  onRefresh?: () => void
}> = ({ 
  data = mockAnalyticsData, 
  onExport,
  onRefresh 
}) => {
  const [timeRange, setTimeRange] = useState('12m')
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    onRefresh?.()
    setIsLoading(false)
  }

  const handleExport = (type: 'csv' | 'pdf' | 'excel') => {
    onExport?.(type)
    // In a real app, this would trigger the actual export
    console.log(`Exporting ${type} report...`)
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="3m">Last 3 months</option>
            <option value="6m">Last 6 months</option>
            <option value="12m">Last 12 months</option>
          </select>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Revenue"
          value={data.overview.totalRevenue}
          change={data.overview.revenueChange}
          icon={DollarSign}
          prefix="₱"
        />
        <StatCard
          title="Total Bookings"
          value={data.overview.totalBookings}
          change={data.overview.bookingsChange}
          icon={Calendar}
        />
        <StatCard
          title="Total Locations"
          value={data.overview.totalLocations}
          change={data.overview.locationsChange}
          icon={MapPin}
        />
        <StatCard
          title="Total Users"
          value={data.overview.totalUsers}
          change={data.overview.usersChange}
          icon={Users}
        />
        <StatCard
          title="Average Rating"
          value={data.overview.averageRating}
          change={data.overview.ratingChange}
          icon={Star}
          decimals={1}
        />
        <StatCard
          title="Conversion Rate"
          value={data.overview.conversionRate}
          change={data.overview.conversionChange}
          icon={Target}
          suffix="%"
          decimals={1}
        />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  name === 'revenue' ? `₱${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : 'Bookings'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bookings vs Revenue */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsBarChart data={data.revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#f59e0b" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Booking Value</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsLineChart data={data.revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Avg Value']} />
                <Line 
                  type="monotone" 
                  dataKey="avgBookingValue" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderLocations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Location Performance</h2>
        <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data.locations}
            columns={[
              { key: 'name', label: 'Location' },
              { 
                key: 'bookings', 
                label: 'Bookings',
                render: (value) => <Badge variant="secondary">{value}</Badge>
              },
              { 
                key: 'revenue', 
                label: 'Revenue',
                render: (value) => `₱${value.toLocaleString()}`
              },
              { 
                key: 'rating', 
                label: 'Rating',
                render: (value) => (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                    {value}
                  </div>
                )
              },
              { 
                key: 'views', 
                label: 'Views',
                render: (value) => value.toLocaleString()
              },
              { 
                key: 'conversionRate', 
                label: 'Conversion',
                render: (value) => `${value}%`
              }
            ]}
          />
        </CardContent>
      </Card>

      {/* Location Revenue Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Distribution by Location</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={data.locations}
                dataKey="revenue"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.locations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Revenue']} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Analytics</h2>

      {/* User Growth */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={data.users}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="newUsers" 
                stroke="#10b981" 
                name="New Users"
              />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                stroke="#f59e0b" 
                name="Active Users"
              />
              <Line 
                type="monotone" 
                dataKey="returningUsers" 
                stroke="#3b82f6" 
                name="Returning Users"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Page Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={data.performance.pageViews} />
            </div>
            <p className="text-sm text-muted-foreground">Total page views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Unique Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={data.performance.uniqueVisitors} />
            </div>
            <p className="text-sm text-muted-foreground">Unique visitors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Bounce Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={data.performance.bounceRate} suffix="%" decimals={1} />
            </div>
            <p className="text-sm text-muted-foreground">Bounce rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Avg Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={data.performance.avgSessionDuration} suffix="m" decimals={1} />
            </div>
            <p className="text-sm text-muted-foreground">Average duration</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages and Sources */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.performance.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{page.page}</span>
                  <Badge variant="secondary">{page.views.toLocaleString()}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.performance.topSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{source.source}</span>
                  <Badge variant="secondary">{source.visitors.toLocaleString()}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reports & Export</h2>

      {/* Export Options */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed revenue breakdown by location, time period, and booking type.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleExport('csv')}>CSV</Button>
              <Button size="sm" variant="outline" onClick={() => handleExport('pdf')}>PDF</Button>
              <Button size="sm" variant="outline" onClick={() => handleExport('excel')}>Excel</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Complete booking history with customer details and status tracking.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleExport('csv')}>CSV</Button>
              <Button size="sm" variant="outline" onClick={() => handleExport('pdf')}>PDF</Button>
              <Button size="sm" variant="outline" onClick={() => handleExport('excel')}>Excel</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              User registration, activity, and engagement analytics.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleExport('csv')}>CSV</Button>
              <Button size="sm" variant="outline" onClick={() => handleExport('pdf')}>PDF</Button>
              <Button size="sm" variant="outline" onClick={() => handleExport('excel')}>Excel</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data.trends}
            columns={[
              { key: 'period', label: 'Period' },
              { key: 'metric', label: 'Metric' },
              { 
                key: 'value', 
                label: 'Value',
                render: (value, row) => {
                  if (row.metric === 'Revenue') return `₱${value.toLocaleString()}`
                  return value.toLocaleString()
                }
              },
              { 
                key: 'change', 
                label: 'Change',
                render: (value) => (
                  <div className={cn(
                    "flex items-center",
                    value > 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {value > 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(value)}%
                  </div>
                )
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="locations">
          {renderLocations()}
        </TabsContent>

        <TabsContent value="users">
          {renderUsers()}
        </TabsContent>

        <TabsContent value="reports">
          {renderReports()}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AnalyticsDashboard