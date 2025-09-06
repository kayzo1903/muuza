import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Breadcrumb Skeleton */}
      <div className="flex mb-6">
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Tabs Skeleton */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-9 w-24 rounded-full"
          />
        ))}
      </div>

      {/* Orders Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-5 rounded-2xl overflow-hidden shadow-md border border-gray-200">
            {/* Order Header Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="space-y-1 text-right">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            {/* Progress Bar Skeleton */}
            <div className="mb-5">
              <div className="flex justify-between text-sm mb-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="w-full h-2 rounded-full" />
            </div>

            {/* Order Items Skeleton */}
            <div className="mb-5 space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center py-2">
                  <Skeleton className="w-16 h-16 rounded-lg mr-4" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              ))}
            </div>

            {/* Order Actions Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-9 w-20 rounded-lg"
                  />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}