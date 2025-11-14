import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, MessageCircle, Calendar, Camera, Users, Clock, Award, Heart, Share2, Search, Filter } from "lucide-react";
import { mockLocations } from "../data/mockData";
import LocationCard from "../components/LocationCard";
import MessageModal from "../components/MessageModal";
import BookingModal from "../components/BookingModal";

const ScoutProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Mock scout data - in real app this would come from API
  const scout = {
    id: id || "1",
    name: "Maria Santos",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 127,
    specialty: ["Manila Bay Sunsets", "Intramuros Heritage", "BGC Modern"],
    location: "Metro Manila",
    experience: "5+ years",
    responseTime: "Within 2 hours",
    totalBookings: 340,
    languages: ["English", "Filipino", "Tagalog"],
    priceRange: "₱3,000 - ₱15,000",
    about: "Specialized in finding unique Manila locations from Spanish colonial heritage sites in Intramuros to modern BGC skylines and iconic Manila Bay sunsets. I have extensive knowledge of permits, local connections, and hidden gems throughout Metro Manila.",
    services: [
      "Location scouting and research",
      "Permit assistance and coordination",
      "Local crew recommendations",
      "Transportation arrangements",
      "Equipment rental connections",
      "Cultural sensitivity guidance"
    ],
    reviews: [
      {
        id: "1",
        author: "John Photographer",
        rating: 5,
        date: "2 weeks ago",
        comment: "Maria was exceptional! She found the perfect locations for our fashion shoot and handled all permits seamlessly."
      },
      {
        id: "2",
        author: "Sarah Filmmaker",
        rating: 5,
        date: "1 month ago",
        comment: "Incredible local knowledge and connections. Made our Manila documentary shoot possible in just 3 days."
      }
    ],
    statistics: {
      repeatClients: "85%",
      onTimeRate: "99%",
      satisfactionScore: "4.9/5",
      projectsCompleted: "340+"
    }
  };

  // Filter scout's locations
  const scoutLocations = mockLocations.filter(location => 
    // In real app, this would filter by scout ID
    true // For now, show all locations as if they're managed by this scout
  );

  const filteredLocations = scoutLocations.filter(location => {
    const matchesSearch = searchQuery === "" ||
      location.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStyle = selectedStyle === "" || location.tags.includes(selectedStyle);

    const matchesBudget =
      selectedBudget === "" ||
      (selectedBudget === "under-3000" && location.price < 3000) ||
      (selectedBudget === "3000-8000" && location.price >= 3000 && location.price <= 8000) ||
      (selectedBudget === "8000-20000" && location.price > 8000 && location.price <= 20000) ||
      (selectedBudget === "over-20000" && location.price > 20000);

    return matchesSearch && matchesStyle && matchesBudget;
  });

  const handleMessageClick = () => {
    setIsMessageModalOpen(true);
  };

  const handleBookingClick = () => {
    setIsBookingModalOpen(true);
  };

  if (!scout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Scout Not Found</h1>
          <button
            onClick={() => navigate("/scouts")}
            className="bg-coral-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-coral-600 transition-colors"
          >
            Back to Scouts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-coral-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/scouts")}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to scouts</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl border transition-all duration-200 ${
                  isFollowing 
                    ? 'bg-coral-500 text-white border-coral-500 shadow-lg hover:bg-coral-600' 
                    : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <Heart className={`h-4 w-4 ${isFollowing ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">
                  {isFollowing ? 'Following' : 'Follow'}
                </span>
              </button>
              
              <button className="flex items-center gap-2 px-6 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                <Share2 className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image & Profile */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-coral-500 to-orange-500">
          <img
            src={scout.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="relative -mt-16">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <img
                src={scout.avatar}
                alt={scout.name}
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
              />
              
              <div className="flex-1 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{scout.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{scout.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{scout.rating}</span>
                        <span>({scout.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {scout.specialty.map(spec => (
                        <span key={spec} className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={handleMessageClick}
                      className="bg-coral-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-coral-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Message
                    </button>
                    <button 
                      onClick={handleBookingClick}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Book Scout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">About {scout.name}</h2>
              <p className="text-gray-600 leading-relaxed">{scout.about}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scout.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-coral-500 rounded-full"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scout's Locations with Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Managed Locations ({filteredLocations.length})</h2>
              
              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search locations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-3">
                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                  >
                    <option value="">All Styles</option>
                    <option value="Modern">Modern</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Vintage">Vintage</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Traditional">Traditional</option>
                  </select>
                  
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
                  >
                    <option value="">All Budgets</option>
                    <option value="under-3000">Under ₱3,000</option>
                    <option value="3000-8000">₱3,000 - ₱8,000</option>
                    <option value="8000-20000">₱8,000 - ₱20,000</option>
                    <option value="over-20000">Over ₱20,000</option>
                  </select>
                </div>
              </div>

              {/* Locations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLocations.map(location => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>

              {filteredLocations.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-2">No locations found</div>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedStyle("");
                      setSelectedBudget("");
                    }}
                    className="text-coral-600 hover:text-coral-700 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Client Reviews</h2>
              <div className="space-y-4">
                {scout.reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{review.author}</span>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="space-y-3 mb-6">
                <button 
                  onClick={handleMessageClick}
                  className="w-full bg-coral-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-coral-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message Scout
                </button>
                
                <button 
                  onClick={handleBookingClick}
                  className="w-full border border-coral-500 text-coral-500 py-3 px-4 rounded-xl font-semibold hover:bg-coral-50 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Book Consultation
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-500">
                Response time: {scout.responseTime}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold">{scout.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold">{scout.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price Range</span>
                  <span className="font-semibold">{scout.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-semibold">{scout.totalBookings}+</span>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Repeat Clients</span>
                  <span className="font-semibold text-green-600">{scout.statistics.repeatClients}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">On-Time Rate</span>
                  <span className="font-semibold text-green-600">{scout.statistics.onTimeRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Satisfaction</span>
                  <span className="font-semibold text-green-600">{scout.statistics.satisfactionScore}</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {scout.languages.map(lang => (
                  <span key={lang} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <MessageModal 
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        location={{ id: scout.id, title: `Chat with ${scout.name}`, location: scout.location }}
      />
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        location={{
          id: scout.id,
          title: `Book ${scout.name}`,
          location: scout.location,
          price: 0,
          heroImage: scout.avatar || '',
          rating: 0,
          reviews: 0,
          metadata: {
            sizeM2: 0,
            powerAmps: 0,
            maxCrew: 0,
            parking: false
          }
        }}
      />
    </div>
  );
};

export default ScoutProfile;
