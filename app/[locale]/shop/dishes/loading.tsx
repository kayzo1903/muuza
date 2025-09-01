import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function DishSkeleton() {
  return (
    <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
      {/* Image placeholder */}
      <div className="absolute inset-0">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Info overlay skeletons */}
      <div className="absolute bottom-0 p-4 w-full space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-10" />
        </div>
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    </Card>
  );
}

export default function Loading() {
  return (
    <section className="w-full p-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 text-center">
          <Skeleton className="h-8 w-40 mx-auto mb-2" />
          <Skeleton className="h-4 w-72 mx-auto" />
        </div>

        {/* Filter bar skeleton */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Skeleton className="h-9 w-24" />
          <div className="flex gap-4">
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-9 w-40" />
          </div>
        </div>

        {/* Dishes skeleton grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <DishSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
