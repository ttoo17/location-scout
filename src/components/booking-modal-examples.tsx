import React, { useState } from 'react'
import BookingModal from './BookingModal'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Calendar, 
  MapPin, 
  Star, 
  Users, 
  Zap, 
  Car,
  Clock,
  CreditCard,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

// Mock location data
const mockLocations = [
  {
    id: '1',
    title: 'Modern Photography Studio in Makati',
    heroImage: '/placeholder.svg',
    price: 15000,
    location: 'Makati, Metro Manila',
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
    title: 'Rooftop Venue with City Skyline',
    heroImage: '/placeholder.svg',
    price: 12000,
    location: 'BGC, Taguig',
    rating: 4.9,
    reviews: 203,
    metadata: {
      sizeM2: 200,
      powerAmps: 50,
      maxCrew: 30,
      parking: true
    }
  },
  {
    id: '3',
    title: 'Beach Resort Location',
    heroImage: '/placeholder.svg',
    price: 20000,
    location: 'Batangas',
    rating: 4.7,
    reviews: 156,
    metadata: {
      sizeM2: 1000,
      powerAmps: 40,
      maxCrew: 50,
      parking: true
    }
  }
]

// Example component showcasing the BookingModal
export function BookingModalExamples() {
  const [selectedLocation, setSelectedLocation] = useState<typeof mockLocations[0] | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingHistory, setBookingHistory] = useState<any[]>([])

  const handleBookingConfirm = (booking: any) => {
    setBookingHistory(prev => [...prev, {
      ...booking,
      id: Date.now(),
      locationTitle: selectedLocation?.title,
      status: 'pending',
      createdAt: new Date()
    }])
  }

  const openBookingModal = (location: typeof mockLocations[0]) => {
    setSelectedLocation(location)
    setIsBookingModalOpen(true)
  }

  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">BookingModal with Calendar Integration</h1>
        <p className="text-muted-foreground mb-8">
          Complete booking system with date range picker, availability checking, and pricing calculation
        </p>

        {/* Booking Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Booking Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>📅 Date Range Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Interactive date picker integration</li>
                  <li>• Start and end date validation</li>
                  <li>• Unavailable date blocking</li>
                  <li>• Real-time availability checking</li>
                  <li>• Date range conflict detection</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💰 Dynamic Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Real-time cost calculation</li>
                  <li>• Crew size surcharge handling</li>
                  <li>• Service fee computation</li>
                  <li>• Multi-day booking discounts</li>
                  <li>• Transparent pricing breakdown</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>✅ Form Validation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Required field validation</li>
                  <li>• Email format checking</li>
                  <li>• Date logic validation</li>
                  <li>• Crew capacity warnings</li>
                  <li>• Real-time error feedback</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🔄 Multi-step Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Booking form step</li>
                  <li>• Confirmation review step</li>
                  <li>• Success confirmation step</li>
                  <li>• Progress indication</li>
                  <li>• Back navigation support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📋 Comprehensive Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Contact information capture</li>
                  <li>• Project description fields</li>
                  <li>• Special requests handling</li>
                  <li>• Crew size configuration</li>
                  <li>• Auto-save functionality</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚡ User Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Loading states and feedback</li>
                  <li>• Smooth step transitions</li>
                  <li>• Mobile-responsive design</li>
                  <li>• Accessibility compliance</li>
                  <li>• Error recovery flows</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive Examples</h2>
          
          <Tabs defaultValue="locations" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="locations">Available Locations</TabsTrigger>
              <TabsTrigger value="features">Booking Features</TabsTrigger>
              <TabsTrigger value="history">Booking History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="locations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Select a Location to Book</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Click "Book Now" on any location to open the booking modal
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockLocations.map((location) => (
                      <Card key={location.id} className="overflow-hidden">
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          <img
                            src={location.heroImage}
                            alt={location.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold line-clamp-2 mb-2">{location.title}</h3>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{location.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-amber-400 fill-current" />
                              <span className="text-sm font-medium">{location.rating}</span>
                              <span className="text-sm text-muted-foreground">({location.reviews})</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              ₱{location.price.toLocaleString()}/day
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span>{location.metadata.sizeM2}m²</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{location.metadata.maxCrew} max</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              <span>{location.metadata.powerAmps}A</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Car className="h-3 w-3" />
                              <span>{location.metadata.parking ? 'Parking' : 'No parking'}</span>
                            </div>
                          </div>
                          
                          <Button 
                            onClick={() => openBookingModal(location)}
                            className="w-full"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Now
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Flow Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Booking Form</h4>
                          <p className="text-sm text-muted-foreground">
                            Select dates, crew size, and provide contact information
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Review & Confirm</h4>
                          <p className="text-sm text-muted-foreground">
                            Review booking details and pricing before confirming
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Confirmation</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive booking confirmation and next steps
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Calculation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Base rate (per day)</span>
                        <span>Location specific</span>
                      </div>
                      <div className="flex justify-between text-amber-600">
                        <span>Crew surcharge</span>
                        <span>₱500/person/day (if over limit)</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Service fee</span>
                        <span>10% of subtotal</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-medium">
                        <span>Total</span>
                        <span>Calculated in real-time</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Availability System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Available dates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Unavailable dates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Partially available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span className="text-sm">Past dates (disabled)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Form Validation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Real-time field validation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Email format checking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Date range validation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Availability conflict detection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Required field enforcement</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {bookingHistory.length === 0 
                      ? "No bookings yet. Try booking a location to see it here!"
                      : `${bookingHistory.length} booking${bookingHistory.length > 1 ? 's' : ''} made`
                    }
                  </p>
                </CardHeader>
                <CardContent>
                  {bookingHistory.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No bookings yet</p>
                      <p className="text-sm">Book a location to see your booking history here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookingHistory.map((booking) => (
                        <Card key={booking.id} className="border-l-4 border-l-primary">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{booking.locationTitle}</h4>
                              <Badge variant="secondary">{booking.status}</Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {booking.startDate && new Date(booking.startDate).toLocaleDateString()} - {' '}
                                  {booking.endDate && new Date(booking.endDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{booking.crewSize} people</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                <span>₱{booking.totalCost?.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{booking.createdAt.toLocaleDateString()}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t">
                              <p className="text-sm">
                                <span className="font-medium">Contact:</span> {booking.contactName} ({booking.contactEmail})
                              </p>
                              {booking.projectDescription && (
                                <p className="text-sm mt-1">
                                  <span className="font-medium">Project:</span> {booking.projectDescription.slice(0, 100)}
                                  {booking.projectDescription.length > 100 && '...'}
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
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
                <CardTitle>Calendar Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Date Validation</h4>
                    <p className="text-muted-foreground">
                      Uses date-fns for robust date calculations and validation logic.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Availability Checking</h4>
                    <p className="text-muted-foreground">
                      Real-time availability validation with conflict detection.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Date Range Selection</h4>
                    <p className="text-muted-foreground">
                      Intuitive start/end date picker with smart defaults.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>State Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Form State</h4>
                    <p className="text-muted-foreground">
                      Centralized booking details state with validation tracking.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Multi-step Flow</h4>
                    <p className="text-muted-foreground">
                      Step-based navigation with progress tracking and back navigation.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Error Handling</h4>
                    <p className="text-muted-foreground">
                      Comprehensive error state management with user feedback.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Booking Modal */}
        {selectedLocation && (
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            location={selectedLocation}
            onBookingConfirm={handleBookingConfirm}
          />
        )}
      </div>
    </div>
  )
}

export default BookingModalExamples