import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers, RotateCcw, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

// Types
interface Location {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  price: number;
  rating: number;
  heroImage: string;
  tags: string[];
}

interface MapViewProps {
  locations: Location[];
  selectedLocation?: string;
  onLocationSelect?: (locationId: string) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  showControls?: boolean;
  clustered?: boolean;
}

// Mock map component (in a real app, you'd use Google Maps, Mapbox, etc.)
const MapView: React.FC<MapViewProps> = ({
  locations,
  selectedLocation,
  onLocationSelect,
  center = { lat: 14.5995, lng: 120.9842 }, // Manila center
  zoom = 10,
  className,
  showControls = true,
  clustered = true
}) => {
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [currentCenter, setCurrentCenter] = useState(center);
  const [mapStyle, setMapStyle] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  }, []);

  // Handle zoom controls
  const handleZoomIn = () => {
    setCurrentZoom(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setCurrentZoom(prev => Math.max(prev - 1, 1));
  };

  // Reset to default view
  const handleReset = () => {
    setCurrentCenter(center);
    setCurrentZoom(zoom);
  };

  // Center on user location
  const handleCenterOnUser = () => {
    if (userLocation) {
      setCurrentCenter(userLocation);
      setCurrentZoom(14);
    }
  };

  // Mock map rendering (replace with actual map implementation)
  const renderMapMarkers = () => {
    return locations.map((location, index) => {
      // Calculate position based on lat/lng (mock calculation)
      const x = ((location.longitude - (currentCenter.lng - 0.1)) / 0.2) * 100;
      const y = ((currentCenter.lat + 0.1 - location.latitude) / 0.2) * 100;
      
      // Only show markers within visible area
      if (x < 0 || x > 100 || y < 0 || y > 100) return null;

      const isSelected = selectedLocation === location.id;
      
      return (
        <div
          key={location.id}
          className={cn(
            "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200",
            "hover:scale-110 hover:z-10"
          )}
          style={{ left: `${x}%`, top: `${y}%` }}
          onClick={() => onLocationSelect?.(location.id)}
        >
          {/* Map marker */}
          <div className={cn(
            "relative w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-200",
            isSelected 
              ? "bg-primary scale-125 z-20" 
              : "bg-red-500 hover:bg-red-600"
          )}>
            <MapPin className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          {/* Price badge */}
          <div className={cn(
            "absolute -top-8 left-1/2 transform -translate-x-1/2 transition-all duration-200",
            "bg-white rounded-full px-2 py-1 text-xs font-bold shadow-md border",
            isSelected ? "scale-110 border-primary" : "border-gray-200"
          )}>
            ₱{location.price.toLocaleString()}
          </div>
          
          {/* Location popup on hover */}
          <div className={cn(
            "absolute bottom-10 left-1/2 transform -translate-x-1/2 w-48 opacity-0 pointer-events-none transition-all duration-200",
            "hover:opacity-100 hover:pointer-events-auto"
          )}>
            <Card className="shadow-lg border-2 border-primary/20">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <img
                    src={location.heroImage}
                    alt={location.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm line-clamp-1">{location.title}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-amber-400 text-xs">★</span>
                      <span className="text-xs text-muted-foreground">{location.rating}</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {location.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={cn("relative bg-muted rounded-lg overflow-hidden", className)}>
      {/* Mock map background */}
      <div 
        ref={mapRef}
        className="w-full h-full relative bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, transparent 49%, rgba(156, 163, 175, 0.1) 50%, transparent 51%)
          `,
          backgroundSize: '100px 100px, 150px 150px, 20px 20px'
        }}
      >
        {/* Grid overlay for map-like appearance */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* User location marker */}
        {userLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
            style={{
              left: `${((userLocation.lng - (currentCenter.lng - 0.1)) / 0.2) * 100}%`,
              top: `${((currentCenter.lat + 0.1 - userLocation.lat) / 0.2) * 100}%`
            }}
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-600 whitespace-nowrap">
              Your Location
            </div>
          </div>
        )}
        
        {/* Location markers */}
        {renderMapMarkers()}
        
        {/* Map controls */}
        {showControls && (
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {/* Zoom controls */}
            <div className="bg-white rounded-lg shadow-md border">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                className="h-8 w-8 p-0 rounded-t-lg rounded-b-none"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <div className="border-t px-2 py-1 text-xs text-center font-medium">
                {currentZoom}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                className="h-8 w-8 p-0 rounded-b-lg rounded-t-none"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Map style toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const styles: Array<'roadmap' | 'satellite' | 'hybrid'> = ['roadmap', 'satellite', 'hybrid'];
                const currentIndex = styles.indexOf(mapStyle);
                setMapStyle(styles[(currentIndex + 1) % styles.length]);
              }}
              className="h-8 w-8 p-0"
            >
              <Layers className="h-4 w-4" />
            </Button>
            
            {/* Reset view */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            {/* Center on user */}
            {userLocation && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCenterOnUser}
                className="h-8 w-8 p-0"
              >
                <Navigation className="h-4 w-4" />
              </Button>
            )}
            
            {/* Fullscreen */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (mapRef.current) {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    mapRef.current.requestFullscreen();
                  }
                }
              }}
              className="h-8 w-8 p-0"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {/* Map info */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
          <div className="font-medium">{locations.length} locations</div>
          <div className="text-muted-foreground text-xs">
            Zoom: {currentZoom} | Style: {mapStyle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;