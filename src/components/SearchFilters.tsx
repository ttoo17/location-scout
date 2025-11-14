
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { 
  Search, 
  MapPin, 
  X, 
  Clock, 
  TrendingUp, 
  Filter,
  ChevronDown,
  History,
  Star,
  Zap,
  Map,
  Grid,
  Navigation,
  Crosshair,
  Radius
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

// Types
interface SearchSuggestion {
  id: string;
  text: string;
  type: 'location' | 'tag' | 'style' | 'recent' | 'trending';
  count?: number;
  icon?: React.ReactNode;
}

interface SearchHistory {
  id: string;
  query: string;
  timestamp: number;
  results: number;
}

interface SearchFiltersProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  priceRange: number[];
  onPriceChange: (range: number[]) => void;
  currentLocation: string;
  onLocationChange: (location: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch?: (query: string) => void;
  suggestions?: SearchSuggestion[];
  isSearching?: boolean;
  searchResults?: number;
  // Map integration props
  showMapToggle?: boolean;
  isMapView?: boolean;
  onMapViewToggle?: (isMap: boolean) => void;
  userLocation?: { lat: number; lng: number } | null;
  searchRadius?: number;
  onSearchRadiusChange?: (radius: number) => void;
  onLocationSearch?: (query: string) => void;
}

// Custom hook for debounced search
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for search history
const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistory[]>(() => {
    try {
      const saved = localStorage.getItem('search-history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addToHistory = useCallback((query: string, results: number = 0) => {
    if (!query.trim()) return;
    
    const newEntry: SearchHistory = {
      id: Date.now().toString(),
      query: query.trim(),
      timestamp: Date.now(),
      results
    };

    setHistory(prev => {
      // Remove duplicate if exists
      const filtered = prev.filter(item => item.query !== query.trim());
      // Add new entry at the beginning and limit to 10 items
      const updated = [newEntry, ...filtered].slice(0, 10);
      
      try {
        localStorage.setItem('search-history', JSON.stringify(updated));
      } catch {
        // Handle localStorage errors silently
      }
      
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem('search-history');
    } catch {
      // Handle localStorage errors silently
    }
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem('search-history', JSON.stringify(updated));
      } catch {
        // Handle localStorage errors silently
      }
      return updated;
    });
  }, []);

  return { history, addToHistory, clearHistory, removeFromHistory };
};

const SearchFilters = ({
  selectedFilters,
  onFilterChange,
  priceRange,
  onPriceChange,
  currentLocation,
  onLocationChange,
  searchTerm,
  onSearchChange,
  onSearch,
  suggestions = [],
  isSearching = false,
  searchResults = 0,
  // Map integration props
  showMapToggle = true,
  isMapView = false,
  onMapViewToggle,
  userLocation,
  searchRadius = 10,
  onSearchRadiusChange,
  onLocationSearch
}: SearchFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(searchTerm);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  // Search history hook
  const { history, addToHistory, clearHistory, removeFromHistory } = useSearchHistory();
  
  // Debounced search
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  const availableFilters = [
    "Photography Studio",
    "Video Production", 
    "Industrial Design",
    "Rooftop",
    "Natural Light",
    "Warehouse",
    "Modern",
    "Vintage",
    "Outdoor",
    "Beach",
    "Urban",
    "Rustic",
    "Corporate",
    "Event Space",
    "Minimalist",
    "Luxury",
    "Historic",
    "Contemporary"
  ];

  const locations = [
    { value: "all", label: "All Locations", count: 1250 },
    { value: "metro-manila", label: "Metro Manila", count: 450 },
    { value: "cebu", label: "Cebu", count: 180 },
    { value: "davao", label: "Davao", count: 120 },
    { value: "iloilo", label: "Iloilo", count: 85 },
    { value: "baguio", label: "Baguio", count: 95 },
    { value: "boracay", label: "Boracay", count: 75 },
    { value: "palawan", label: "Palawan", count: 65 },
    { value: "bohol", label: "Bohol", count: 55 }
  ];

  // Default suggestions for popular searches - wrapped in useMemo to maintain stable reference
  const defaultSuggestions = useMemo(() => [
    { id: '1', text: 'Modern studio', type: 'trending' as const, count: 45, icon: <TrendingUp className="h-4 w-4" /> },
    { id: '2', text: 'Beach location', type: 'trending' as const, count: 38, icon: <TrendingUp className="h-4 w-4" /> },
    { id: '3', text: 'Rooftop venue', type: 'trending' as const, count: 32, icon: <TrendingUp className="h-4 w-4" /> },
    { id: '4', text: 'Photography studio', type: 'style' as const, count: 28, icon: <Star className="h-4 w-4" /> },
    { id: '5', text: 'Industrial space', type: 'style' as const, count: 25, icon: <Star className="h-4 w-4" /> }
  ], []);

  // Combined suggestions from props, history, and defaults
  const allSuggestions = useMemo(() => {
    const historySuggestions: SearchSuggestion[] = history.map(item => ({
      id: item.id,
      text: item.query,
      type: 'recent' as const,
      count: item.results,
      icon: <Clock className="h-4 w-4" />
    }));

    const propSuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions;

    return [...historySuggestions, ...propSuggestions];
  }, [history, suggestions, defaultSuggestions]);

  // Filter suggestions based on input
  const filteredSuggestions = useMemo(() => {
    if (!inputValue.trim()) return allSuggestions.slice(0, 8);
    
    const query = inputValue.toLowerCase();
    return allSuggestions
      .filter(suggestion => suggestion.text.toLowerCase().includes(query))
      .slice(0, 6);
  }, [inputValue, allSuggestions]);

  // Effect for debounced search
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      onSearchChange(debouncedSearchTerm);
      if (onSearch && debouncedSearchTerm.trim()) {
        onSearch(debouncedSearchTerm);
      }
    }
  }, [debouncedSearchTerm, searchTerm, onSearchChange, onSearch]);

  // Handle input change
  const handleInputChange = (value: string) => {
    setInputValue(value);
    setShowSuggestions(true);
  };

  // Handle search submission
  const handleSearch = (query?: string) => {
    const searchQuery = query || inputValue;
    if (searchQuery.trim()) {
      addToHistory(searchQuery, searchResults);
      onSearchChange(searchQuery);
      if (onSearch) {
        onSearch(searchQuery);
      }
      setShowSuggestions(false);
      searchInputRef.current?.blur();
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setInputValue(suggestion.text);
    handleSearch(suggestion.text);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setInputValue('');
    onSearchChange('');
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      onFilterChange(selectedFilters.filter(f => f !== filter));
    } else {
      onFilterChange([...selectedFilters, filter]);
    }
  };

  const clearAllFilters = () => {
    onFilterChange([]);
    setInputValue('');
    onSearchChange('');
    onPriceChange([0, 50000]);
    setShowAdvanced(false);
    setShowSuggestions(false);
  };

  const removeFilter = (filterToRemove: string) => {
    onFilterChange(selectedFilters.filter(f => f !== filterToRemove));
  };

  return (
    <div className="glass bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50 animate-fade-in">
      {/* Enhanced Search Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Advanced Search Input with Autocomplete */}
        <div className="flex-1 min-w-[320px] relative">
          <div className="relative">
            <Search className={cn(
              "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors",
              isSearching ? "text-primary animate-pulse" : "text-muted-foreground"
            )} />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search locations, styles, or keywords..."
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                } else if (e.key === 'Escape') {
                  setShowSuggestions(false);
                }
              }}
              className="pl-12 pr-12 py-3 text-base"
            />
            {inputValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            {isSearching && (
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (filteredSuggestions.length > 0 || history.length > 0) && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
            >
              {filteredSuggestions.length > 0 && (
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground px-3 py-2 uppercase tracking-wide">
                    {inputValue.trim() ? 'Suggestions' : 'Popular Searches'}
                  </div>
                  {filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-lg transition-colors text-left"
                    >
                      <div className="text-muted-foreground">
                        {suggestion.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{suggestion.text}</div>
                        {suggestion.count && (
                          <div className="text-xs text-muted-foreground">
                            {suggestion.count} results
                          </div>
                        )}
                      </div>
                      {suggestion.type === 'recent' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromHistory(suggestion.id);
                          }}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {history.length > 0 && !inputValue.trim() && (
                <div className="border-t border-border p-2">
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Recent Searches
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearHistory}
                      className="h-6 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Location Selector */}
        <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isLocationOpen}
              className="min-w-[180px] justify-between py-3"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">
                  {locations.find(loc => loc.value === currentLocation)?.label || "Select location"}
                </span>
              </div>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search location..." />
              <CommandList>
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup>
                  {locations.map((location) => (
                    <CommandItem
                      key={location.value}
                      value={location.value}
                      onSelect={(value) => {
                        onLocationChange(value);
                        setIsLocationOpen(false);
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{location.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {location.count}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Map/Grid View Toggle */}
        {showMapToggle && onMapViewToggle && (
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={!isMapView ? "default" : "ghost"}
              size="sm"
              onClick={() => onMapViewToggle(false)}
              className="flex items-center gap-2 h-8"
            >
              <Grid className="h-4 w-4" />
              Grid
            </Button>
            <Button
              variant={isMapView ? "default" : "ghost"}
              size="sm"
              onClick={() => onMapViewToggle(true)}
              className="flex items-center gap-2 h-8"
            >
              <Map className="h-4 w-4" />
              Map
            </Button>
          </div>
        )}

        {/* Advanced Filters Toggle */}
        <Button
          variant={showAdvanced ? "default" : "outline"}
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 py-3"
        >
          <Filter className="h-4 w-4" />
          Advanced
        </Button>

        {/* Clear All Button */}
        {(selectedFilters.length > 0 || inputValue || showAdvanced) && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="flex items-center gap-2 py-3 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <Zap className="h-4 w-4" />
          <span>
            {isSearching ? 'Searching...' : `Found ${searchResults} results for "${searchTerm}"`}
          </span>
        </div>
      )}

      {/* Quick Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {availableFilters.slice(0, 6).map((filter) => (
          <Button
            key={filter}
            variant={selectedFilters.includes(filter) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter(filter)}
            className={cn(
              "transition-all duration-200",
              selectedFilters.includes(filter) && "shadow-md"
            )}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Enhanced Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-border pt-6 space-y-6 animate-slide-up">
          {/* Enhanced Price Range Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground">
                Price Range
              </label>
              <div className="text-sm text-muted-foreground">
                ₱{priceRange[0].toLocaleString()} - ₱{priceRange[1].toLocaleString()} per day
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-muted rounded-xl p-6">
                {/* Dual-handle range slider container */}
                <div className="relative h-6">
                  {/* Track */}
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-muted-foreground/20 rounded-full transform -translate-y-1/2" />
                  
                  {/* Active range */}
                  <div 
                    className="absolute top-1/2 h-2 bg-primary rounded-full transform -translate-y-1/2"
                    style={{
                      left: `${(priceRange[0] / 100000) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / 100000) * 100}%`
                    }}
                  />
                  
                  {/* Min handle */}
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value <= priceRange[1]) {
                        onPriceChange([value, priceRange[1]]);
                      }
                    }}
                    className="absolute top-1/2 left-0 right-0 w-full h-6 bg-transparent appearance-none cursor-pointer transform -translate-y-1/2 z-10"
                    style={{ background: 'transparent' }}
                  />
                  
                  {/* Max handle */}
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= priceRange[0]) {
                        onPriceChange([priceRange[0], value]);
                      }
                    }}
                    className="absolute top-1/2 left-0 right-0 w-full h-6 bg-transparent appearance-none cursor-pointer transform -translate-y-1/2 z-20"
                    style={{ background: 'transparent' }}
                  />
                </div>
                
                {/* Price labels */}
                <div className="flex justify-between text-xs text-muted-foreground mt-4">
                  <span>₱0</span>
                  <span>₱25K</span>
                  <span>₱50K</span>
                  <span>₱75K</span>
                  <span>₱100K+</span>
                </div>
                
                {/* Quick price presets */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs font-medium text-muted-foreground">Quick select:</span>
                  {[
                    { label: 'Budget', range: [0, 10000] },
                    { label: 'Mid-range', range: [10000, 30000] },
                    { label: 'Premium', range: [30000, 60000] },
                    { label: 'Luxury', range: [60000, 100000] }
                  ].map((preset) => (
                    <Button
                      key={preset.label}
                      variant="ghost"
                      size="sm"
                      onClick={() => onPriceChange(preset.range)}
                      className="h-6 px-2 text-xs"
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Category-based Filter Organization */}
          <div className="space-y-6">
            {/* Space Type Filters */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Space Type</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const spaceTypes = ['Photography Studio', 'Video Production', 'Warehouse', 'Rooftop'];
                    const hasAll = spaceTypes.every(type => selectedFilters.includes(type));
                    if (hasAll) {
                      onFilterChange(selectedFilters.filter(f => !spaceTypes.includes(f)));
                    } else {
                      onFilterChange([...new Set([...selectedFilters, ...spaceTypes])]);
                    }
                  }}
                  className="h-6 text-xs text-muted-foreground hover:text-foreground"
                >
                  Select All
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Photography Studio', 'Video Production', 'Warehouse', 'Rooftop', 'Event Space', 'Corporate'].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilters.includes(filter) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(filter)}
                    className="justify-start text-left h-auto py-2"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Style Filters */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Style & Aesthetic</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const styles = ['Modern', 'Vintage', 'Industrial Design', 'Minimalist', 'Luxury'];
                    const hasAll = styles.every(style => selectedFilters.includes(style));
                    if (hasAll) {
                      onFilterChange(selectedFilters.filter(f => !styles.includes(f)));
                    } else {
                      onFilterChange([...new Set([...selectedFilters, ...styles])]);
                    }
                  }}
                  className="h-6 text-xs text-muted-foreground hover:text-foreground"
                >
                  Select All
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Modern', 'Vintage', 'Industrial Design', 'Minimalist', 'Luxury', 'Contemporary'].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilters.includes(filter) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(filter)}
                    className="justify-start text-left h-auto py-2"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Environment Filters */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Environment</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const environments = ['Outdoor', 'Beach', 'Urban', 'Natural Light'];
                    const hasAll = environments.every(env => selectedFilters.includes(env));
                    if (hasAll) {
                      onFilterChange(selectedFilters.filter(f => !environments.includes(f)));
                    } else {
                      onFilterChange([...new Set([...selectedFilters, ...environments])]);
                    }
                  }}
                  className="h-6 text-xs text-muted-foreground hover:text-foreground"
                >
                  Select All
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Outdoor', 'Beach', 'Urban', 'Natural Light', 'Rustic', 'Historic'].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilters.includes(filter) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(filter)}
                    className="justify-start text-left h-auto py-2"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Location-based Search */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Location & Distance</h3>
            
            {/* Current location display */}
            {userLocation && (
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Navigation className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Your Location</span>
                  <Badge variant="secondary" className="text-xs">
                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </Badge>
                </div>
                
                {/* Search radius slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">Search Radius</label>
                    <span className="text-sm font-medium">{searchRadius} km</span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      value={searchRadius}
                      onChange={(e) => onSearchRadiusChange?.(parseInt(e.target.value))}
                      className="w-full h-2 bg-muted-foreground/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1km</span>
                      <span>25km</span>
                      <span>50km</span>
                    </div>
                  </div>
                  
                  {/* Quick radius presets */}
                  <div className="flex gap-2 mt-2">
                    {[5, 10, 20, 30].map((radius) => (
                      <Button
                        key={radius}
                        variant={searchRadius === radius ? "default" : "outline"}
                        size="sm"
                        onClick={() => onSearchRadiusChange?.(radius)}
                        className="h-6 px-2 text-xs"
                      >
                        {radius}km
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Location search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Search by Address</label>
              <div className="relative">
                <Crosshair className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter address, landmark, or coordinates..."
                  className="pl-10"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement;
                      if (target.value.trim() && onLocationSearch) {
                        onLocationSearch(target.value.trim());
                      }
                    }
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Try: "Makati CBD", "BGC Taguig", or "14.5995, 120.9842"
              </p>
            </div>
            
            {/* Distance-based sorting */}
            <div className="flex items-center gap-2">
              <Radius className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {userLocation 
                  ? `Showing results within ${searchRadius}km of your location`
                  : 'Enable location access for distance-based search'
                }
              </span>
            </div>
            
            {/* Get current location button */}
            {!userLocation && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        // This would typically be handled by parent component
                        console.log('Location:', position.coords.latitude, position.coords.longitude);
                      },
                      (error) => {
                        console.error('Geolocation error:', error);
                      }
                    );
                  }
                }}
                className="flex items-center gap-2"
              >
                <Navigation className="h-4 w-4" />
                Get Current Location
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Active Filters Display */}
      {(selectedFilters.length > 0 || searchTerm || (priceRange[0] > 0 || priceRange[1] < 50000)) && (
        <div className="border-t border-border pt-4 mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Active Filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-6 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Search term chip */}
            {searchTerm && (
              <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                <Search className="h-3 w-3" />
                <span>"{searchTerm}"</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="h-4 w-4 p-0 hover:bg-primary/20 rounded-full ml-1"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {/* Location chip */}
            {currentLocation !== 'all' && (
              <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-500/20">
                <MapPin className="h-3 w-3" />
                <span>{locations.find(loc => loc.value === currentLocation)?.label}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLocationChange('all')}
                  className="h-4 w-4 p-0 hover:bg-blue-500/20 rounded-full ml-1"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {/* Price range chip */}
            {(priceRange[0] > 0 || priceRange[1] < 50000) && (
              <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-700 dark:text-green-300 rounded-full text-sm font-medium border border-green-500/20">
                <span>₱{priceRange[0].toLocaleString()} - ₱{priceRange[1].toLocaleString()}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPriceChange([0, 50000])}
                  className="h-4 w-4 p-0 hover:bg-green-500/20 rounded-full ml-1"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {/* Category filter chips */}
            {selectedFilters.map((filter) => {
              // Determine chip color based on category
              const getChipColor = (filterName: string) => {
                if (['Photography Studio', 'Video Production', 'Warehouse', 'Rooftop', 'Event Space', 'Corporate'].includes(filterName)) {
                  return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20 hover:bg-purple-500/20';
                } else if (['Modern', 'Vintage', 'Industrial Design', 'Minimalist', 'Luxury', 'Contemporary'].includes(filterName)) {
                  return 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20 hover:bg-orange-500/20';
                } else {
                  return 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20 hover:bg-teal-500/20';
                }
              };

              return (
                <div
                  key={filter}
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                    getChipColor(filter)
                  )}
                >
                  <span>{filter}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter(filter)}
                    className="h-4 w-4 p-0 rounded-full ml-1 opacity-70 hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              );
            })}
          </div>
          
          {/* Filter summary */}
          <div className="text-xs text-muted-foreground">
            {selectedFilters.length + (searchTerm ? 1 : 0) + (currentLocation !== 'all' ? 1 : 0) + ((priceRange[0] > 0 || priceRange[1] < 50000) ? 1 : 0)} filter{(selectedFilters.length + (searchTerm ? 1 : 0) + (currentLocation !== 'all' ? 1 : 0) + ((priceRange[0] > 0 || priceRange[1] < 50000) ? 1 : 0)) !== 1 ? 's' : ''} applied
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
