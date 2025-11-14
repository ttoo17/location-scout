import React, { useState } from 'react'
import LocationCardLayouts from './LocationCardLayouts'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

// Mock location data for examples
const mockLocations = [
  {
    id: '1',
    title: 'Stunning Beach Resort with Crystal Clear Waters and White Sand',
    heroImage: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['Beach', 'Resort', 'Swimming Pool', 'Sunset Views', 'Luxury'],
    price: 15000,
    location: 'Boracay, Aklan',
    rating: 4.8,
    reviews: 127,
    metadata: { sizeM2: 500, powerAmps: 30, maxCrew: 25, parking: true }
  },
  {
    id: '2',
    title: 'Historic Spanish Colonial Mansion',
    heroImage: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg'],
    tags: ['Historic', 'Colonial', 'Architecture'],
    price: 8000,
    location: 'Vigan, Ilocos Sur',
    rating: 4.6,
    reviews: 89,
    metadata: { sizeM2: 300, powerAmps: 20, maxCrew: 15, parking: false }
  },
  {
    id: '3',
    title: 'Modern Urban Rooftop with City Skyline',
    heroImage: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['Urban', 'Rooftop', 'Skyline', 'Modern', 'Night Views'],
    price: 12000,
    location: 'Makati, Metro Manila',
    rating: 4.9,
    reviews: 203,
    metadata: { sizeM2: 200, powerAmps: 50, maxCrew: 30, parking: true }
  },
  {
    id: '4',
    title: 'Tropical Mountain Villa with Infinity Pool',
    heroImage: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['Mountain', 'Villa', 'Pool', 'Nature', 'Scenic'],
    price: 18000,
    location: 'Tagaytay, Cavite',
    rating: 4.7,
    reviews: 156,
    metadata: { sizeM2: 400, powerAmps: 40, maxCrew: 20, parking: true }
  },
  {
    id: '5',
    title: 'Rustic Farmhouse with Rice Field Views',
    heroImage: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg'],
    tags: ['Farmhouse', 'Rural', 'Rice Fields', 'Authentic'],
    price: 6000,
    location: 'Banaue, Ifugao',
    rating: 4.5,
    reviews: 78,
    metadata: { sizeM2: 250, powerAmps: 15, maxCrew: 12, parking: false }
  },
  {
    id: '6',
    title: 'Contemporary Art Gallery Space',
    heroImage: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['Gallery', 'Art', 'Contemporary', 'Exhibition'],
    price: 10000,
    location: 'Bonifacio Global City, Taguig',
    rating: 4.4,
    reviews: 92,
    metadata: { sizeM2: 350, powerAmps: 35, maxCrew: 25, parking: true }
  }
]

// Example component showcasing responsive card layouts
export function LocationLayoutsExamples() {
  const [isLoading, setIsLoading] = useState(false)

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Responsive LocationCard Layouts</h1>
        <p className="text-muted-foreground mb-8">
          Grid and list views with skeleton loading states, featured cards, and performance optimization
        </p>

        {/* Layout Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Layout Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>📱 Responsive Design</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Adaptive grid columns (1-4 columns)</li>
                  <li>• Mobile-first responsive breakpoints</li>
                  <li>• Flexible gap spacing options</li>
                  <li>• Optimized for all screen sizes</li>
                  <li>• Touch-friendly interactions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🔄 View Modes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Grid view with customizable columns</li>
                  <li>• Compact list view for browsing</li>
                  <li>• Featured card highlighting</li>
                  <li>• Smooth transitions between views</li>
                  <li>• User preference persistence</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚡ Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• React.memo optimization</li>
                  <li>• Efficient re-render prevention</li>
                  <li>• Memoized sorting and filtering</li>
                  <li>• Lazy loading support</li>
                  <li>• Optimized bundle size</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💀 Skeleton Loading</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Variant-specific skeletons</li>
                  <li>• Shimmer animation effects</li>
                  <li>• Proper content placeholders</li>
                  <li>• Smooth loading transitions</li>
                  <li>• Accessibility compliant</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Smart Sorting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Sort by price, rating, or name</li>
                  <li>• Real-time sorting updates</li>
                  <li>• Memoized for performance</li>
                  <li>• Visual sorting indicators</li>
                  <li>• Persistent sort preferences</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⭐ Featured Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Enhanced visual prominence</li>
                  <li>• Special featured badge</li>
                  <li>• Larger display format</li>
                  <li>• Priority positioning</li>
                  <li>• Custom styling options</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Interactive Examples</h2>
            <Button onClick={simulateLoading} variant="outline">
              Simulate Loading
            </Button>
          </div>
          
          <Tabs defaultValue="default" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="default">Default Grid</TabsTrigger>
              <TabsTrigger value="featured">With Featured</TabsTrigger>
              <TabsTrigger value="columns">Custom Columns</TabsTrigger>
              <TabsTrigger value="loading">Loading States</TabsTrigger>
            </TabsList>
            
            <TabsContent value="default" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Default 3-Column Grid Layout</CardTitle>
                </CardHeader>
                <CardContent>
                  <LocationCardLayouts
                    locations={mockLocations}
                    loading={isLoading}
                    showControls={true}
                    defaultView="grid"
                    gridColumns={3}
                    gap="md"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="featured" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Layout with Featured Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <LocationCardLayouts
                    locations={mockLocations}
                    loading={isLoading}
                    showControls={true}
                    defaultView="grid"
                    gridColumns={3}
                    gap="md"
                    featuredId="1"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="columns" className="space-y-4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>2-Column Layout</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LocationCardLayouts
                      locations={mockLocations.slice(0, 4)}
                      loading={isLoading}
                      showControls={false}
                      defaultView="grid"
                      gridColumns={2}
                      gap="lg"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>4-Column Layout</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LocationCardLayouts
                      locations={mockLocations}
                      loading={isLoading}
                      showControls={false}
                      defaultView="grid"
                      gridColumns={4}
                      gap="sm"
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="loading" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Loading States Demo</CardTitle>
                </CardHeader>
                <CardContent>
                  <LocationCardLayouts
                    locations={mockLocations}
                    loading={true}
                    showControls={true}
                    defaultView="grid"
                    gridColumns={3}
                    gap="md"
                    featuredId="1"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Technical Implementation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Technical Implementation</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Optimizations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">React.memo</h4>
                    <p className="text-muted-foreground">
                      Prevents unnecessary re-renders by comparing props (id, price, rating).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">useMemo</h4>
                    <p className="text-muted-foreground">
                      Memoizes sorted locations to avoid recalculation on every render.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Efficient Updates</h4>
                    <p className="text-muted-foreground">
                      Smart comparison functions prevent cascading re-renders.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Responsive Design</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Breakpoints</h4>
                    <p className="text-muted-foreground">
                      Mobile-first approach with md (768px), lg (1024px), xl (1280px) breakpoints.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Flexible Grid</h4>
                    <p className="text-muted-foreground">
                      CSS Grid with responsive column counts and gap spacing.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Adaptive Layout</h4>
                    <p className="text-muted-foreground">
                      Seamless switching between grid and list views.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage Guide */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Usage Guide</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Basic Usage</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <code className="text-sm">
                      {`<LocationCardLayouts
  locations={locations}
  loading={false}
  showControls={true}
  defaultView="grid"
  gridColumns={3}
  gap="md"
/>`}
                    </code>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">With Featured Card</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <code className="text-sm">
                      {`<LocationCardLayouts
  locations={locations}
  featuredId="location-id"
  gridColumns={2}
  gap="lg"
/>`}
                    </code>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Loading State</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <code className="text-sm">
                      {`<LocationCardLayouts
  locations={[]}
  loading={true}
  gridColumns={3}
/>`}
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default LocationLayoutsExamples