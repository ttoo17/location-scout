import React, { useState, useEffect } from 'react'
import { 
  Menu, 
  X, 
  Home, 
  MapPin, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  HelpCircle,
  Shield,
  CreditCard,
  FileText,
  Image,
  MessageSquare,
  Star,
  TrendingUp,
  Activity,
  DollarSign,
  Eye
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from './ui/breadcrumb'
import { cn } from '@/lib/utils'

// Types
interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  badge?: string | number
  children?: NavigationItem[]
  isActive?: boolean
}

interface BreadcrumbItem {
  label: string
  href?: string
}

interface DashboardUser {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
  user: DashboardUser
  currentPath?: string
  breadcrumbs?: BreadcrumbItem[]
  onNavigate?: (path: string) => void
  onLogout?: () => void
}

// Navigation configuration
const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/admin/dashboard',
    isActive: true
  },
  {
    id: 'locations',
    label: 'Locations',
    icon: MapPin,
    badge: '24',
    children: [
      { id: 'all-locations', label: 'All Locations', icon: MapPin, href: '/admin/locations' },
      { id: 'add-location', label: 'Add Location', icon: MapPin, href: '/admin/locations/add' },
      { id: 'categories', label: 'Categories', icon: MapPin, href: '/admin/locations/categories' }
    ]
  },
  {
    id: 'bookings',
    label: 'Bookings',
    icon: Calendar,
    badge: '12',
    children: [
      { id: 'all-bookings', label: 'All Bookings', icon: Calendar, href: '/admin/bookings' },
      { id: 'pending', label: 'Pending', icon: Calendar, href: '/admin/bookings/pending', badge: '5' },
      { id: 'confirmed', label: 'Confirmed', icon: Calendar, href: '/admin/bookings/confirmed' },
      { id: 'completed', label: 'Completed', icon: Calendar, href: '/admin/bookings/completed' }
    ]
  },
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    badge: '156',
    children: [
      { id: 'all-users', label: 'All Users', icon: Users, href: '/admin/users' },
      { id: 'photographers', label: 'Photographers', icon: Users, href: '/admin/users/photographers' },
      { id: 'location-owners', label: 'Location Owners', icon: Users, href: '/admin/users/owners' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    children: [
      { id: 'overview', label: 'Overview', icon: TrendingUp, href: '/admin/analytics' },
      { id: 'revenue', label: 'Revenue', icon: DollarSign, href: '/admin/analytics/revenue' },
      { id: 'performance', label: 'Performance', icon: Activity, href: '/admin/analytics/performance' }
    ]
  },
  {
    id: 'content',
    label: 'Content',
    icon: FileText,
    children: [
      { id: 'reviews', label: 'Reviews', icon: Star, href: '/admin/content/reviews', badge: '8' },
      { id: 'messages', label: 'Messages', icon: MessageSquare, href: '/admin/content/messages', badge: '3' },
      { id: 'media', label: 'Media Library', icon: Image, href: '/admin/content/media' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    children: [
      { id: 'general', label: 'General', icon: Settings, href: '/admin/settings' },
      { id: 'payments', label: 'Payments', icon: CreditCard, href: '/admin/settings/payments' },
      { id: 'security', label: 'Security', icon: Shield, href: '/admin/settings/security' }
    ]
  }
]

// Dashboard stats for demo
const dashboardStats = [
  {
    title: 'Total Revenue',
    value: '₱2,847,500',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: DollarSign
  },
  {
    title: 'Active Bookings',
    value: '24',
    change: '+3',
    changeType: 'positive' as const,
    icon: Calendar
  },
  {
    title: 'Total Locations',
    value: '156',
    change: '+8',
    changeType: 'positive' as const,
    icon: MapPin
  },
  {
    title: 'Page Views',
    value: '45,231',
    change: '-2.1%',
    changeType: 'negative' as const,
    icon: Eye
  }
]

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  user,
  currentPath = '/admin/dashboard',
  breadcrumbs = [{ label: 'Dashboard' }],
  onNavigate,
  onLogout
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(['locations', 'bookings'])
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications] = useState(5)

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
        setMobileMenuOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleNavigation = (href: string) => {
    onNavigate?.(href)
    if (window.innerWidth < 1024) {
      setMobileMenuOpen(false)
    }
  }

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const isActive = item.href === currentPath || item.isActive

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id)
            } else if (item.href) {
              handleNavigation(item.href)
            }
          }}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
            level > 0 && "ml-6 text-sm",
            isActive 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <item.icon className={cn("h-4 w-4", level > 0 && "h-3 w-3")} />
          <span className="flex-1">{item.label}</span>
          
          {item.badge && (
            <Badge 
              variant={isActive ? "secondary" : "outline"} 
              className="text-xs"
            >
              {item.badge}
            </Badge>
          )}
          
          {hasChildren && (
            <div className="ml-auto">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const renderSidebar = () => (
    <div className={cn(
      "bg-background border-r border-border transition-all duration-300",
      sidebarOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MapPin className="h-4 w-4 text-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div>
              <h2 className="font-semibold">Scene Finder</h2>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Search */}
        {sidebarOpen && (
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map(item => renderNavigationItem(item))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        {sidebarOpen ? (
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.role}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="p-1"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  )

  const renderMobileSidebar = () => (
    <div className={cn(
      "fixed inset-0 z-50 lg:hidden",
      mobileMenuOpen ? "block" : "hidden"
    )}>
      <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold">Scene Finder</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map(item => renderNavigationItem(item))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.role}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="p-1"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderHeader = () => (
    <header className="bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Desktop sidebar toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink
                        to={crumb.href}
                        onClick={() => crumb.href && handleNavigation(crumb.href)}
                        className="cursor-pointer"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Help */}
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* User menu */}
          <div className="hidden sm:flex items-center gap-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )

  const renderDashboardGrid = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={cn(
                "text-xs",
                stat.changeType === 'positive' ? "text-green-600" : "text-red-600"
              )}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New booking', details: 'Studio A - Photography Session', time: '2 minutes ago' },
                { action: 'Location added', details: 'Rooftop Venue in BGC', time: '1 hour ago' },
                { action: 'User registered', details: 'john.doe@email.com', time: '3 hours ago' },
                { action: 'Payment received', details: '₱15,000 for Booking #1234', time: '5 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Add New Location
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        {renderSidebar()}
      </div>

      {/* Mobile Sidebar */}
      {renderMobileSidebar()}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderHeader()}
        
        <main className="flex-1 overflow-y-auto p-6">
          {currentPath === '/admin/dashboard' ? renderDashboardGrid() : children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout