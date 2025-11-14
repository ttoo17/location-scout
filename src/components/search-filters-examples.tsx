import React, { useState } from 'react'
import SearchFilters from './SearchFilters'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

// Mock search suggestions
const mockSuggestions = [
  { id: '1', text: 'Modern photography studio', type: 'location' as const, count: 45 },
  { id: '2', text: 'Beach wedding venue', type: 'location' as const, count: 38 },
  { id: '3', text: 'Industrial warehouse space', type: 'style' as const, count: 32 },
  { id: '4', text: 'Rooftop with city view', type: 'location' as const, count: 28 },
  { id: '5', text: 'Vintage interior design', type: 'style' as const, count: 25 },
  { id: '6', text: 'Outdoor garden venue', type: 'location' as const, count: 22 }
]

// Example component showcasing enhanced search functionality
export function SearchFiltersExamples() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 50000])
  const [currentLocation, setCurrentLocation] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState(0)

  // Simulate search functionality
  const handleSearch = (query: string) => {
    setIsSearching(true)
    setSearchResults(0)
    
    // Simulate API call delay
    setTimeout(() => {
      const mockResults = Math.floor(Math.random() * 100) + 10
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 800)
  }

  const simulateSearch = (term: string) => {
    setSearchTerm(term)
    handleSearch(term)
  }

  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Enhanced Search & Filters</h1>
        <p className="text-muted-foreground mb-8">
          Real-time search with debouncing, autocomplete suggestions, and search history
        </p>

        {/* Search Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Search Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🔍 Real-time Search</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Debounced search with 300ms delay</li>
                  <li>• Real-time results as you type</li>
                  <li>• Loading states and visual feedback</li>
                  <li>• Search result count display</li>
                  <li>• Keyboard shortcuts (Enter, Escape)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💡 Smart Autocomplete</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Dynamic suggestion filtering</li>
                  <li>• Popular and trending searches</li>
                  <li>• Category-based suggestions</li>
                  <li>• Result count for each suggestion</li>
                  <li>• Click outside to close</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📚 Search History</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Persistent search history</li>
                  <li>• Recent searches with timestamps</li>
                  <li>• Individual history item removal</li>
                  <li>• Clear all history option</li>
                  <li>• LocalStorage integration</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Advanced Filtering</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Dual-handle price range slider</li>
                  <li>• Category-based filter organization</li>
                  <li>• Collapsible advanced filters panel</li>
                  <li>• Color-coded filter chips</li>
                  <li>• Quick preset selections</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🏷️ Smart Filter Chips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Color-coded by category type</li>
                  <li>• Individual chip removal</li>
                  <li>• Search term highlighting</li>
                  <li>• Filter count summary</li>
                  <li>• Visual filter organization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📊 Price Range Control</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Dual-handle range slider</li>
                  <li>• Visual range indicators</li>
                  <li>• Quick price presets</li>
                  <li>• Real-time value updates</li>
                  <li>• Smooth handle interactions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚡ Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Optimized re-rendering</li>
                  <li>• Memoized suggestions</li>
                  <li>• Efficient state management</li>
                  <li>• Debounced API calls</li>
                  <li>• Smooth animations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>♿ Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Keyboard navigation support</li>
                  <li>• Screen reader friendly</li>
                  <li>• Focus management</li>
                  <li>• ARIA labels and roles</li>
                  <li>• High contrast support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive Examples</h2>
          
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Search</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Filters</TabsTrigger>
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Search Interface</CardTitle>
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
                    suggestions={mockSuggestions}
                    isSearching={isSearching}
                    searchResults={searchResults}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Filters with Category Organization</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Showcasing collapsible panels, dual-handle price slider, and color-coded filter chips
                  </p>
                </CardHeader>
                <CardContent>
                  <SearchFilters
                    selectedFilters={['Modern', 'Photography Studio', 'Natural Light', 'Urban', 'Luxury']}
                    onFilterChange={setSelectedFilters}
                    priceRange={[15000, 45000]}
                    onPriceChange={setPriceRange}
                    currentLocation="metro-manila"
                    onLocationChange={setCurrentLocation}
                    searchTerm="luxury studio"
                    onSearchChange={setSearchTerm}
                    onSearch={handleSearch}
                    suggestions={mockSuggestions}
                    isSearching={false}
                    searchResults={28}
                  />
                </CardContent>
              </Card>
              
              {/* Filter Features Breakdown */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Price Range Slider</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Dual-handle controls</li>
                      <li>• Visual range display</li>
                      <li>• Quick preset buttons</li>
                      <li>• Real-time updates</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Category Organization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Space Type filters</li>
                      <li>• Style & Aesthetic</li>
                      <li>• Environment options</li>
                      <li>• Select All shortcuts</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Smart Filter Chips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Color-coded categories</li>
                      <li>• Individual removal</li>
                      <li>• Filter count display</li>
                      <li>• Visual organization</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="demo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Live Search Demo</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Try searching for different terms to see the real-time functionality
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    suggestions={mockSuggestions}
                    isSearching={isSearching}
                    searchResults={searchResults}
                  />
                  
                  {/* Quick search buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <span className="text-sm font-medium text-muted-foreground">Quick searches:</span>
                    {['beach venue', 'modern studio', 'rooftop space', 'vintage interior'].map((term) => (
                      <Button
                        key={term}
                        variant="outline"
                        size="sm"
                        onClick={() => simulateSearch(term)}
                        className="text-xs"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Current State Display */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Current Search State</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Search Parameters</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Search Term:</span>
                      <span className="font-medium">{searchTerm || 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{currentLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price Range:</span>
                      <span className="font-medium">₱{priceRange[0].toLocaleString()} - ₱{priceRange[1].toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Results:</span>
                      <span className="font-medium">{isSearching ? 'Searching...' : searchResults}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Active Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFilters.length > 0 ? (
                      selectedFilters.map((filter) => (
                        <Badge key={filter} variant="secondary">
                          {filter}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No filters applied</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technical Implementation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Technical Implementation</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Debouncing Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">useDebounce Hook</h4>
                    <p className="text-muted-foreground">
                      Custom hook that delays API calls by 300ms to prevent excessive requests.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">State Management</h4>
                    <p className="text-muted-foreground">
                      Separate input value and search term states for smooth UX.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Performance</h4>
                    <p className="text-muted-foreground">
                      Reduces API calls by up to 90% compared to real-time search.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Search History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">LocalStorage</h4>
                    <p className="text-muted-foreground">
                      Persists search history across browser sessions with error handling.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Smart Deduplication</h4>
                    <p className="text-muted-foreground">
                      Prevents duplicate entries and maintains chronological order.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Privacy</h4>
                    <p className="text-muted-foreground">
                      Users can clear individual items or entire history.
                    </p>
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

export default SearchFiltersExamples