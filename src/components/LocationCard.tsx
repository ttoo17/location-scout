
import { useState, useRef, useEffect, useCallback } from "react";
import { 
  MapPin, 
  Calendar, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  Maximize2,
  Heart,
  Star,
  Users,
  Zap,
  Car,
  Share2,
  Bookmark
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageModal, { type ImageData } from "./ImageModal";
import { cn } from "@/lib/utils";

interface Location {
  id: string;
  title: string;
  heroImage: string;
  gallery: string[];
  tags: string[];
  price: number;
  location: string;
  rating: number;
  reviews: number;
  metadata: {
    sizeM2: number;
    powerAmps: number;
    maxCrew: number;
    parking: boolean;
  };
}

interface LocationCardProps {
  location: Location;
}

// Enhanced Image Carousel Component
interface ImageCarouselProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onImageClick: (e: React.MouseEvent, index: number) => void;
  locationTitle: string;
}

const ImageCarousel = ({ 
  images, 
  currentIndex, 
  onIndexChange, 
  onImageClick, 
  locationTitle 
}: ImageCarouselProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % images.length;
    onIndexChange(nextIndex);
    
    // Preload next image
    setLoadedImages(prev => new Set([...prev, nextIndex, (nextIndex + 1) % images.length]));
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, images.length, onIndexChange, isTransitioning]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onIndexChange(prevIndex);
    
    // Preload previous image
    setLoadedImages(prev => new Set([...prev, prevIndex, (prevIndex - 1 + images.length) % images.length]));
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, images.length, onIndexChange, isTransitioning]);

  // Touch handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    autoPlayRef.current = setInterval(() => {
      nextImage();
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [nextImage, images.length, isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovered) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage, isHovered]);

  const handleDotNavigation = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    onIndexChange(index);
    setLoadedImages(prev => new Set([...prev, index]));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div 
      ref={carouselRef}
      className="relative h-64 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Image Container */}
      <div 
        className="flex transition-transform duration-300 ease-out h-full"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${images.length * 100}%`
        }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative w-full h-full flex-shrink-0"
            style={{ width: `${100 / images.length}%` }}
          >
            {loadedImages.has(index) ? (
              <img
                src={image}
                alt={`${locationTitle} - Image ${index + 1} of ${images.length}`}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500",
                  "group-hover:scale-110",
                  isTransitioning && "blur-[1px]"
                )}
                onClick={(e) => onImageClick(e, index)}
                loading={index === 0 ? "eager" : "lazy"}
                onLoad={() => {
                  // Preload adjacent images when current image loads
                  const adjacentIndices = [
                    (index - 1 + images.length) % images.length,
                    (index + 1) % images.length
                  ];
                  setLoadedImages(prev => new Set([...prev, ...adjacentIndices]));
                }}
              />
            ) : (
              <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            
            {/* Zoom indicator on hover */}
            <div className={cn(
              "absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 transition-opacity duration-200",
              "group-hover:opacity-100"
            )}>
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                <ZoomIn className="h-5 w-5 text-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className={cn(
              "absolute left-2 top-1/2 transform -translate-y-1/2",
              "bg-black/50 text-white p-2 rounded-full",
              "opacity-0 group-hover:opacity-100 transition-all duration-200",
              "hover:bg-black/70 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            disabled={isTransitioning}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <button
            onClick={nextImage}
            className={cn(
              "absolute right-2 top-1/2 transform -translate-y-1/2",
              "bg-black/50 text-white p-2 rounded-full",
              "opacity-0 group-hover:opacity-100 transition-all duration-200",
              "hover:bg-black/70 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            disabled={isTransitioning}
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleDotNavigation(e, index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                "hover:scale-125 focus:outline-none focus:ring-1 focus:ring-white/50",
                index === currentIndex 
                  ? "bg-white shadow-lg scale-110" 
                  : "bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {images.length > 1 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-black/20">
          <div 
            className="h-full bg-white/80 transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
          />
        </div>
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

const LocationCard = ({ location }: LocationCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [bookingAnimation, setBookingAnimation] = useState(false);
  const [shareAnimation, setShareAnimation] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const handleCardClick = () => {
    navigate(`/location/${location.id}`);
  };

  const handleImageClick = (e: React.MouseEvent, imageIndex: number) => {
    e.stopPropagation();
    setCurrentImageIndex(imageIndex);
    setIsImageModalOpen(true);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookingAnimation(true);
    setTimeout(() => setBookingAnimation(false), 600);
    
    // Add a slight delay for visual feedback
    setTimeout(() => {
      navigate(`/location/${location.id}#book`);
    }, 200);
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/location/${location.id}#message`);
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeAnimation(true);
    
    // Reset animation after completion
    setTimeout(() => setLikeAnimation(false), 600);
    
    // Add haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShareAnimation(true);
    setTimeout(() => setShareAnimation(false), 400);
    
    // Web Share API or fallback to clipboard
    if (navigator.share) {
      navigator.share({
        title: location.title,
        text: `Check out this amazing location: ${location.title}`,
        url: `${window.location.origin}/location/${location.id}`
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/location/${location.id}`);
    }
  };

  // Enhanced hover effects with mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateY(-8px) 
      scale(1.02)
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <>
      <div 
        ref={cardRef}
        className={cn(
          "group bg-card rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-border/50",
          "transition-all duration-300 ease-out",
          "hover:shadow-2xl hover:shadow-primary/10",
          isHovered && "shadow-xl shadow-primary/20"
        )}
        onClick={handleCardClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Enhanced Image Carousel */}
        <div className="relative">
          <ImageCarousel
            images={galleryImages}
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
            onImageClick={handleImageClick}
            locationTitle={location.title}
          />
          
          {/* Overlay Elements */}
          {/* Action buttons row */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {/* Like button with enhanced animation */}
            <button
              className={cn(
                "p-2.5 rounded-full backdrop-blur-sm transition-all duration-300",
                "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
                "shadow-lg group/like",
                likeAnimation && "animate-bounce-in",
                isLiked 
                  ? "bg-red-500 text-white shadow-red-500/25" 
                  : "bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white hover:shadow-red-500/10"
              )}
              onClick={handleLikeToggle}
              aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isLiked && "fill-current scale-110",
                  likeAnimation && "animate-pulse"
                )}
              />
              {/* Heart particles effect */}
              {likeAnimation && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-red-500 rounded-full animate-ping"
                      style={{
                        top: '50%',
                        left: '50%',
                        animationDelay: `${i * 100}ms`,
                        transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-20px)`
                      }}
                    />
                  ))}
                </div>
              )}
            </button>

            {/* Bookmark button */}
            <button
              className={cn(
                "p-2.5 rounded-full backdrop-blur-sm transition-all duration-200",
                "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
                "shadow-lg opacity-0 group-hover:opacity-100",
                isBookmarked 
                  ? "bg-amber-500 text-white shadow-amber-500/25" 
                  : "bg-white/90 text-gray-600 hover:text-amber-500 hover:bg-white"
              )}
              onClick={handleBookmarkToggle}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <Bookmark
                className={cn(
                  "h-4 w-4 transition-all duration-200",
                  isBookmarked && "fill-current"
                )}
              />
            </button>

            {/* Share button */}
            <button
              className={cn(
                "p-2.5 rounded-full backdrop-blur-sm transition-all duration-200",
                "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
                "shadow-lg opacity-0 group-hover:opacity-100",
                "bg-white/90 text-gray-600 hover:text-primary hover:bg-white",
                shareAnimation && "animate-pulse"
              )}
              onClick={handleShare}
              aria-label="Share location"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {/* Enhanced price badge */}
          <div className={cn(
            "absolute bottom-4 left-4 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border z-10",
            "transition-all duration-300 group-hover:scale-105",
            "bg-gradient-to-r from-white/95 to-white/90 border-white/30"
          )}>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-gray-900">₱{location.price.toLocaleString()}</span>
              <span className="text-xs text-gray-500">/day</span>
            </div>
          </div>

          {/* Enhanced image count badge */}
          <div className={cn(
            "absolute top-4 left-4 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium z-10",
            "flex items-center gap-1 transition-all duration-300",
            "bg-black/70 text-white border border-white/10",
            "group-hover:bg-black/80 group-hover:scale-105"
          )}>
            <Maximize2 className="h-3 w-3" />
            {galleryImages.length} photos
          </div>

          {/* Rating badge (appears on hover) */}
          <div className={cn(
            "absolute bottom-4 right-4 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium z-10",
            "flex items-center gap-1 transition-all duration-300",
            "bg-amber-500/90 text-white border border-amber-400/30",
            "opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          )}>
            <Star className="h-3 w-3 fill-current" />
            {location.rating}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Location and rating */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{location.location}</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-amber-400">★</span>
              <span className="text-sm font-medium text-foreground">{location.rating}</span>
              <span className="text-sm text-muted-foreground">({location.reviews})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {location.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {location.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {tag}
              </span>
            ))}
            {location.tags.length > 3 && (
              <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border hover:bg-muted/80 transition-colors">
                +{location.tags.length - 3}
              </span>
            )}
          </div>

          {/* Enhanced Metadata with icons */}
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
            <div className={cn(
              "flex items-center gap-2 p-2 rounded-lg transition-all duration-200",
              "hover:bg-accent/50 group/meta"
            )}>
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
              <div>
                <span className="font-semibold text-foreground">{location.metadata.sizeM2}m²</span>
                <span className="ml-1">space</span>
              </div>
            </div>
            
            <div className={cn(
              "flex items-center gap-2 p-2 rounded-lg transition-all duration-200",
              "hover:bg-accent/50 group/meta"
            )}>
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <span className="font-semibold text-foreground">{location.metadata.maxCrew}</span>
                <span className="ml-1">max crew</span>
              </div>
            </div>
            
            <div className={cn(
              "flex items-center gap-2 p-2 rounded-lg transition-all duration-200",
              "hover:bg-accent/50 group/meta"
            )}>
              <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-3 h-3 text-yellow-600" />
              </div>
              <div>
                <span className="font-semibold text-foreground">{location.metadata.powerAmps}A</span>
                <span className="ml-1">power</span>
              </div>
            </div>
            
            <div className={cn(
              "flex items-center gap-2 p-2 rounded-lg transition-all duration-200",
              "hover:bg-accent/50 group/meta"
            )}>
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                location.metadata.parking 
                  ? "bg-green-500/10" 
                  : "bg-red-500/10"
              )}>
                <Car className={cn(
                  "w-3 h-3",
                  location.metadata.parking 
                    ? "text-green-600" 
                    : "text-red-600"
                )} />
              </div>
              <div>
                <span className={cn(
                  "font-semibold",
                  location.metadata.parking 
                    ? "text-green-600" 
                    : "text-red-600"
                )}>
                  {location.metadata.parking ? "Available" : "No parking"}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Action buttons */}
          <div className="flex gap-2.5">
            <button 
              className={cn(
                "flex-1 bg-primary text-primary-foreground py-2.5 px-4 rounded-xl font-medium",
                "hover:bg-primary/90 transition-all duration-300",
                "flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-primary/25",
                "transform hover:scale-[1.02] active:scale-[0.98]",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
                "relative overflow-hidden group/book",
                bookingAnimation && "animate-pulse"
              )}
              onClick={handleBookNow}
              aria-label={`Book ${location.title}`}
            >
              {/* Shimmer effect */}
              <div className={cn(
                "absolute inset-0 -translate-x-full group-hover/book:translate-x-full",
                "bg-gradient-to-r from-transparent via-white/20 to-transparent",
                "transition-transform duration-700 ease-out"
              )} />
              
              <Calendar className={cn(
                "h-4 w-4 transition-transform duration-200",
                bookingAnimation && "animate-bounce"
              )} />
              Book Now
              
              {/* Success indicator */}
              {bookingAnimation && (
                <div className="absolute inset-0 bg-green-500 rounded-xl flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>
            
            <button 
              className={cn(
                "bg-secondary text-secondary-foreground p-2.5 rounded-xl",
                "hover:bg-secondary/80 transition-all duration-200",
                "hover:text-primary transform hover:scale-[1.02] active:scale-[0.98]",
                "focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2",
                "shadow-sm hover:shadow-md hover:shadow-secondary/25",
                "relative group/message"
              )}
              onClick={handleMessage}
              aria-label={`Send message about ${location.title}`}
            >
              <MessageCircle className="h-4 w-4 group-hover/message:animate-pulse" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={modalImages}
        initialIndex={currentImageIndex}
      />
    </>
  );
};

export default LocationCard;
