import React from 'react'
import LocationCard from './LocationCard'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

// Mock location data for examples
const mockLocations = [
  {
    id: '1',
    title: 'Stunning Beach Resort with Crystal Clear Waters',
    heroImage: '/placeholder.svg',
    gallery: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    tags: ['Beach', 'Resort', 'Swimming Pool', 'Sunset Views', 'Luxury'],
    price: 15000,
    location: 'Boracay, Aklan',
    rating: 4.8,
    reviews: 127,
    metadata: {
      sizeM2: 500,
      powerAmps: 30,
      maxCrew: 25,
      parking: true
    }
  },
  {
    id: '2',
    title: 'Historic Spanish Colonial Mansion',
    heroImage: '/placeholder.svg',
    gallery: [
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    tags: ['Historic', 'Colonial', 'Architecture'],
    price: 8000,
    location: 'Vigan, Ilocos Sur',
    rating: 4.6,
    reviews: 89,
    metadata: {
      sizeM2: 300,
      powerAmps: 20,
      maxCrew: 15,
      parking: false
    }
  },
  {
    id: '3',
    title: 'Modern Urban Rooftop with City Skyline',
    heroImage: '/placeholder.svg',
    gallery: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    tags: ['Urban', 'Rooftop', 'Skyline', 'Modern', 'Night Views'],
    price: 12000,
    location: 'Makati, Metro Manila',
    rating: 4.9,
    reviews: 203,
    metadata: {
      sizeM2: 200,
      powerAmps: 50,
      maxCrew: 30,
      parking: true
    }
  }
]

// Example component showcasing the enhanced LocationCard features
export function LocationCardExamples() {
  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Enhanced LocationCard System</h1>
        <p className="text-muted-foreground mb-8">
          Advanced image carousel with smooth transitions, swipe gestures, and lazy loading
        </p>

        {/* LocationCard Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">LocationCard Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🎠 Image Carousel</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Smooth slide transitions with CSS transforms</li>
                  <li>• Navigation arrows with hover effects</li>
                  <li>• Dot indicators for direct navigation</li>
                  <li>• Progress bar showing current position</li>
                  <li>• Auto-play with pause on hover</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📱 Touch & Swipe</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Touch-friendly swipe gestures</li>
                  <li>• Minimum swipe distance detection</li>
                  <li>• Smooth touch feedback</li>
                  <li>• Mobile-optimized interactions</li>
                  <li>• Prevents accidental navigation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🔍 Zoom & Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Zoom indicator on hover</li>
                  <li>• Click to open full-screen modal</li>
                  <li>• Image scaling animations</li>
                  <li>• Blur effect during transitions</li>
                  <li>• Loading states with spinners</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚡ Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Lazy loading for non-visible images</li>
                  <li>• Preloading of adjacent images</li>
                  <li>• Optimized image loading strategy</li>
                  <li>• Efficient state management</li>
                  <li>• Smooth 60fps animations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⌨️ Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Keyboard navigation (arrow keys)</li>
                  <li>• Screen reader friendly</li>
                  <li>• Focus management</li>
                  <li>• ARIA labels and descriptions</li>
                  <li>• High contrast support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💫 Advanced Animations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 3D hover effects with mouse tracking</li>
                  <li>• Heart animation with particle effects</li>
                  <li>• Shimmer effects on buttons</li>
                  <li>• Bounce animations for interactions</li>
                  <li>• Smooth scale and shadow transitions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Interactive Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Like/favorite with haptic feedback</li>
                  <li>• Bookmark functionality</li>
                  <li>• Share with Web Share API</li>
                  <li>• Enhanced booking animations</li>
                  <li>• Hover-revealed action buttons</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📊 Enhanced Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Icon-based metadata display</li>
                  <li>• Color-coded status indicators</li>
                  <li>• Hover effects on metadata items</li>
                  <li>• Rating badge on hover</li>
                  <li>• Visual feedback for all states</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Example LocationCards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive Examples</h2>
          <p className="text-muted-foreground">
            Try hovering, clicking, and swiping on the cards below to experience the enhanced features.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Technical Implementation</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Image Carousel Logic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Smooth Transitions</h4>
                    <p className="text-muted-foreground">
                      Uses CSS transforms with 300ms ease-out transitions for smooth sliding effects.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Touch Gestures</h4>
                    <p className="text-muted-foreground">
                      Implements touchstart, touchmove, and touchend events for swipe detection.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Auto-play</h4>
                    <p className="text-muted-foreground">
                      4-second intervals with pause on hover and proper cleanup.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Optimizations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Lazy Loading</h4>
                    <p className="text-muted-foreground">
                      Only loads visible images initially, preloads adjacent images on demand.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">State Management</h4>
                    <p className="text-muted-foreground">
                      Efficient React state updates with useCallback for performance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Memory Management</h4>
                    <p className="text-muted-foreground">
                      Proper cleanup of intervals and event listeners.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Features Demo */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>3D Hover Effects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    Cards respond to mouse movement with 3D tilt effects and enhanced shadows.
                  </p>
                  <ul className="space-y-1">
                    <li>• Mouse tracking for realistic 3D rotation</li>
                    <li>• Perspective transforms with smooth transitions</li>
                    <li>• Enhanced shadow effects on hover</li>
                    <li>• Smooth return to normal state on mouse leave</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Heart Animation System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    Advanced like animation with particle effects and haptic feedback.
                  </p>
                  <ul className="space-y-1">
                    <li>• Bounce animation on like/unlike</li>
                    <li>• Particle explosion effect</li>
                    <li>• Haptic feedback on mobile devices</li>
                    <li>• Color transition and scale effects</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enhanced Action Buttons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    Booking and messaging buttons with advanced feedback systems.
                  </p>
                  <ul className="space-y-1">
                    <li>• Shimmer effects on hover</li>
                    <li>• Loading states with spinners</li>
                    <li>• Success feedback animations</li>
                    <li>• Pulse effects for secondary actions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Metadata Display</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    Icon-based metadata with color coding and hover effects.
                  </p>
                  <ul className="space-y-1">
                    <li>• Icon indicators for each metadata type</li>
                    <li>• Color-coded status (parking, power, etc.)</li>
                    <li>• Hover effects reveal additional details</li>
                    <li>• Consistent visual hierarchy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">How to Use</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Desktop Interactions</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Hover card:</strong> 3D tilt effect and reveal actions</li>
                    <li>• <strong>Click heart:</strong> Like with particle animation</li>
                    <li>• <strong>Click bookmark:</strong> Save for later</li>
                    <li>• <strong>Click share:</strong> Share via Web Share API</li>
                    <li>• <strong>Hover metadata:</strong> Highlight information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Mobile Interactions</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Tap heart:</strong> Like with haptic feedback</li>
                    <li>• <strong>Long press:</strong> Access additional actions</li>
                    <li>• <strong>Swipe gestures:</strong> Navigate images</li>
                    <li>• <strong>Tap share:</strong> Native share dialog</li>
                    <li>• <strong>Touch feedback:</strong> Visual response to taps</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Accessibility</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Keyboard navigation:</strong> Tab through all actions</li>
                    <li>• <strong>Screen readers:</strong> Proper ARIA labels</li>
                    <li>• <strong>Focus indicators:</strong> Clear visual focus</li>
                    <li>• <strong>High contrast:</strong> Accessible color schemes</li>
                    <li>• <strong>Reduced motion:</strong> Respects user preferences</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Browser Support */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Browser Support</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <h4 className="font-semibold mb-2">Chrome</h4>
                  <p className="text-sm text-muted-foreground">90+</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Firefox</h4>
                  <p className="text-sm text-muted-foreground">88+</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Safari</h4>
                  <p className="text-sm text-muted-foreground">14+</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Edge</h4>
                  <p className="text-sm text-muted-foreground">90+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default LocationCardExamples