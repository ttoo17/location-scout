
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Tag, MessageCircle, Heart, Share2, Star } from "lucide-react";
import { mockLocations } from "../data/mockData";
import BookingModal from "../components/BookingModal";
import MessageModal from "../components/MessageModal";
import ImageModal, { type ImageData } from "../components/ImageModal";

const ImageDetail = () => {
  const { locationId, imageIndex } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const location = mockLocations.find(loc => loc.id === locationId);
  const imageIdx = parseInt(imageIndex || "0");

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Image Not Found</h1>
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
  const currentImage = galleryImages[imageIdx];

  // Mock image-specific data
  const imageData = {
    title: `${location.title} - Image ${imageIdx + 1}`,
    description: imageIdx === 0 
      ? "Main studio space featuring professional lighting setup and clean industrial aesthetic. Perfect for fashion photography and commercial shoots."
      : `Detail view ${imageIdx} showcasing ${location.tags[imageIdx % location.tags.length]} features with natural lighting and professional equipment setup.`,
    specificTags: imageIdx === 0 
      ? ["Main Studio", "Professional Lighting", "Fashion Photography", "Industrial Design"]
      : ["Detail Shot", location.tags[imageIdx % location.tags.length], "Natural Light", "Professional Setup"],
    capturedDate: "2024-01-15",
    photographer: "Studio Team",
    equipment: "Canon EOS R5, 24-70mm f/2.8"
  };

  const relatedImages = galleryImages
    .map((img, idx) => ({ image: img, index: idx }))
    .filter((_, idx) => idx !== imageIdx)
    .slice(0, 5);

  const handleTagClick = (tag: string) => {
    navigate(`/?tag=${encodeURIComponent(tag)}`);
  };

  const handleLocationClick = () => {
    navigate(`/location/${location.id}`);
  };

  const handleScoutClick = () => {
    navigate(`/scout/1`); // Mock scout ID
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'text-coral-500 fill-current' : 'text-gray-600'}`} />
                Save
              </button>
              
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm">
                <Share2 className="h-4 w-4 text-gray-600" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Image */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-[4/3] bg-gray-100 relative">
                <img
                  src={currentImage}
                  alt={imageData.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setIsImageModalOpen(true)}
                />
              </div>
            </div>

            {/* Related Images - Horizontal Strip */}
            {relatedImages.length > 0 && (
              <div className="mt-4">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {relatedImages.map(({ image, index }) => (
                    <button
                      key={index}
                      onClick={() => navigate(`/image/${location.id}/${index}`)}
                      className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-coral-300 transition-all"
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
          </div>

          {/* Right Column - Image Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  {imageData.title}
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {imageData.description}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {imageData.specificTags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Info - Compact */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Location</h3>
                <div 
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={handleLocationClick}
                >
                  <img
                    src={location.heroImage}
                    alt={location.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">{location.title}</h4>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{location.location}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium">{location.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scout Info - Compact */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Scout</h3>
                <div 
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={handleScoutClick}
                >
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=48&h=48&fit=crop&crop=face"
                    alt="Maria Santos"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm">Maria Santos</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t pt-4 space-y-2">
                <button
                  onClick={handleLocationClick}
                  className="w-full bg-coral-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-coral-600 transition-colors text-sm"
                >
                  View Location Details
                </button>
                
                <button
                  onClick={() => setIsMessageOpen(true)}
                  className="w-full border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message Scout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        location={location}
      />
      
      <MessageModal
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        location={location}
      />

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={modalImages}
        initialIndex={imageIdx}
      />
    </div>
  );
};

export default ImageDetail;
