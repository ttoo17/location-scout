import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LocationCardSkeletonProps {
  className?: string;
  variant?: 'grid' | 'list' | 'featured';
}

const LocationCardSkeleton = ({ className, variant = 'grid' }: LocationCardSkeletonProps = {}) => {
  // List variant
  if (variant === 'list') {
    return (
      <Card className={cn("overflow-hidden animate-pulse", className)}>
        <div className="flex">
          {/* Compact Image Skeleton */}
          <div className="relative w-48 h-32 flex-shrink-0">
            <Skeleton className="w-full h-full rounded-l-lg" />
            {/* Overlay elements */}
            <div className="absolute top-2 right-2">
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
            <div className="absolute bottom-2 left-2">
              <Skeleton className="w-16 h-4 rounded-full" />
            </div>
            <div className="absolute bottom-2 right-2">
              <Skeleton className="w-6 h-4 rounded" />
            </div>
          </div>
          
          {/* Compact Content Skeleton */}
          <div className="flex-1 p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton className="w-3/4 h-5" />
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="w-1/2 h-4" />
                </div>
              </div>
              <Skeleton className="w-16 h-4" />
            </div>
            
            <div className="flex gap-2">
              <Skeleton className="w-12 h-5 rounded-full" />
              <Skeleton className="w-16 h-5 rounded-full" />
              <Skeleton className="w-14 h-5 rounded-full" />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-4">
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-10 h-4" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="w-16 h-8 rounded" />
                <Skeleton className="w-8 h-8 rounded" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Featured variant
  if (variant === 'featured') {
    return (
      <Card className={cn("overflow-hidden animate-pulse border-2 border-primary/20", className)}>
        {/* Large Image Skeleton */}
        <div className="relative h-80">
          <Skeleton className="w-full h-full" />
          {/* Featured badge */}
          <div className="absolute top-2 left-2">
            <Skeleton className="w-20 h-6 rounded-full" />
          </div>
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          {/* Price badge */}
          <div className="absolute bottom-4 left-4">
            <Skeleton className="w-24 h-6 rounded-full" />
          </div>
          {/* Image count */}
          <div className="absolute top-4 left-4">
            <Skeleton className="w-20 h-5 rounded-full" />
          </div>
        </div>
        
        {/* Enhanced Content Skeleton */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-2/3 h-6" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-1/3 h-4" />
            </div>
            <Skeleton className="w-20 h-4" />
          </div>
          
          <div className="flex gap-2">
            <Skeleton className="w-16 h-6 rounded-full" />
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-18 h-6 rounded-full" />
            <Skeleton className="w-14 h-6 rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg">
                <Skeleton className="w-6 h-6 rounded-full" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-2/3 h-3" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-3 pt-4">
            <Skeleton className="flex-1 h-12 rounded-xl" />
            <Skeleton className="w-12 h-12 rounded-xl" />
          </div>
        </div>
      </Card>
    );
  }

  // Default grid variant
  return (
    <Card className={cn("overflow-hidden animate-pulse border border-border/50", className)}>
      {/* Image Skeleton */}
      <div className="relative h-64">
        <Skeleton className="w-full h-full" />
        
        {/* Action buttons skeleton */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        
        {/* Price badge skeleton */}
        <div className="absolute bottom-4 left-4">
          <Skeleton className="w-24 h-6 rounded-full" />
        </div>
        
        {/* Image count skeleton */}
        <div className="absolute top-4 left-4">
          <Skeleton className="w-20 h-5 rounded-full" />
        </div>
        
        {/* Rating badge skeleton */}
        <div className="absolute bottom-4 right-4">
          <Skeleton className="w-12 h-5 rounded-full" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        {/* Location and rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
          <Skeleton className="w-16 h-4" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="w-3/4 h-5" />
          <Skeleton className="w-1/2 h-5" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-20 h-6 rounded-full" />
          <Skeleton className="w-14 h-6 rounded-full" />
          <Skeleton className="w-12 h-6 rounded-full" />
        </div>

        {/* Enhanced Metadata with icons */}
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg">
              <Skeleton className="w-6 h-6 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="w-full h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2.5 pt-2">
          <Skeleton className="flex-1 h-10 rounded-xl" />
          <Skeleton className="w-10 h-10 rounded-xl" />
        </div>
      </div>
    </Card>
  );
};

export default LocationCardSkeleton;
