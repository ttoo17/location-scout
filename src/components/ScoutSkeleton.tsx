import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScoutSkeletonProps {
  className?: string;
}

const ScoutSkeleton = ({ className }: ScoutSkeletonProps = {}) => {
  return (
    <Card className={cn("overflow-hidden animate-pulse border border-border/50", className)}>
      {/* Scout Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />

          <div className="flex-1 space-y-2">
            {/* Name */}
            <Skeleton className="w-3/4 h-6" />

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="w-12 h-4" />
              <Skeleton className="w-20 h-4" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-24 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-full h-20 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Scout Details */}
      <div className="px-6 pb-4 space-y-4">
        {/* Specialty Tags */}
        <div className="flex gap-2">
          <Skeleton className="w-20 h-6 rounded-md" />
          <Skeleton className="w-24 h-6 rounded-md" />
          <Skeleton className="w-16 h-6 rounded-md" />
        </div>

        {/* About Text */}
        <div className="space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-16 h-5" />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 space-y-3">
        <Skeleton className="w-full h-11 rounded-xl" />

        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-full h-10 rounded-lg" />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ScoutSkeleton;
