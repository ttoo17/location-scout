import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Zap, Car, MessageCircle, Calendar, Heart, Share2, Star, Clock, Shield, Wifi, Camera, Volume2, Sun, Thermometer, Ruler, Tag } from "lucide-react";
import { mockLocations } from "../data/mockData";
import BookingModal from "../components/BookingModal";
import MessageModal from "../components/MessageModal";
import ImageModal, { type ImageData } from "../components/ImageModal";

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const location = mockLocations.find(loc => loc.id === id);

  // Handle URL hash navigation for booking and messaging
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#book') {
      setIsBookingOpen(true);
    } else if (hash === '#message') {
      setIsMessageOpen(true);
    }
  }, []);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-coral-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-coral-600 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const galleryImages = [location.heroImage, ...location.gallery];
  const modalImages: ImageData[] = [
    { id: '0', src: location.heroImage, alt: location.title, title: location.title },
    ...location.gallery.map((img, idx) => ({
      id: String(idx + 1),
      src: img,
      alt: `${location.title} - Photo ${idx + 1}`,
      title: `${location.title} - Photo ${idx + 1}`
    }))
  ];

  // Mock additional data that would come from API
  const locationDetails = {
    description: "This versatile studio space combines industrial aesthetics with modern amenities, perfect for fashion photography, product shoots, and commercial filming. Natural light floods the space during golden hours, while professional lighting equipment ensures consistent results throughout the day.",
    amenities: [
      { icon: Wifi, name: "High-Speed WiFi", available: true },
      { icon: Car, name: "Parking Space", available: location.metadata.parking },
      { icon: Shield, name: "Security", available: true },
      { icon: Volume2, name: "Sound Equipment", available: true },
      { icon: Thermometer, name: "Climate Control", available: true },
      { icon: Camera, name: "Backdrop Support", available: true }
    ],
    specifications: [
      { label: "Space Size", value: `${location.metadata.sizeM2}m²`, icon: Ruler },
      { label: "Power Supply", value: `${location.metadata.powerAmps}A`, icon: Zap },
      { label: "Max Crew", value: `${location.metadata.maxCrew} people`, icon: Users },
      { label: "Ceiling Height", value: "4.5m", icon: Ruler },
      { label: "Natural Light", value: "North-facing windows", icon: Sun },
      { label: "Setup Time", value: "30 minutes", icon: Clock }
    ],
    policies: [
      "24-hour advance booking required",
      "Professional use only",
      "Additional charges for overtime",
      "Damage deposit required",
      "No smoking policy",
      "Clean-up included in base rate"
    ],
    nearbyLocations: [
      "Coffee shop (2 min walk)",
      "Equipment rental (5 min drive)",
      "Makeup studio (next building)",
      "Catering services (10 min walk)"
    ],
    scout: {
      id: "1",
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face",
      rating: 4.9,
      responseTime: "Within 2 hours"
    }
  };

  const relatedLocations = mockLocations
    .filter(loc => 
      loc.id !== location.id && 
      loc.tags.some(tag => location.tags.includes(tag))
    )
    .slice(0, 3);

  const handleTagClick = (tag: string) => {
    navigate(`/?tag=${encodeURIComponent(tag)}`);
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const handleBookNow = () => {
    setIsBookingOpen(true);
    window.history.pushState(null, '', '#book');
  };

  const handleMessage = () => {
    setIsMessageOpen(true);
    window.history.pushState(null, '', '#message');
  };

  const handleCloseModal = () => {
    setIsBookingOpen(false);
    setIsMessageOpen(false);
    window.history.pushState(null, '', window.location.pathname);
  };

  const handleScoutClick = () => {
    navigate(`/scout/${locationDetails.scout.id}`);
  };

  const handleRelatedLocationClick = (locationId: string) => {
    navigate(`/location/${locationId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to search</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  isLiked 
                    ? 'bg-coral-50 border-coral-200 text-coral-600' 
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">Save</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <Share2 className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image - Reduced height */}
      <div className="relative">
        <div className="aspect-[16/9] md:aspect-[3/1] bg-gray-100">
          <img
            src={galleryImages[currentImageIndex]}
            alt={`${location.title} - Main view ${currentImageIndex + 1} of ${galleryImages.length}`}
            className="w-full h-full object-cover cursor-pointer hover:brightness-110 transition-all"
            onClick={() => handleImageClick(currentImageIndex)}
          />
        </div>

        {/* Image Navigation */}
        {galleryImages.length > 1 && (
          <>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2 bg-black/60 backdrop-blur-sm rounded-xl p-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Arrow Navigation */}
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all hover:scale-110"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all hover:scale-110"
            >
              ›
            </button>
          </>
        )}

        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-sm font-medium">
          {currentImageIndex + 1} / {galleryImages.length}
        </div>

        <button
          onClick={() => handleImageClick(currentImageIndex)}
          className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-sm font-medium hover:bg-black/70 transition-colors"
        >
          View Gallery
        </button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3">
            {/* Title & Location */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{location.location}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {location.title}
              </h1>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-lg">{location.rating}</span>
                    <span className="text-gray-500">({location.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-coral-600">
                  ₱{location.price.toLocaleString()}/day
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {locationDetails.description}
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locationDetails.specifications.map((spec, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                    <spec.icon className="h-6 w-6 text-coral-500" />
                    <div>
                      <div className="font-semibold text-gray-900">{spec.value}</div>
                      <div className="text-sm text-gray-600">{spec.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Amenities & Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {locationDetails.amenities.map((amenity, index) => (
                  <div key={index} className={`flex items-center gap-3 p-4 rounded-xl border ${
                    amenity.available 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-gray-50 border-gray-200 text-gray-500'
                  }`}>
                    <amenity.icon className="h-5 w-5" />
                    <span className="font-medium">{amenity.name}</span>
                    <span className="ml-auto">
                      {amenity.available ? '✓' : '✗'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Booking Policies</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3">
                  {locationDetails.policies.map((policy, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-coral-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{policy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Nearby Services */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Nearby Services</h2>
              <div className="grid grid-cols-2 gap-3">
                {locationDetails.nearbyLocations.map((nearby, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-3 text-center">
                    <span className="text-blue-700 font-medium">{nearby}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery Grid */}
            {galleryImages.length > 1 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-coral-300 hover:shadow-lg transform hover:scale-105 ${
                        index === currentImageIndex 
                          ? 'border-coral-500 ring-2 ring-coral-200' 
                          : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${location.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Related Locations */}
            {relatedLocations.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Similar Locations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedLocations.map(relatedLocation => (
                    <div 
                      key={relatedLocation.id}
                      className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                      onClick={() => handleRelatedLocationClick(relatedLocation.id)}
                    >
                      <div className="aspect-video rounded-lg overflow-hidden mb-3 shadow-lg">
                        <img
                          src={relatedLocation.heroImage}
                          alt={relatedLocation.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-coral-600 transition-colors">{relatedLocation.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{relatedLocation.location}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-coral-600">₱{relatedLocation.price.toLocaleString()}/day</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm">{relatedLocation.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Tags & Categories - Moved to right sidebar */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Tags & Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {location.tags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      className="px-3 py-2 bg-coral-50 text-coral-700 rounded-full text-sm font-medium hover:bg-coral-100 transition-colors border border-coral-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Booking Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ₱{location.price.toLocaleString()}
                  </div>
                  <div className="text-gray-600">per day</div>
                </div>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={handleBookNow}
                    className="w-full bg-coral-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-coral-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Calendar className="h-4 w-4" />
                    Book This Location
                  </button>
                  
                  <button
                    onClick={handleMessage}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 hover:border-coral-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Message Scout
                  </button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  You won't be charged yet
                </div>
              </div>

              {/* Scout Info */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-4">Your Location Scout</h3>
                <button 
                  onClick={handleScoutClick}
                  className="flex items-center gap-3 w-full hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors group"
                >
                  <img
                    src={locationDetails.scout.avatar}
                    alt={locationDetails.scout.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-coral-100 group-hover:ring-coral-200 transition-all"
                  />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 group-hover:text-coral-600 transition-colors">{locationDetails.scout.name}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{locationDetails.scout.rating}</span>
                      <span className="text-gray-500">• {locationDetails.scout.responseTime}</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response rate</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg response time</span>
                    <span className="font-semibold text-coral-600">2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total bookings</span>
                    <span className="font-semibold text-blue-600">127</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseModal}
        location={location}
      />
      
      <MessageModal
        isOpen={isMessageOpen}
        onClose={handleCloseModal}
        location={location}
      />

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={modalImages}
        initialIndex={currentImageIndex}
      />
    </div>
  );
};

export default LocationDetail;
