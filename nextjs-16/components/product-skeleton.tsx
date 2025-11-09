import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductSkeletonProps {
  className?: string;
}

export function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <Card
      className={`overflow-hidden border-0 py-0 shadow-sm bg-white dark:bg-gray-900 animate-pulse w-full ${className}`}
    >
      {/* Product Image Skeleton */}
      <div className="aspect-4/3 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />
      </div>

      <CardContent className="p-3">
        {/* Category Badge Skeleton */}
        <div className="mb-2">
          <div className="inline-block h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>

        {/* Product Title Skeleton */}
        <div className="mb-1.5">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        </div>

        {/* Product Description Skeleton */}
        <div className="mb-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded"
              />
            ))}
          </div>
          <div className="h-3 w-6 bg-gray-200 dark:bg-gray-700 rounded ml-1" />
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          {/* Price Skeleton */}
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-14" />
          {/* Shipping Info Skeleton */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-18" />
        </div>

        {/* Add to Cart Button Skeleton */}
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded px-3 py-1.5 w-20" />
      </CardFooter>
    </Card>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

export function ProductGridSkeleton({
  count = 4,
  className,
}: ProductGridSkeletonProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

interface ProductListSkeletonProps {
  className?: string;
}

export function ProductListSkeleton({ className }: ProductListSkeletonProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-8 ${className}`}>
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2 animate-pulse" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-96 animate-pulse" />
      </div>

      {/* Products Grid Skeleton */}
      <ProductGridSkeleton />
    </div>
  );
}
