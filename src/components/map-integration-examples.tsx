import React, { useState } from 'react'
import SearchFilters from './SearchFilters'
import MapView from './MapView'
import LocationCardLayouts from './LocationCardLayouts'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

// Mock location data with coordinates
const mockLocationsWithCoords = [
  {
    id: '1',
    title: 'Modern Photography Studio in Makati',
    heroImage: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg'],
    tags: ['Photography Studio', 'Modern', 'Natural Light'],
    price: 15000,
    location: 'Makati, Metro Manila',
    rating: 4.8,
    reviews: 127,
    metadata: { sizeM2: 500, powerAmps: 30, maxCrew: 25, parking: true },
    latitude: 14.5547,
    longitude: 121.0244
  },
  {
    id: '2',
    title: 'Rooftop Venue with City Skyline',
    heroImage: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['Rooftop', 'Urban', 'Modern'],
    price: 12000,
    location: 'BGC, Taguig',
    rating: 4.9,
    reviews: 203,
    metadata: { sizeM2: 200, powerAmps: 50, maxCrew: 30, parking: true },
    latitude: 14.5176,
    longitude: 121.0509
  },
  {
    id: '3',
    title: 'Industrial Warehouse Space',
    heroImage: '/placeholder.svg',
    gallery: ['/placeholder.svg'],
    tags: ['Warehouse', 'Industrial Design', 'Video Production'],
    price: 8000,
    location: 'Quezon City, Metro Manila',
    rating: 4.6,
    reviews: 89,
    metadata: { sizeM2: 800, powerAmps: 60, maxCrew: 40, parking: true },
    latitude: 14.6760,
    longitude: 121.0437
  },
  {
    id: '4',
    title: 'Beach Resort Location',
    heroImage: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['Beach', 'Outdoor', 'Natural Light'],
    price: 20000,
    location: 'Batangas',
    rating: 4.7,
    reviews: 156,
    metadata: { sizeM2: 1000, powerAmps: 40, maxCrew: 50, parking: true },
    latitude: 13.7565,
    longitude: 121.0583
  },
  {
    id: '5',
    title: 'Historic Colonial Mansion',
    heroImage: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg'],
    tags: ['Historic', 'Vintage', 'Architecture'],
    price: 10000,
    location: 'Intramuros, Manila',
    rating: 4.5,
    reviews: 78,
    metadata: { sizeM2: 400, powerAmps: 25, maxCrew: 20, parking: false },
    latitude: 14.5906,
    longitude: 120.9750
  }
]

// Mock search suggestions with location data
const mockLocationSuggestions = [
  { id: '1', text: 'Makati CBD studios', type: 'location' as const, count: 25 },
  { id: '2', text: 'BGC rooftop venues', type: 'location' as const, count: 18 },
  { id: '3', text: 'Quezon City warehouses', type: 'location' as const, count: 12 },
  { id: '4', text: 'Manila historic sites', type: 'location' as const, count: 8 },
  { id: '5', text: 'Batangas beach locations', type: 'location' as const, count: 15 }
]

// Example component showcasing map integration
export function MapIntegrationExamples() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 50000])
  const [currentLocation, setCurrentLocation] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState(mockLocationsWithCoords.length)
  const [isMapView, setIsMapView] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [searchRadius, setSearchRadius] = useState(10)
  const [selectedLocationId, setSelectedLocationId] = useState<string>()

  // Simulate search functionality
  const handleSearch = (query: string) => {
    setIsSearching(true)
    setTimeout(() => {
      const mockResults = Math.floor(Math.random() * mockLocationsWithCoords.length) + 1
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 800)
  }

  // Handle location search
  const handleLocationSearch = (query: string) => {
    console.log('Searching for location:', query)
    // In a real app, this would geocode the address
    // For demo, we'll just center on Manila
    setUserLocation({ lat: 14.5995, lng: 120.9842 })
  }

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Geolocation error:', error)
          // Fallback to Manila coordinates
          setUserLocation({ lat: 14.5995, lng: 120.9842 })
        }
      )
    }
  }

  // Filter locations based on search radius
  const filteredLocations = userLocation && searchRadius
    ? mockLocationsWithCoords.filter(location => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          location.latitude,
          location.longitude
        )
        return distance <= searchRadius
      })
    : mockLocationsWithCoords

  // Simple distance calculation (Haversine formula)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Map Integration & Location Search</h1>
        <p className="text-muted-foreground mb-8">
          Location-based filtering, map view toggle, and distance-based search functionality
        </p>

        {/* Map Integration Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Map Integration Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🗺️ Interactive Map View</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Toggle between grid and map views</li>
                  <li>• Interactive location markers</li>
                  <li>• Zoom and pan controls</li>
                  <li>• Location popup previews</li>
                  <li>• User location tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📍 Location-based Search</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Address and landmark search</li>
                  <li>• Coordinate-based search</li>
                  <li>• Geolocation integration</li>
                  <li>• Location autocomplete</li>
                  <li>• Smart location suggestions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📏 Distance-based Filtering</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Adjustable search radius</li>
                  <li>• Distance calculation</li>
                  <li>• Proximity-based sorting</li>
                  <li>• Quick radius presets</li>
                  <li>• Real-time filtering</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Smart Location Dropdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Searchable location list</li>
                  <li>• Location result counts</li>
                  <li>• Popular locations</li>
                  <li>• Recent location history</li>
                  <li>• Keyboard navigation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🧭 Navigation Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Get current location</li>
                  <li>• Center on user position</li>
                  <li>• Map style switching</li>
                  <li>• Fullscreen map mode</li>
                  <li>• Reset to default view</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚡ Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Efficient marker rendering</li>
                  <li>• Optimized distance calculations</li>
                  <li>• Smooth view transitions</li>
                  <li>• Responsive map controls</li>
                  <li>• Memory-efficient updates</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Interactive Demo</h2>
            <Button onClick={getCurrentLocation} variant="outline">
              Get My Location
            </Button>
          </div>
          
          <Tabs defaultValue="filters" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="filters">Search & Filters</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="integration">Full Integration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="filters" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Enhanced Search with Location Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <SearchFilters
                    selectedFilters={selectedFilters}
                    onFilterChange={setSelectedFilters}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    currentLocation={currentLocation}
                    onLocationChange={setCurrentLocation}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onSearch={handleSearch}
                    suggestions={mockLocationSuggestions}
                    isSearching={isSearching}
                    searchResults={searchResults}
                    showMapToggle={true}
                    isMapView={isMapView}
                    onMapViewToggle={setIsMapView}
                    userLocation={userLocation}
                    searchRadius={searchRadius}
                    onSearchRadiusChange={setSearchRadius}
                    onLocationSearch={handleLocationSearch}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="map" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Map View</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Click on markers to see location details
                  </p>
                </CardHeader>
                <CardContent>
                  <MapView
                    locations={filteredLocations}
                    selectedLocation={selectedLocationId}
                    onLocationSelect={setSelectedLocationId}
                    center={userLocation || { lat: 14.5995, lng: 120.9842 }}
                    zoom={12}
                    className="h-96"
                    showControls={true}
                    clustered={true}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integration" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Search & Map Integration</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Full integration with search filters and map view
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <SearchFilters
                    selectedFilters={selectedFilters}
                    onFilterChange={setSelectedFilters}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    currentLocation={currentLocation}
                    onLocationChange={setCurrentLocation}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onSearch={handleSearch}
                    suggestions={mockLocationSuggestions}
                    isSearching={isSearching}
                    searchResults={filteredLocations.length}
                    showMapToggle={true}
                    isMapView={isMapView}
                    onMapViewToggle={setIsMapView}
                    userLocation={userLocation}
                    searchRadius={searchRadius}
                    onSearchRadiusChange={setSearchRadius}
                    onLocationSearch={handleLocationSearch}
                  />
                  
                  {isMapView ? (
                    <MapView
                      locations={filteredLocations}
                      selectedLocation={selectedLocationId}
                      onLocationSelect={setSelectedLocationId}
                      center={userLocation || { lat: 14.5995, lng: 120.9842 }}
                      zoom={12}
                      className="h-96"
                      showControls={true}
                      clustered={true}
                    />
                  ) : (
                    <LocationCardLayouts
                      locations={filteredLocations}
                      loading={isSearching}
                      showControls={false}
                      defaultView="grid"
                      gridColumns={3}
                      gap="md"
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Current State Display */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Current Search State</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">View Mode:</span>
                    <Badge variant={isMapView ? "default" : "secondary"}>
                      {isMapView ? 'Map View' : 'Grid View'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Search Term:</span>
                    <span className="font-medium">{searchTerm || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{currentLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Search Radius:</span>
                    <span className="font-medium">{searchRadius} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Results:</span>
                    <span className="font-medium">{filteredLocations.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Location Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User Location:</span>
                    <span className="font-medium">
                      {userLocation 
                        ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
                        : 'Not available'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selected Location:</span>
                    <span className="font-medium">
                      {selectedLocationId 
                        ? mockLocationsWithCoords.find(l => l.id === selectedLocationId)?.title.slice(0, 20) + '...'
                        : 'None'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Locations:</span>
                    <span className="font-medium">{mockLocationsWithCoords.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Filtered Results:</span>
                    <span className="font-medium">{filteredLocations.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MapIntegrationExamples