import { useState, useEffect } from "react";
import { Search, MapPin, Star, MessageCircle, Calendar, Camera, Users, ArrowLeft, User, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ScoutSkeleton from "../components/ScoutSkeleton";

interface LocationScout {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specialty: string[];
  location: string;
  experience: string;
  responseTime: string;
  totalBookings: number;
  portfolio: string[];
  about: string;
  priceRange: string;
  languages: string[];
}

const mockScouts: LocationScout[] = [
  {
    id: "1",
    name: "Maria Santos",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 127,
    specialty: ["Manila Bay Sunsets", "Intramuros Heritage", "BGC Modern"],
    location: "Metro Manila",
    experience: "5+ years",
    responseTime: "Within 2 hours",
    totalBookings: 340,
    portfolio: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=300&h=200&fit=crop"
    ],
    about: "Specialized in finding unique Manila locations from Spanish colonial heritage sites in Intramuros to modern BGC skylines and iconic Manila Bay sunsets.",
    priceRange: "₱3,000 - ₱15,000",
    languages: ["English", "Filipino", "Tagalog"]
  },
  {
    id: "2",
    name: "Carlos Dela Cruz",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 89,
    specialty: ["Banaue Rice Terraces", "Sagada Caves", "Cordillera Mountains"],
    location: "Baguio & Cordilleras",
    experience: "7+ years",
    responseTime: "Within 4 hours",
    totalBookings: 215,
    portfolio: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1571771710463-8e84c5ce7708?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop"
    ],
    about: "Expert in Cordillera mountain locations including the world-famous Banaue Rice Terraces, mystical Sagada caves, and Baguio's pine forests.",
    priceRange: "₱2,500 - ₱12,000",
    languages: ["English", "Filipino", "Ilocano"]
  },
  {
    id: "3",
    name: "Isabelle Reyes",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5.0,
    reviewCount: 203,
    specialty: ["El Nido Lagoons", "Coron Wrecks", "Puerto Princesa"],
    location: "Palawan",
    experience: "6+ years",
    responseTime: "Within 1 hour",
    totalBookings: 456,
    portfolio: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop"
    ],
    about: "Palawan specialist with exclusive access to hidden lagoons in El Nido, underwater shipwrecks in Coron, and pristine beaches throughout the province.",
    priceRange: "₱4,000 - ₱20,000",
    languages: ["English", "Filipino", "Tagalog"]
  },
  {
    id: "4",
    name: "Miguel Fernandez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 156,
    specialty: ["Chocolate Hills", "Tarsier Sanctuary", "Loboc River"],
    location: "Bohol",
    experience: "4+ years",
    responseTime: "Within 3 hours",
    totalBookings: 278,
    portfolio: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop"
    ],
    about: "Bohol expert specializing in the iconic Chocolate Hills, Tarsier wildlife photography, and scenic Loboc River cruises for nature documentaries.",
    priceRange: "₱3,500 - ₱14,000",
    languages: ["English", "Filipino", "Cebuano"]
  },
  {
    id: "5",
    name: "Ana Villanueva",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 192,
    specialty: ["Cloud 9 Breaks", "Magpupungko Pools", "Mangrove Forests"],
    location: "Siargao",
    experience: "5+ years",
    responseTime: "Within 2 hours",
    totalBookings: 368,
    portfolio: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop"
    ],
    about: "Siargao surf culture expert with access to Cloud 9 surf breaks, pristine Magpupungko rock pools, and untouched mangrove forests for adventure shoots.",
    priceRange: "₱3,800 - ₱16,000",
    languages: ["English", "Filipino", "Cebuano"]
  },
  {
    id: "6",
    name: "Rafael Cruz",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 143,
    specialty: ["Mayon Volcano", "Cagsawa Ruins", "Donsol Whale Sharks"],
    location: "Bicol Region",
    experience: "6+ years",
    responseTime: "Within 4 hours",
    totalBookings: 245,
    portfolio: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop"
    ],
    about: "Bicol specialist featuring the perfect cone of Mayon Volcano, historic Cagsawa Ruins, and world-famous whale shark encounters in Donsol.",
    priceRange: "₱3,200 - ₱13,500",
    languages: ["English", "Filipino", "Bicolano"]
  }
];

const LocationScouts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const specialties = [
    "Manila Bay Sunsets", "Intramuros Heritage", "BGC Modern", "Banaue Rice Terraces", 
    "Sagada Caves", "El Nido Lagoons", "Coron Wrecks", "Chocolate Hills", 
    "Tarsier Sanctuary", "Cloud 9 Breaks", "Mayon Volcano", "Cagsawa Ruins"
  ];

  const regions = [
    "Metro Manila", "Baguio & Cordilleras", "Palawan", "Bohol", "Siargao", 
    "Bicol Region", "Cebu", "La Union", "Ilocos Norte", "Batanes", 
    "Camiguin", "Siquijor"
  ];

  const filteredScouts = mockScouts.filter(scout => {
    const matchesSearch = scout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scout.specialty.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = !selectedSpecialty || scout.specialty.includes(selectedSpecialty);
    const matchesRegion = !selectedRegion || scout.location.includes(selectedRegion);
    
    return matchesSearch && matchesSpecialty && matchesRegion;
  });

  const handleViewProfile = (scoutId: string) => {
    navigate(`/scout/${scoutId}`);
  };

  const handleSendMessage = (scoutId: string, scoutName: string) => {
    toast.success(`Opening message chat with ${scoutName}`, {
      description: "Message feature coming soon!"
    });
  };

  const handleBookScout = (scoutId: string, scoutName: string) => {
    toast.success(`Booking request sent to ${scoutName}`, {
      description: "You'll receive a confirmation email shortly."
    });
  };

  const handleCallScout = (scoutId: string, scoutName: string) => {
    toast.info(`Calling ${scoutName}`, {
      description: "Call feature will be available soon!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-coral-50">
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
              <div className="w-8 h-8 bg-coral-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">LocationPH</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm">
              <button 
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-coral-600 transition-colors"
              >
                Browse Locations
              </button>
              <button 
                onClick={() => navigate("/how-it-works")}
                className="text-gray-600 hover:text-coral-600 transition-colors"
              >
                How it works
              </button>
              <button 
                onClick={() => navigate("/support")}
                className="text-gray-600 hover:text-coral-600 transition-colors"
              >
                Support
              </button>
              <div className="h-4 w-px bg-gray-300"></div>
              <button className="text-coral-600 hover:text-coral-700 font-medium transition-colors">
                Sign In
              </button>
              <button className="bg-coral-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-coral-600 transition-colors">
                Join as Scout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-coral-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Connect with Filipino Location Scouts
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Find verified professionals who know the best spots from Luzon to Mindanao
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>150+ Verified Scouts</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>4.8+ Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span>Direct Communication</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search scouts by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
              />
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scouts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLoading ? "Loading Filipino Location Scouts..." : `${filteredScouts.length} Filipino Location Scouts Available`}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {isLoading ? (
            // Show skeletons while loading
            [...Array(6)].map((_, i) => (
              <ScoutSkeleton key={`scout-skeleton-${i}`} />
            ))
          ) : (
            filteredScouts.map((scout) => (
              <div key={scout.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200">
              {/* Scout Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start gap-4">
                  <img
                    src={scout.avatar}
                    alt={scout.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{scout.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900">{scout.rating}</span>
                        <span className="text-gray-500 text-sm">({scout.reviewCount})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{scout.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio Preview */}
              <div className="px-6 pb-4">
                <div className="grid grid-cols-3 gap-2">
                  {scout.portfolio.slice(0, 3).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Scout Details */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  {scout.specialty.slice(0, 2).map(spec => (
                    <span key={spec} className="bg-coral-100 text-coral-700 px-2 py-1 rounded-md text-xs font-medium">
                      {spec}
                    </span>
                  ))}
                  {scout.specialty.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
                      +{scout.specialty.length - 2} more
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{scout.about}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-500">Experience:</span>
                    <div className="font-medium">{scout.experience}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Response:</span>
                    <div className="font-medium">{scout.responseTime}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Bookings:</span>
                    <div className="font-medium">{scout.totalBookings}+</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Rate:</span>
                    <div className="font-medium">{scout.priceRange}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 space-y-3">
                <button 
                  onClick={() => handleViewProfile(scout.id)}
                  className="w-full bg-coral-500 text-white py-3 rounded-xl font-semibold hover:bg-coral-600 transition-colors flex items-center justify-center gap-2"
                >
                  <User className="h-4 w-4" />
                  View Profile
                </button>
                
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => handleSendMessage(scout.id, scout.name)}
                    className="bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">Message</span>
                  </button>
                  <button 
                    onClick={() => handleBookScout(scout.id, scout.name)}
                    className="bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">Book</span>
                  </button>
                  <button 
                    onClick={() => handleCallScout(scout.id, scout.name)}
                    className="bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-xs">Call</span>
                  </button>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationScouts;
