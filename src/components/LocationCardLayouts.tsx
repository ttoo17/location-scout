import React, { memo, useState, useMemo } from 'react';
import { Grid, List, LayoutGrid, Rows3, Filter, SortAsc } from 'lucide-react';
import LocationCard from './LocationCard';
import LocationCardSkeleton from './LocationCardSkeleton';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

// Types
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

interface LocationCardLayoutsProps {
  locations: Location[];
  loading?: boolean;
  className?: string;
  showControls?: boolean;
  defaultView?: 'grid' | 'list';
  gridColumns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  featuredId?: string;
}

// Enhanced LocationCard with performance optimization
const OptimizedLocationCard = memo(LocationCard, (prevProps, nextProps) => {
  return (
    prevProps.location.id === nextProps.location.id &&
    prevProps.location.price === nextProps.location.price &&
    prevProps.location.rating === nextProps.location.rating
  );
});

// Enhanced LocationCardSkeleton with variants
interface EnhancedSkeletonProps {
  variant?: 'grid' | 'list' | 'featured';
  className?: string;
}

const EnhancedLocationCardSkeleton = memo(({ variant = 'grid', className }: EnhancedSkeletonProps) => {
  if (variant === 'list') {
    return (
      <Card className={cn("overflow-hidden animate-pulse", className)}>
        <div className="flex">
          {/* Image Skeleton */}
          <div className="relative w-48 h-32 flex-shrink-0">
            <div className="w-full h-full bg-muted rounded-l-lg" />
            {/* Overlay elements */}
            <div className="absolute top-2 right-2 w-6 h-6 bg-muted-foreground/20 rounded-full" />
            <div className="absolute bottom-2 left-2 w-16 h-4 bg-muted-foreground/20 rounded-full" />
          </div>
          
          {/* Content Skeleton */}
          <div className="flex-1 p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="w-3/4 h-5 bg-muted rounded" />
                <div className="w-1/2 h-4 bg-muted rounded" />
              </div>
              <div className="w-16 h-4 bg-muted rounded" />
            </div>
            
            <div className="flex gap-2">
              <div className="w-12 h-5 bg-muted rounded-full" />
              <div className="w-16 h-5 bg-muted rounded-full" />
              <div className="w-14 h-5 bg-muted rounded-full" />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-4">
                <div className="w-12 h-4 bg-muted rounded" />
                <div className="w-16 h-4 bg-muted rounded" />
              </div>
              <div className="flex gap-2">
                <div className="w-20 h-8 bg-muted rounded" />
                <div className="w-8 h-8 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className={cn("overflow-hidden animate-pulse", className)}>
        {/* Large Image Skeleton */}
        <div className="relative h-80">
          <div className="w-full h-full bg-muted" />
          {/* Overlay elements */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <div className="w-8 h-8 bg-muted-foreground/20 rounded-full" />
            <div className="w-8 h-8 bg-muted-foreground/20 rounded-full" />
          </div>
          <div className="absolute bottom-4 left-4 w-24 h-6 bg-muted-foreground/20 rounded-full" />
          <div className="absolute top-4 left-4 w-20 h-5 bg-muted-foreground/20 rounded-full" />
        </div>
        
        {/* Enhanced Content Skeleton */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="w-full h-6 bg-muted rounded" />
            <div className="w-2/3 h-6 bg-muted rounded" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="w-1/3 h-4 bg-muted rounded" />
            <div className="w-20 h-4 bg-muted rounded" />
          </div>
          
          <div className="flex gap-2">
            <div className="w-16 h-6 bg-muted rounded-full" />
            <div className="w-20 h-6 bg-muted rounded-full" />
            <div className="w-18 h-6 bg-muted rounded-full" />
            <div className="w-14 h-6 bg-muted rounded-full" />
          </div>
          
          <div className="grid grid-cols-4 gap-4 pt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="w-full h-4 bg-muted rounded" />
                <div className="w-2/3 h-3 bg-muted rounded" />
              </div>
            ))}
          </div>
          
          <div className="flex gap-3 pt-4">
            <div className="flex-1 h-12 bg-muted rounded-xl" />
            <div className="w-12 h-12 bg-muted rounded-xl" />
          </div>
        </div>
      </Card>
    );
  }

  // Default grid variant
  return <LocationCardSkeleton />;
});

// Featured LocationCard variant
interface FeaturedLocationCardProps {
  location: Location;
  className?: string;
}

const FeaturedLocationCard = memo(({ location, className }: FeaturedLocationCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden group cursor-pointer border-2 border-primary/20",
      "hover:border-primary/40 transition-all duration-300",
      "bg-gradient-to-br from-card to-card/80",
      "shadow-xl hover:shadow-2xl hover:shadow-primary/10",
      className
    )}>
      {/* Enhanced featured layout would go here */}
      {/* For now, we'll use the regular LocationCard with enhanced styling */}
      <div className="relative">
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
            FEATURED
          </div>
        </div>
        <LocationCard location={location} />
      </div>
    </Card>
  );
});

// List view variant of LocationCard
interface ListLocationCardProps {
  location: Location;
  className?: string;
}

const ListLocationCard = memo(({ location, className }: ListLocationCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [location.heroImage, ...location.gallery];

  return (
    <Card className={cn(
      "overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300",
      className
    )}>
      <div className="flex">
        {/* Compact Image */}
        <div className="relative w-48 h-32 flex-shrink-0">
          <img
            src={allImages[currentImageIndex]}
            alt={location.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Compact overlays */}
          <div className="absolute top-2 right-2">
            <button className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:scale-110 transition-all">
              <div className="w-4 h-4 text-gray-600">♡</div>
            </button>
          </div>
          
          <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold">
            ₱{location.price.toLocaleString()}
          </div>
          
          {allImages.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-1.5 py-0.5 rounded text-xs">
              {allImages.length}
            </div>
          )}
        </div>
        
        {/* Compact Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors">
                {location.title}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <span>📍</span>
                <span className="truncate">{location.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-amber-400">★</span>
              <span>{location.rating}</span>
            </div>
          </div>
          
          {/* Compact tags */}
          <div className="flex gap-1 mb-3">
            {location.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {location.tags.length > 3 && (
              <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                +{location.tags.length - 3}
              </span>
            )}
          </div>
          
          {/* Compact metadata and actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>{location.metadata.sizeM2}m²</span>
              <span>{location.metadata.maxCrew} crew</span>
              <span>{location.metadata.powerAmps}A</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="h-8 px-3 text-xs">
                Book
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                💬
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

// Main LocationCardLayouts component
const LocationCardLayouts: React.FC<LocationCardLayoutsProps> = ({
  locations,
  loading = false,
  className,
  showControls = true,
  defaultView = 'grid',
  gridColumns = 3,
  gap = 'md',
  featuredId
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(defaultView);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'title'>('rating');

  // Memoized sorted locations
  const sortedLocations = useMemo(() => {
    return [...locations].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [locations, sortBy]);

  // Separate featured location
  const featuredLocation = featuredId ? sortedLocations.find(loc => loc.id === featuredId) : null;
  const regularLocations = featuredId 
    ? sortedLocations.filter(loc => loc.id !== featuredId)
    : sortedLocations;

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6'
  };

  const gridColsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  if (loading) {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Featured skeleton */}
        {featuredId && (
          <EnhancedLocationCardSkeleton variant="featured" className="col-span-full" />
        )}
        
        {/* Regular skeletons */}
        <div className={cn(
          viewMode === 'grid' 
            ? `grid ${gridColsClasses[gridColumns]} ${gapClasses[gap]}`
            : `space-y-${gap === 'sm' ? '3' : gap === 'md' ? '4' : '6'}`
        )}>
          {[...Array(6)].map((_, index) => (
            <EnhancedLocationCardSkeleton 
              key={index} 
              variant={viewMode}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex items-center gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2"
            >
              <Rows3 className="h-4 w-4" />
              List
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Button
              variant={sortBy === 'rating' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('rating')}
            >
              Rating
            </Button>
            <Button
              variant={sortBy === 'price' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('price')}
            >
              Price
            </Button>
            <Button
              variant={sortBy === 'title' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('title')}
            >
              Name
            </Button>
          </div>
        </div>
      )}

      {/* Featured Location */}
      {featuredLocation && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Location</h2>
          <FeaturedLocationCard location={featuredLocation} />
        </div>
      )}

      {/* Regular Locations */}
      <div className={cn(
        viewMode === 'grid' 
          ? `grid ${gridColsClasses[gridColumns]} ${gapClasses[gap]}`
          : `space-y-${gap === 'sm' ? '3' : gap === 'md' ? '4' : '6'}`
      )}>
        {regularLocations.map((location) => (
          viewMode === 'grid' ? (
            <OptimizedLocationCard key={location.id} location={location} />
          ) : (
            <ListLocationCard key={location.id} location={location} />
          )
        ))}
      </div>

      {/* Empty state */}
      {!loading && locations.length === 0 && (
        <Card className="p-12 text-center">
          <CardContent>
            <div className="text-muted-foreground">
              <Grid className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No locations found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default memo(LocationCardLayouts);
export { OptimizedLocationCard, ListLocationCard, FeaturedLocationCard, EnhancedLocationCardSkeleton };