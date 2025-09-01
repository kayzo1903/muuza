"use client";

import { Skeleton } from "@/components/ui/skeleton";

function RestaurantCardSkeleton({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <div
      className={`${
        horizontal ? "min-w-[280px] md:min-w-[300px] lg:min-w-[320px]" : ""
      } h-96 flex-shrink-0`}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-md h-full border border-yellow-300">
        {/* Image placeholder */}
        <Skeleton className="absolute inset-0 w-full h-full" />

        {/* Distance badge */}
        <Skeleton className="absolute top-3 left-3 w-12 h-5 rounded-full" />

        {/* Rating badge */}
        <Skeleton className="absolute top-3 right-3 w-12 h-5 rounded-full" />

        {/* Info bottom overlay */}
        <div className="absolute bottom-0 p-4 w-full">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <section className="w-full p-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <Skeleton className="h-8 w-1/3 mx-auto mb-2" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>

        {/* Nearby Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-32" />
          </div>

          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {Array.from({ length: 3 }).map((_, i) => (
              <RestaurantCardSkeleton key={i} horizontal />
            ))}
          </div>
        </div>

        {/* Discover Section */}
        <div>
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
