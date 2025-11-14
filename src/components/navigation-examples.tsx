import React from 'react'
import { SmartBreadcrumb } from './ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

// Example component showcasing the enhanced navigation features
export function NavigationExamples() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Enhanced Navigation System</h1>
        <p className="text-muted-foreground mb-8">
          Modern navigation with glass morphism, smooth animations, and smart breadcrumbs
        </p>

        {/* Navigation Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Navigation Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🎨 Modern Design</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Glass morphism effects with backdrop blur</li>
                  <li>• Amber minimal theme integration</li>
                  <li>• Smooth hover animations and transitions</li>
                  <li>• Active state indicators</li>
                  <li>• Responsive design for all screen sizes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🔍 Enhanced Search</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Integrated search bar in navigation</li>
                  <li>• Focus animations and visual feedback</li>
                  <li>• Mobile-optimized search experience</li>
                  <li>• Search query handling and routing</li>
                  <li>• Keyboard shortcuts support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>👤 User Avatar Dropdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Profile avatar with fallback initials</li>
                  <li>• Dropdown menu with user actions</li>
                  <li>• Profile, favorites, and settings links</li>
                  <li>• Admin dashboard access for admins</li>
                  <li>• Secure logout functionality</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📱 Mobile Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Animated hamburger menu icon</li>
                  <li>• Full-screen mobile overlay</li>
                  <li>• Staggered animation for menu items</li>
                  <li>• Touch-friendly button sizes</li>
                  <li>• Escape key and backdrop close</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Breadcrumb Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Smart Breadcrumb System</h2>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Breadcrumb</CardTitle>
              </CardHeader>
              <CardContent>
                <SmartBreadcrumb />
                <p className="text-sm text-muted-foreground mt-2">
                  Automatically detects current route and builds breadcrumb navigation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Breadcrumb Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Automatic Route Detection:</strong> Builds breadcrumbs from current URL</li>
                  <li>• <strong>Smart Truncation:</strong> Shows ellipsis for long paths</li>
                  <li>• <strong>Icon Support:</strong> Home icon and custom route icons</li>
                  <li>• <strong>Accessibility:</strong> Proper ARIA labels and semantic HTML</li>
                  <li>• <strong>Customizable:</strong> Override routes and labels as needed</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Animation Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Animation System</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Hover Effects</h3>
                <p className="text-sm text-muted-foreground">
                  Smooth scale and color transitions on hover
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-amber-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Fade In Up</h3>
                <p className="text-sm text-muted-foreground">
                  Staggered animations for mobile menu items
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Glass Effects</h3>
                <p className="text-sm text-muted-foreground">
                  Backdrop blur and glow effects
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Accessibility Features</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Keyboard Navigation</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Tab navigation through all interactive elements</li>
                    <li>• Escape key closes mobile menu</li>
                    <li>• Enter/Space activates buttons and links</li>
                    <li>• Focus visible indicators</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Screen Reader Support</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Proper ARIA labels and roles</li>
                    <li>• Semantic HTML structure</li>
                    <li>• Screen reader announcements</li>
                    <li>• Alternative text for icons</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technical Implementation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Technical Implementation</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Frontend</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• React with TypeScript</li>
                    <li>• React Router for navigation</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Radix UI for accessible components</li>
                    <li>• Lucide React for icons</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• CSS custom properties for theming</li>
                    <li>• OKLCH color space for consistency</li>
                    <li>• CSS animations and transitions</li>
                    <li>• Responsive design patterns</li>
                    <li>• Performance optimizations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default NavigationExamples