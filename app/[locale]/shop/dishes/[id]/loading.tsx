import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function DishShowLoading() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Chef Info Bar Skeleton */}
      <Card className="mb-6 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
      </Card>

      {/* Dish Card with carousel skeleton */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Image Carousel Skeleton */}
        <div className="lg:w-1/2">
          <Card className="relative rounded-2xl overflow-hidden shadow-md aspect-square">
            <Skeleton className="w-full h-full" />
            {/* Carousel controls skeleton */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-2 h-2 rounded-full bg-white/50" />
              ))}
            </div>
          </Card>
        </div>

        {/* Dish Info Skeleton */}
        <div className="lg:w-1/2 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Dietary tags skeleton */}
          <div className="flex flex-wrap gap-1">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-16" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Skeleton className="h-9 w-full sm:w-24 rounded-md" />
            <div className="flex-1 flex gap-3">
              <Skeleton className="h-9 flex-1 rounded-md" />
              <Skeleton className="h-9 flex-1 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section Skeleton */}
      <section className="mt-8">
        <Skeleton className="h-7 w-40 mb-4" />

        {/* Add comment form skeleton */}
        <Card className="p-4 mb-6">
          <Skeleton className="h-5 w-32 mb-3" />
          <div className="flex items-center mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="w-5 h-5 rounded-sm mr-1" />
            ))}
          </div>
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-10 rounded-md" />
            <Skeleton className="w-20 h-10 rounded-md" />
          </div>
        </Card>

        {/* Comments list skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile floating action buttons skeleton */}
      <div className="fixed bottom-4 right-4 z-10 flex gap-2 sm:hidden">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    </div>
  );
}