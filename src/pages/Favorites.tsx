import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MapPin, Filter } from "lucide-react";
import LocationCard from "../components/LocationCard";
import { mockLocations } from "../data/mockData";

const Favorites = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);

  // Mock favorite locations (in a real app, this would come from user data)
  const [favoriteIds] = useState([
    mockLocations[0].id,
    mockLocations[1].id,
    mockLocations[3].id,
    mockLocations[5].id,
  ]);

  const favoriteLocations = useMemo(
    () => mockLocations.filter((loc) => favoriteIds.includes(loc.id)),
    [favoriteIds]
  );

  const filteredLocations = useMemo(() => {
    return favoriteLocations.filter((location) => {
      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.every((filter) =>
          location.tags.some((tag) =>
            tag.toLowerCase().includes(filter.toLowerCase())
          )
        );

      const matchesPrice =
        location.price >= priceRange[0] && location.price <= priceRange[1];

      return matchesFilters && matchesPrice;
    });
  }, [favoriteLocations, selectedFilters, priceRange]);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                <h1 className="text-xl font-bold text-gray-900">My Favorites</h1>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2">Your Favorite Locations</h2>
          <p className="text-white/90 text-lg">
            {favoriteLocations.length} location{favoriteLocations.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 sticky top-[73px] z-20">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Price Range
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="range"
                      min={0}
                      max={50000}
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="range"
                      min={0}
                      max={50000}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-900 whitespace-nowrap">
                    ₱{priceRange[0]} - ₱{priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Tag Filters */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Location Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Studio", "Outdoor", "Urban", "Beach", "Mountains", "Historic"].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          if (selectedFilters.includes(tag)) {
                            handleFilterChange(
                              selectedFilters.filter((f) => f !== tag)
                            );
                          } else {
                            handleFilterChange([...selectedFilters, tag]);
                          }
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedFilters.includes(tag)
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {filteredLocations.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                {filteredLocations.length} location{filteredLocations.length !== 1 ? "s" : ""}
              </h3>
              <button
                onClick={() => {
                  setSelectedFilters([]);
                  setPriceRange([0, 50000]);
                }}
                className="text-red-500 hover:text-red-600 font-medium text-sm"
              >
                Clear Filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLocations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {favoriteLocations.length === 0
                ? "No favorites yet"
                : "No results found"}
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              {favoriteLocations.length === 0
                ? "Start adding your favorite locations to see them here"
                : "Try adjusting your filters to find more locations"}
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              Browse Locations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
