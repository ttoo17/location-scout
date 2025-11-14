import React, { useState } from 'react'
import PropertyManagement from './PropertyManagement'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Building, 
  Edit, 
  Upload, 
  Tag, 
  Calendar, 
  BarChart3,
  Image as ImageIcon,
  MapPin,
  DollarSign,
  Users,
  Star,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Camera,
  Settings,
  Filter,
  Search,
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  Download
} from 'lucide-react'

// Mock property data for examples
const mockProperties = [
  {
    id: '1',
    title: 'Modern Photography Studio in Makati',
    description: 'A spacious photography studio with professional lighting equipment and clean white walls, perfect for portrait and product photography.',
    location: 'Makati, Metro Manila',
    address: '123 Ayala Avenue, Makati City',
    price: 15000,
    currency: 'PHP',
    images: [
      { id: '1', url: '/api/placeholder/400/300', alt: 'Studio interior', isPrimary: true, order: 1 },
      { id: '2', url: '/api/placeholder/400/300', alt: 'Lighting setup', isPrimary: false, order: 2 },
      { id: '3', url: '/api/placeholder/400/300', alt: 'Equipment area', isPrimary: false, order: 3 }
    ],
    tags: ['studio', 'photography', 'professional', 'lighting', 'makati'],
    amenities: ['Professional Lighting', 'Backdrop System', 'Changing Room', 'Equipment Storage', 'Air Conditioning'],
    specifications: {
      sizeM2: 500,
      maxCapacity: 25,
      powerAmps: 30,
      ceilingHeight: 4,
      parking: true,
      wifi: true,
      airConditioning: true,
      kitchen: false,
      restroom: true,
      security: true
    },
    availability: [
      { date: new Date('2024-12-15'), status: 'available' as const },
      { date: new Date('2024-12-16'), status: 'booked' as const, price: 18000, note: 'Fashion shoot' },
      { date: new Date('2024-12-17'), status: 'blocked' as const, note: 'Maintenance' }
    ],
    status: 'active' as const,
    rating: 4.8,
    reviews: 127,
    views: 2340,
    bookings: 45,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-01'),
    owner: {
      id: '1',
      name: 'Maria Santos',
      email: 'maria@example.com',
      phone: '+63 917 123 4567',
      avatar: '/api/placeholder/40/40'
    }
  },
  {
    id: '2',
    title: 'Rooftop Venue with City Skyline',
    description: 'Stunning rooftop location offering panoramic views of the city skyline, ideal for fashion shoots and commercial photography.',
    location: 'BGC, Taguig',
    address: '456 Bonifacio High Street, BGC',
    price: 12000,
    currency: 'PHP',
    images: [
      { id: '4', url: '/api/placeholder/400/300', alt: 'Rooftop view', isPrimary: true, order: 1 },
      { id: '5', url: '/api/placeholder/400/300', alt: 'City skyline', isPrimary: false, order: 2 }
    ],
    tags: ['rooftop', 'skyline', 'urban', 'fashion', 'commercial', 'bgc'],
    amenities: ['City View', 'Open Air', 'Sunset Views', 'Urban Backdrop', 'Elevator Access'],
    specifications: {
      sizeM2: 200,
      maxCapacity: 30,
      powerAmps: 50,
      ceilingHeight: 0, // Open air
      parking: true,
      wifi: true,
      airConditioning: false,
      kitchen: false,
      restroom: true,
      security: true
    },
    availability: [
      { date: new Date('2024-12-18'), status: 'available' as const },
      { date: new Date('2024-12-19'), status: 'available' as const, price: 15000, note: 'Golden hour premium' }
    ],
    status: 'active' as const,
    rating: 4.9,
    reviews: 203,
    views: 3120,
    bookings: 67,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-11-28'),
    owner: {
      id: '2',
      name: 'Juan dela Cruz',
      email: 'juan@example.com',
      phone: '+63 918 234 5678',
      avatar: '/api/placeholder/40/40'
    }
  },
  {
    id: '3',
    title: 'Industrial Warehouse Space',
    description: 'Raw industrial space with exposed brick walls and high ceilings, great for edgy fashion shoots and music videos.',
    location: 'Quezon City',
    address: '789 Industrial Avenue, QC',
    price: 8000,
    currency: 'PHP',
    images: [
      { id: '6', url: '/api/placeholder/400/300', alt: 'Warehouse interior', isPrimary: true, order: 1 }
    ],
    tags: ['industrial', 'warehouse', 'raw', 'fashion', 'music-video', 'edgy'],
    amenities: ['High Ceilings', 'Exposed Brick', 'Natural Light', 'Loading Dock', 'Large Space'],
    specifications: {
      sizeM2: 800,
      maxCapacity: 50,
      powerAmps: 60,
      ceilingHeight: 6,
      parking: true,
      wifi: false,
      airConditioning: false,
      kitchen: false,
      restroom: true,
      security: false
    },
    availability: [],
    status: 'pending' as const,
    rating: 4.6,
    reviews: 89,
    views: 1560,
    bookings: 23,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-11-25'),
    owner: {
      id: '3',
      name: 'Carlos Mendoza',
      email: 'carlos@example.com',
      phone: '+63 919 345 6789',
      avatar: '/api/placeholder/40/40'
    }
  }
]

// Feature showcase component
const PropertyFeatures: React.FC = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          Property Editor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Complete property information forms</li>
          <li>• Real-time editing and validation</li>
          <li>• Specifications and amenities</li>
          <li>• Location and pricing management</li>
          <li>• Status control (active/inactive)</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Image Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Drag-and-drop image upload</li>
          <li>• Multiple image support</li>
          <li>• Primary image selection</li>
          <li>• Image reordering and deletion</li>
          <li>• Automatic thumbnail generation</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Tag System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Dynamic tag management</li>
          <li>• Autocomplete suggestions</li>
          <li>• Category-based organization</li>
          <li>• Search and filter by tags</li>
          <li>• Popular tags recommendations</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Availability Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Date-specific availability</li>
          <li>• Custom pricing per date</li>
          <li>• Booking status tracking</li>
          <li>• Blocked dates management</li>
          <li>• Notes and special conditions</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Analytics Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• View and booking statistics</li>
          <li>• Revenue tracking</li>
          <li>• Rating and review metrics</li>
          <li>• Performance indicators</li>
          <li>• Trend analysis</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Management Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Bulk operations support</li>
          <li>• Search and filtering</li>
          <li>• Status management</li>
          <li>• Export capabilities</li>
          <li>• Owner information tracking</li>
        </ul>
      </CardContent>
    </Card>
  </div>
)

// Management workflow demo
const ManagementWorkflow: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Property Creation Workflow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">1</span>
            </div>
            <div>
              <h4 className="font-medium">Basic Information</h4>
              <p className="text-sm text-muted-foreground">
                Add title, description, location, and pricing
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">2</span>
            </div>
            <div>
              <h4 className="font-medium">Images & Media</h4>
              <p className="text-sm text-muted-foreground">
                Upload photos and set primary image
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">3</span>
            </div>
            <div>
              <h4 className="font-medium">Specifications</h4>
              <p className="text-sm text-muted-foreground">
                Define size, capacity, and amenities
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">4</span>
            </div>
            <div>
              <h4 className="font-medium">Tags & Categories</h4>
              <p className="text-sm text-muted-foreground">
                Add searchable tags and categories
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">5</span>
            </div>
            <div>
              <h4 className="font-medium">Availability Setup</h4>
              <p className="text-sm text-muted-foreground">
                Configure calendar and pricing
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>Management Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Search className="h-5 w-5 text-primary" />
            <div>
              <h4 className="font-medium">Search & Filter</h4>
              <p className="text-sm text-muted-foreground">Find properties by name, location, or status</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Edit className="h-5 w-5 text-primary" />
            <div>
              <h4 className="font-medium">Inline Editing</h4>
              <p className="text-sm text-muted-foreground">Edit properties without leaving the page</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <BarChart3 className="h-5 w-5 text-primary" />
            <div>
              <h4 className="font-medium">Analytics View</h4>
              <p className="text-sm text-muted-foreground">Track performance and revenue</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <h4 className="font-medium">Availability Management</h4>
              <p className="text-sm text-muted-foreground">Control booking calendar and pricing</p>
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
{`import PropertyManagement from './PropertyManagement'

function AdminPropertyPage() {
  const [properties, setProperties] = useState([])

  const handlePropertySave = (property) => {
    setProperties(prev => 
      prev.map(p => p.id === property.id ? property : p)
    )
    console.log('Property saved:', property)
  }

  const handlePropertyDelete = (propertyId) => {
    setProperties(prev => prev.filter(p => p.id !== propertyId))
    console.log('Property deleted:', propertyId)
  }

  const handleStatusChange = (propertyId, status) => {
    setProperties(prev => 
      prev.map(p => p.id === propertyId ? { ...p, status } : p)
    )
    console.log('Status changed:', propertyId, status)
  }

  return (
    <PropertyManagement
      properties={properties}
      onPropertySave={handlePropertySave}
      onPropertyDelete={handlePropertyDelete}
      onPropertyStatusChange={handleStatusChange}
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
import PropertyManagement from './PropertyManagement'

function PropertyManagementPage() {
  const user = {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: '/avatar.jpg',
    role: 'Property Manager'
  }

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Properties' }
  ]

  return (
    <DashboardLayout
      user={user}
      currentPath="/admin/properties"
      breadcrumbs={breadcrumbs}
    >
      <PropertyManagement
        properties={properties}
        onPropertySave={handlePropertySave}
        onPropertyDelete={handlePropertyDelete}
        onPropertyStatusChange={handleStatusChange}
      />
    </DashboardLayout>
  )
}`}
        </pre>
      </CardContent>
    </Card>
  </div>
)

// Main examples component
export function PropertyManagementExamples() {
  const [properties, setProperties] = useState(mockProperties)
  const [showDemo, setShowDemo] = useState(false)

  const handlePropertySave = (property: any) => {
    setProperties(prev => 
      prev.map(p => p.id === property.id ? property : p)
    )
    console.log('Property saved:', property)
  }

  const handlePropertyDelete = (propertyId: string) => {
    setProperties(prev => prev.filter(p => p.id !== propertyId))
    console.log('Property deleted:', propertyId)
  }

  const handleStatusChange = (propertyId: string, status: any) => {
    setProperties(prev => 
      prev.map(p => p.id === propertyId ? { ...p, status } : p)
    )
    console.log('Status changed:', propertyId, status)
  }

  if (showDemo) {
    return (
      <div className="h-screen p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Property Management Demo</h1>
          <Button onClick={() => setShowDemo(false)} variant="outline">
            Exit Demo
          </Button>
        </div>
        <PropertyManagement
          properties={properties}
          onPropertySave={handlePropertySave}
          onPropertyDelete={handlePropertyDelete}
          onPropertyStatusChange={handleStatusChange}
        />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Property Management Interface</h1>
        <p className="text-muted-foreground mb-8">
          Complete property management system with editor, image upload, tags, and availability calendar
        </p>

        {/* Property Management Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Management Features</h2>
          <PropertyFeatures />
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
                  <CardTitle>Interactive Property Management Demo</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Experience the complete property management interface with real data
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Features to Test:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Property search and filtering</li>
                          <li>• Inline editing and form validation</li>
                          <li>• Image upload and management</li>
                          <li>• Tag and amenity management</li>
                          <li>• Availability calendar setup</li>
                          <li>• Status management</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Sample Properties:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Photography Studio (Active)</li>
                          <li>• Rooftop Venue (Active)</li>
                          <li>• Industrial Warehouse (Pending)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Button onClick={() => setShowDemo(true)} className="w-full" size="lg">
                      <Building className="h-4 w-4 mr-2" />
                      Launch Property Management Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Property Statistics */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Total Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{properties.length}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="default" className="text-xs">
                        {properties.filter(p => p.status === 'active').length} Active
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {properties.filter(p => p.status === 'pending').length} Pending
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Total Views
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {properties.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Across all properties</p>
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
                    <div className="text-2xl font-bold">
                      {properties.reduce((sum, p) => sum + p.bookings, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">Successful bookings</p>
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
                    <div className="text-2xl font-bold">
                      {(properties.reduce((sum, p) => sum + p.rating, 0) / properties.length).toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {properties.reduce((sum, p) => sum + p.reviews, 0)} total reviews
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="workflow" className="space-y-4">
              <ManagementWorkflow />
            </TabsContent>
            
            <TabsContent value="usage" className="space-y-4">
              <UsageExamples />
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Editor Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Real-time form validation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Auto-save functionality</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Rich text descriptions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Specification templates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Bulk editing support</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Image Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                        <span>Drag & drop upload</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                        <span>Image compression</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                        <span>Multiple format support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                        <span>Automatic thumbnails</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                        <span>Image optimization</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tag & Category System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-purple-500" />
                        <span>Autocomplete suggestions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-purple-500" />
                        <span>Popular tags tracking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-purple-500" />
                        <span>Category hierarchies</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-purple-500" />
                        <span>Bulk tag operations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-purple-500" />
                        <span>Tag analytics</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Availability Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span>Calendar integration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span>Dynamic pricing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span>Booking conflicts detection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span>Recurring availability</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span>Blackout dates</span>
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

export default PropertyManagementExamples