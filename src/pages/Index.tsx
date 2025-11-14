import { useState, useEffect, useMemo } from "react";
import { MapPin, Map } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import LocationCard from "../components/LocationCard";
import LocationCardSkeleton from "../components/LocationCardSkeleton";
import SearchFilters from "../components/SearchFilters";
import LocationMap from "../components/LocationMap";
import { mockLocations } from "../data/mockData";
import FloatingActionButton from "../components/FloatingActionButton";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [currentLocation, setCurrentLocation] = useState("Metro Manila");
  const [viewMode, setViewMode] = useState<'locations' | 'images' | 'map'>('locations');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam && !selectedFilters.includes(tagParam)) {
      setSelectedFilters([tagParam]);
    }
  }, [searchParams]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
    
    // Update URL to remove tag parameter if no filters are selected
    if (filters.length === 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("tag");
      setSearchParams(newSearchParams);
    }
  };

  const filteredLocations = useMemo(() => {
    return mockLocations.filter((location) => {
      const matchesSearch = !searchTerm || location.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilters = selectedFilters.length === 0 || selectedFilters.every(filter =>
        location.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
      );

      const matchesPrice = location.price >= priceRange[0] && location.price <= priceRange[1];
      
      // More flexible location matching - if "Metro Manila" is selected, show all locations
      // Otherwise, check if the location contains the search term
      const matchesLocation = currentLocation === "Metro Manila" || 
        !currentLocation.trim() || 
        location.location.toLowerCase().includes(currentLocation.toLowerCase());

      return matchesSearch && matchesFilters && matchesPrice && matchesLocation;
    });
  }, [searchTerm, selectedFilters, priceRange, currentLocation]);

  // Create image gallery data from all locations
  const allImages = useMemo(() => {
    const images: Array<{
      id: string;
      locationId: string;
      imageIndex: number;
      image: string;
      location: any;
      title: string;
      tags: string[];
      description: string;
    }> = [];

    mockLocations.forEach(location => {
      const allLocationImages = [location.heroImage, ...location.gallery];
      allLocationImages.forEach((image, index) => {
        images.push({
          id: `${location.id}-${index}`,
          locationId: location.id,
          imageIndex: index,
          image,
          location,
          title: `${location.title} - Image ${index + 1}`,
          tags: index === 0 
            ? ["Main Studio", "Professional Lighting", ...location.tags.slice(0, 2)]
            : [location.tags[index % location.tags.length], "Detail Shot", "Professional Setup"],
          description: index === 0 
            ? `Main view of ${location.title} showcasing the primary space and features.`
            : `Detail view showcasing ${location.tags[index % location.tags.length]} features.`
        });
      });
    });

    return images;
  }, []);

  // Filter images based on search criteria
  const filteredImages = useMemo(() => {
    return allImages.filter(imageData => {
      const matchesSearch = !searchTerm || 
        imageData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        imageData.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        imageData.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilters = selectedFilters.length === 0 || 
        selectedFilters.some(filter => 
          imageData.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())) ||
          imageData.location.tags.some((tag: string) => tag.toLowerCase().includes(filter.toLowerCase()))
        );

      const matchesPrice = imageData.location.price >= priceRange[0] && imageData.location.price <= priceRange[1];
      
      const matchesLocation = currentLocation === "Metro Manila" || 
        !currentLocation.trim() || 
        imageData.location.location.toLowerCase().includes(currentLocation.toLowerCase());

      return matchesSearch && matchesFilters && matchesPrice && matchesLocation;
    });
  }, [allImages, searchTerm, selectedFilters, priceRange, currentLocation]);

  const handleImageClick = (imageData: any) => {
    navigate(`/image/${imageData.locationId}/${imageData.imageIndex}`);
  };

  const handleTagClick = (tag: string) => {
    if (!selectedFilters.includes(tag)) {
      const newFilters = [...selectedFilters, tag];
      setSelectedFilters(newFilters);
      
      // Update URL with the new tag
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("tag", tag);
      setSearchParams(newSearchParams);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <HeroSection 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFiltersClick={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Filters - Show/Hide based on state */}
        {showFilters && (
          <div className="mb-8">
            <SearchFilters
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              currentLocation={currentLocation}
              onLocationChange={setCurrentLocation}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        )}

        {/* Clean Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Discover Locations
            </h2>
            
            {/* Clean View Mode Toggle */}
            <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
              <button
                onClick={() => setViewMode('locations')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'locations' 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Locations
              </button>
              <button
                onClick={() => setViewMode('images')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'images' 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  viewMode === 'map' 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Map className="h-4 w-4" />
                Map
              </button>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              {viewMode === 'locations' 
                ? `${filteredLocations.length} locations found`
                : viewMode === 'images'
                ? `${filteredImages.length} images found`
                : `${filteredLocations.length} locations on map`
              }
            </span>
          </div>
        </div>

        {/* Results */}
        <div>
          {viewMode === 'locations' ? (
            // Location Cards Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                // Show skeletons while loading
                [...Array(8)].map((_, i) => (
                  <LocationCardSkeleton key={`skeleton-${i}`} />
                ))
              ) : (
                filteredLocations.map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))
              )}
            </div>
          ) : viewMode === 'images' ? (
            // Image Gallery Grid
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {isLoading ? (
                // Show skeleton images while loading
                [...Array(10)].map((_, i) => (
                  <div key={`image-skeleton-${i}`} className="group animate-pulse">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 mb-4" />
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="flex gap-2">
                        <div className="h-5 bg-gray-200 rounded-full flex-1" />
                        <div className="h-5 bg-gray-200 rounded-full flex-1" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                filteredImages.map((imageData) => (
                  <div
                    key={imageData.id}
                    className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                    onClick={() => handleImageClick(imageData)}
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-lg hover:shadow-2xl transition-all duration-300">
                      <img
                        src={imageData.image}
                        alt={`${imageData.title} - Professional location photo`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {imageData.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{imageData.location.location}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {imageData.tags.slice(0, 2).map((tag, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTagClick(tag);
                            }}
                            className="px-3 py-1 bg-primary/10 backdrop-blur-sm text-primary text-xs rounded-full font-medium hover:bg-primary/20 transition-all duration-200 border border-primary/20 transform hover:scale-105"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            // Map View
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <LocationMap locations={filteredLocations} />
            </div>
          )}

          {/* No Results */}
          {((viewMode === 'locations' && filteredLocations.length === 0) || 
            (viewMode === 'images' && filteredImages.length === 0)) && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="text-gray-500 text-lg mb-6">
                No {viewMode} found matching your criteria
              </div>
              <button
                onClick={() => {
                  setSelectedFilters([]);
                  setSearchTerm("");
                  setPriceRange([0, 50000]);
                  setCurrentLocation("Metro Manila");
                  setShowFilters(false);
                  const newSearchParams = new URLSearchParams();
                  setSearchParams(newSearchParams);
                }}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <FloatingActionButton />
    </div>
  );
};

export default Index;
