import React, { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Layout, 
  Sidebar, 
  Grid3X3, 
  Smartphone, 
  Navigation,
  BarChart3,
  Users,
  MapPin,
  Calendar,
  Settings,
  Bell,
  Search,
  Menu,
  ChevronRight,
  Home,
  Eye,
  TrendingUp,
  Activity,
  DollarSign,
  Star,
  MessageSquare,
  Shield,
  CreditCard,
  FileText,
  Image,
  HelpCircle,
  LogOut
} from 'lucide-react'

// Mock user data
const mockUser = {
  id: '1',
  name: 'Admin User',
  email: 'admin@scenefinder.ph',
  avatar: '/api/placeholder/40/40',
  role: 'Super Admin'
}

// Mock page content for different routes
const pageContent = {
  '/admin/dashboard': {
    title: 'Dashboard Overview',
    content: 'Main dashboard with statistics and recent activity'
  },
  '/admin/locations': {
    title: 'Location Management',
    content: 'Manage all photography locations and venues'
  },
  '/admin/bookings': {
    title: 'Booking Management',
    content: 'View and manage all booking requests'
  },
  '/admin/users': {
    title: 'User Management',
    content: 'Manage photographers and location owners'
  },
  '/admin/analytics': {
    title: 'Analytics Dashboard',
    content: 'Revenue, performance, and usage analytics'
  },
  '/admin/settings': {
    title: 'System Settings',
    content: 'Configure system preferences and settings'
  }
}

// Feature showcase component
const DashboardFeatures: React.FC = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sidebar className="h-5 w-5" />
          Collapsible Sidebar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Expandable/collapsible navigation</li>
          <li>• Hierarchical menu structure</li>
          <li>• Active state indicators</li>
          <li>• Badge notifications</li>
          <li>• Search functionality</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3X3 className="h-5 w-5" />
          Widget Grid System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Responsive grid layout</li>
          <li>• Statistics cards</li>
          <li>• Activity timeline</li>
          <li>• Quick action buttons</li>
          <li>• Customizable widgets</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Mobile Responsive
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Mobile-first design</li>
          <li>• Touch-friendly interface</li>
          <li>• Slide-out mobile menu</li>
          <li>• Responsive breakpoints</li>
          <li>• Optimized for tablets</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Breadcrumb Navigation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Hierarchical breadcrumbs</li>
          <li>• Clickable navigation links</li>
          <li>• Current page indication</li>
          <li>• Automatic path generation</li>
          <li>• Accessible navigation</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Header Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Notification center</li>
          <li>• User profile dropdown</li>
          <li>• Global search</li>
          <li>• Help and support</li>
          <li>• Quick settings access</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layout className="h-5 w-5" />
          Layout System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Flexible content area</li>
          <li>• Scrollable main content</li>
          <li>• Fixed header and sidebar</li>
          <li>• Consistent spacing</li>
          <li>• Theme integration</li>
        </ul>
      </CardContent>
    </Card>
  </div>
)

// Navigation structure demo
const NavigationDemo: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Navigation Structure</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-2 bg-primary/10 rounded">
            <Home className="h-4 w-4" />
            <span className="font-medium">Dashboard</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 p-2">
              <MapPin className="h-4 w-4" />
              <span>Locations</span>
              <Badge variant="secondary" className="ml-auto text-xs">24</Badge>
            </div>
            <div className="ml-6 space-y-1">
              <div className="flex items-center gap-2 p-1 text-sm text-muted-foreground">
                <ChevronRight className="h-3 w-3" />
                <span>All Locations</span>
              </div>
              <div className="flex items-center gap-2 p-1 text-sm text-muted-foreground">
                <ChevronRight className="h-3 w-3" />
                <span>Add Location</span>
              </div>
              <div className="flex items-center gap-2 p-1 text-sm text-muted-foreground">
                <ChevronRight className="h-3 w-3" />
                <span>Categories</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 p-2">
              <Calendar className="h-4 w-4" />
              <span>Bookings</span>
              <Badge variant="secondary" className="ml-auto text-xs">12</Badge>
            </div>
            <div className="ml-6 space-y-1">
              <div className="flex items-center gap-2 p-1 text-sm text-muted-foreground">
                <ChevronRight className="h-3 w-3" />
                <span>All Bookings</span>
              </div>
              <div className="flex items-center gap-2 p-1 text-sm text-muted-foreground">
                <ChevronRight className="h-3 w-3" />
                <span>Pending</span>
                <Badge variant="outline" className="ml-auto text-xs">5</Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
            <Badge variant="secondary" className="ml-auto text-xs">156</Badge>
          </div>
          
          <div className="flex items-center gap-2 p-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </div>
          
          <div className="flex items-center gap-2 p-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Widgets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Revenue</span>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-lg font-bold">₱2.8M</div>
            <div className="text-xs text-green-600">+12.5%</div>
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Bookings</span>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-lg font-bold">24</div>
            <div className="text-xs text-green-600">+3</div>
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Locations</span>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-lg font-bold">156</div>
            <div className="text-xs text-green-600">+8</div>
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Views</span>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-lg font-bold">45K</div>
            <div className="text-xs text-red-600">-2.1%</div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-sm">Recent Activity</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>New booking received</span>
              <span className="text-muted-foreground ml-auto">2m ago</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Location approved</span>
              <span className="text-muted-foreground ml-auto">1h ago</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>User registered</span>
              <span className="text-muted-foreground ml-auto">3h ago</span>
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
{`import DashboardLayout from './DashboardLayout'

const user = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  avatar: '/avatar.jpg',
  role: 'Administrator'
}

function AdminDashboard() {
  const [currentPath, setCurrentPath] = useState('/admin/dashboard')
  
  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Current Page' }
  ]

  return (
    <DashboardLayout
      user={user}
      currentPath={currentPath}
      breadcrumbs={breadcrumbs}
      onNavigate={setCurrentPath}
      onLogout={() => console.log('Logout')}
    >
      <div>Your page content here</div>
    </DashboardLayout>
  )
}`}
        </pre>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>With Custom Content</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`<DashboardLayout
  user={user}
  currentPath="/admin/locations"
  breadcrumbs={[
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Locations', href: '/admin/locations' },
    { label: 'Add Location' }
  ]}
  onNavigate={handleNavigation}
  onLogout={handleLogout}
>
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Add New Location</h1>
    <LocationForm />
  </div>
</DashboardLayout>`}
        </pre>
      </CardContent>
    </Card>
  </div>
)

// Main examples component
export function DashboardLayoutExamples() {
  const [currentPath, setCurrentPath] = useState('/admin/dashboard')
  const [showDemo, setShowDemo] = useState(false)

  const getBreadcrumbs = (path: string) => {
    const pathMap: Record<string, any[]> = {
      '/admin/dashboard': [{ label: 'Dashboard' }],
      '/admin/locations': [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Locations' }
      ],
      '/admin/bookings': [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Bookings' }
      ],
      '/admin/users': [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Users' }
      ],
      '/admin/analytics': [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Analytics' }
      ],
      '/admin/settings': [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Settings' }
      ]
    }
    return pathMap[path] || [{ label: 'Dashboard' }]
  }

  const handleNavigation = (path: string) => {
    setCurrentPath(path)
  }

  const handleLogout = () => {
    console.log('Logout clicked')
    alert('Logout functionality would be implemented here')
  }

  if (showDemo) {
    return (
      <div className="h-screen">
        <DashboardLayout
          user={mockUser}
          currentPath={currentPath}
          breadcrumbs={getBreadcrumbs(currentPath)}
          onNavigate={handleNavigation}
          onLogout={handleLogout}
        >
          {currentPath !== '/admin/dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  {pageContent[currentPath as keyof typeof pageContent]?.title || 'Page'}
                </h1>
                <Button onClick={() => setShowDemo(false)} variant="outline">
                  Exit Demo
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    {pageContent[currentPath as keyof typeof pageContent]?.content || 'Page content would go here'}
                  </p>
                  
                  <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Sample Widget</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          This is where page-specific content and widgets would be displayed.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Another Widget</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Each page can have its own custom layout and components.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Third Widget</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          The dashboard layout provides the structure and navigation.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DashboardLayout>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Modern Dashboard Layout</h1>
        <p className="text-muted-foreground mb-8">
          Complete admin dashboard with collapsible sidebar, responsive design, and widget system
        </p>

        {/* Dashboard Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Dashboard Features</h2>
          <DashboardFeatures />
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive Examples</h2>
          
          <Tabs defaultValue="demo" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="usage">Usage Examples</TabsTrigger>
              <TabsTrigger value="features">Feature Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="demo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Dashboard Demo</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Experience the full dashboard layout with navigation, sidebar, and responsive features
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Features to Test:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Collapsible sidebar navigation</li>
                          <li>• Mobile responsive menu</li>
                          <li>• Breadcrumb navigation</li>
                          <li>• Dashboard widgets and stats</li>
                          <li>• Multi-level menu expansion</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Navigation Items:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Dashboard overview</li>
                          <li>• Location management</li>
                          <li>• Booking system</li>
                          <li>• User management</li>
                          <li>• Analytics dashboard</li>
                          <li>• System settings</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Button onClick={() => setShowDemo(true)} className="w-full" size="lg">
                      <Layout className="h-4 w-4 mr-2" />
                      Launch Interactive Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="structure" className="space-y-4">
              <NavigationDemo />
            </TabsContent>
            
            <TabsContent value="usage" className="space-y-4">
              <UsageExamples />
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Responsive Behavior</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Desktop (≥1024px)</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Full sidebar always visible</li>
                          <li>• Collapsible to icon-only mode</li>
                          <li>• Horizontal layout</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Tablet (768px - 1023px)</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Sidebar hidden by default</li>
                          <li>• Overlay menu when opened</li>
                          <li>• Touch-friendly interactions</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Mobile (<768px)</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Full-screen overlay menu</li>
                          <li>• Simplified header layout</li>
                          <li>• Optimized touch targets</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Keyboard navigation support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>ARIA labels and roles</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Focus management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Screen reader compatibility</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>High contrast support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Semantic HTML structure</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>Optimized re-renders</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-green-500" />
                        <span>Smooth animations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-green-500" />
                        <span>Lazy loading support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-green-500" />
                        <span>Efficient search</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Menu className="h-4 w-4 text-green-500" />
                        <span>Minimal DOM updates</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Customization Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-blue-500" />
                        <span>Configurable navigation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layout className="h-4 w-4 text-blue-500" />
                        <span>Custom widget layouts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-blue-500" />
                        <span>Notification preferences</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>Role-based navigation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-blue-500" />
                        <span>Theme customization</span>
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

export default DashboardLayoutExamples