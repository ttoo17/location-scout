import React, { useState } from 'react'
import AnalyticsDashboard from './AnalyticsDashboard'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  LineChart, 
  Activity,
  DollarSign,
  Users,
  MapPin,
  Calendar,
  Eye,
  Star,
  Download,
  RefreshCw,
  Target,
  Clock,
  Globe,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Settings,
  Filter,
  Search
} from 'lucide-react'

// Feature showcase component
const AnalyticsFeatures: React.FC = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Animated Counters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Smooth number animations</li>
          <li>• Customizable duration and easing</li>
          <li>• Prefix and suffix support</li>
          <li>• Decimal precision control</li>
          <li>• Large number formatting</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Interactive Charts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Line, bar, area, and pie charts</li>
          <li>• Responsive design</li>
          <li>• Interactive tooltips</li>
          <li>• Custom color schemes</li>
          <li>• Real-time data updates</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Data Tables
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Sortable columns</li>
          <li>• Custom cell rendering</li>
          <li>• Responsive layout</li>
          <li>• Search and filtering</li>
          <li>• Export capabilities</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• CSV, PDF, Excel formats</li>
          <li>• Custom report generation</li>
          <li>• Scheduled exports</li>
          <li>• Data filtering options</li>
          <li>• Batch processing</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Revenue tracking</li>
          <li>• User engagement metrics</li>
          <li>• Conversion rate analysis</li>
          <li>• Location performance</li>
          <li>• Trend identification</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Real-time Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Live data refresh</li>
          <li>• Automatic updates</li>
          <li>• Change notifications</li>
          <li>• Historical comparisons</li>
          <li>• Alert system</li>
        </ul>
      </CardContent>
    </Card>
  </div>
)

// Analytics workflow demo
const AnalyticsWorkflow: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Analytics Workflow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">1</span>
            </div>
            <div>
              <h4 className="font-medium">Data Collection</h4>
              <p className="text-sm text-muted-foreground">
                Gather metrics from bookings, users, and locations
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">2</span>
            </div>
            <div>
              <h4 className="font-medium">Data Processing</h4>
              <p className="text-sm text-muted-foreground">
                Calculate trends, averages, and performance indicators
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">3</span>
            </div>
            <div>
              <h4 className="font-medium">Visualization</h4>
              <p className="text-sm text-muted-foreground">
                Display data through charts, tables, and counters
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">4</span>
            </div>
            <div>
              <h4 className="font-medium">Insights & Reports</h4>
              <p className="text-sm text-muted-foreground">
                Generate actionable insights and exportable reports
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>Key Metrics Tracked</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <DollarSign className="h-5 w-5 text-green-500" />
            <div>
              <h4 className="font-medium">Revenue Metrics</h4>
              <p className="text-sm text-muted-foreground">Total revenue, booking values, trends</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Users className="h-5 w-5 text-blue-500" />
            <div>
              <h4 className="font-medium">User Analytics</h4>
              <p className="text-sm text-muted-foreground">New users, retention, engagement</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <MapPin className="h-5 w-5 text-purple-500" />
            <div>
              <h4 className="font-medium">Location Performance</h4>
              <p className="text-sm text-muted-foreground">Bookings, ratings, conversion rates</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Activity className="h-5 w-5 text-orange-500" />
            <div>
              <h4 className="font-medium">Website Analytics</h4>
              <p className="text-sm text-muted-foreground">Page views, bounce rate, sessions</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Usage examples component
const UsageExamples: React.FC = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Basic Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import AnalyticsDashboard from './AnalyticsDashboard'

function AdminAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null)

  const handleExport = (type) => {
    console.log(\`Exporting \${type} report...\`)
    // Implement export logic
  }

  const handleRefresh = () => {
    // Fetch fresh data
    fetchAnalyticsData().then(setAnalyticsData)
  }

  return (
    <AnalyticsDashboard
      data={analyticsData}
      onExport={handleExport}
      onRefresh={handleRefresh}
    />
  )
}`}
        </pre>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>With Dashboard Layout</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import DashboardLayout from './DashboardLayout'
import AnalyticsDashboard from './AnalyticsDashboard'

function AnalyticsPage() {
  const user = {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: '/avatar.jpg',
    role: 'Analytics Manager'
  }

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Analytics' }
  ]

  return (
    <DashboardLayout
      user={user}
      currentPath="/admin/analytics"
      breadcrumbs={breadcrumbs}
    >
      <AnalyticsDashboard
        data={analyticsData}
        onExport={handleExport}
        onRefresh={handleRefresh}
      />
    </DashboardLayout>
  )
}`}
        </pre>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Custom Analytics Data</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`const customAnalyticsData = {
  overview: {
    totalRevenue: 2847500,
    revenueChange: 12.5,
    totalBookings: 324,
    bookingsChange: 8.3,
    // ... other metrics
  },
  revenue: [
    { month: 'Jan', revenue: 185000, bookings: 24 },
    { month: 'Feb', revenue: 220000, bookings: 28 },
    // ... more data points
  ],
  locations: [
    { 
      id: '1', 
      name: 'Studio A', 
      bookings: 45, 
      revenue: 675000,
      rating: 4.8,
      views: 2340,
      conversionRate: 1.9 
    },
    // ... more locations
  ]
}

<AnalyticsDashboard data={customAnalyticsData} />`}
        </pre>
      </CardContent>
    </Card>
  </div>
)

// Main examples component
export function AnalyticsDashboardExamples() {
  const [showDemo, setShowDemo] = useState(false)
  const [exportCount, setExportCount] = useState(0)
  const [refreshCount, setRefreshCount] = useState(0)

  const handleExport = (type: 'csv' | 'pdf' | 'excel') => {
    setExportCount(prev => prev + 1)
    console.log(`Exporting ${type} report...`)
    // Simulate export
    setTimeout(() => {
      alert(`${type.toUpperCase()} report exported successfully!`)
    }, 1000)
  }

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1)
    console.log('Refreshing analytics data...')
  }

  if (showDemo) {
    return (
      <div className="h-screen p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Analytics Dashboard Demo</h1>
          <Button onClick={() => setShowDemo(false)} variant="outline">
            Exit Demo
          </Button>
        </div>
        <AnalyticsDashboard
          onExport={handleExport}
          onRefresh={handleRefresh}
        />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Statistics & Analytics Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Comprehensive analytics system with animated counters, interactive charts, and export functionality
        </p>

        {/* Analytics Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Analytics Features</h2>
          <AnalyticsFeatures />
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive Examples</h2>
          
          <Tabs defaultValue="demo" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
              <TabsTrigger value="usage">Usage Examples</TabsTrigger>
              <TabsTrigger value="features">Feature Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="demo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Analytics Dashboard Demo</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Experience the complete analytics dashboard with real-time charts and data
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Features to Test:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Animated counter components</li>
                          <li>• Interactive charts and graphs</li>
                          <li>• Sortable data tables</li>
                          <li>• Export functionality</li>
                          <li>• Time range filtering</li>
                          <li>• Real-time data refresh</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Analytics Sections:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Overview dashboard</li>
                          <li>• Location performance</li>
                          <li>• User analytics</li>
                          <li>• Reports and exports</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Button onClick={() => setShowDemo(true)} className="w-full" size="lg">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Launch Analytics Dashboard Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Demo Statistics */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Exports Generated
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{exportCount}</div>
                    <p className="text-sm text-muted-foreground">Total exports in demo</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Data Refreshes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{refreshCount}</div>
                    <p className="text-sm text-muted-foreground">Manual refreshes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Chart Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6</div>
                    <p className="text-sm text-muted-foreground">Different chart types</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Metrics Tracked
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15+</div>
                    <p className="text-sm text-muted-foreground">Key performance indicators</p>
                  </CardContent>
                </Card>
              </div>

              {/* Sample Analytics Preview */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Total Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₱2,847,500</div>
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      12.5% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Total Bookings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">324</div>
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      8.3% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Average Rating
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.7</div>
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      0.2 from last month
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="workflow" className="space-y-4">
              <AnalyticsWorkflow />
            </TabsContent>
            
            <TabsContent value="usage" className="space-y-4">
              <UsageExamples />
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Chart Components</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-blue-500" />
                        <span>Line charts for trends</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-green-500" />
                        <span>Bar charts for comparisons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PieChart className="h-4 w-4 text-purple-500" />
                        <span>Pie charts for distributions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-orange-500" />
                        <span>Area charts for volumes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-red-500" />
                        <span>Responsive and interactive</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Data Processing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Real-time calculations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Trend analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Percentage changes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Data aggregation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Performance metrics</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Export Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-blue-500" />
                        <span>CSV format support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-red-500" />
                        <span>PDF report generation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-green-500" />
                        <span>Excel spreadsheet export</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-purple-500" />
                        <span>Custom date ranges</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-orange-500" />
                        <span>Configurable formats</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>User Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span>Fast loading animations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <span>Responsive design</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-green-500" />
                        <span>Real-time updates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-purple-500" />
                        <span>Interactive filtering</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-orange-500" />
                        <span>Intuitive navigation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  )
}

export default AnalyticsDashboardExamples