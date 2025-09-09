// components/Dashboard/dashboard-skeleton.tsx
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-8 w-full animate-pulse">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="pt-6 flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Area Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders Skeleton */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-16 ml-auto"></div>
                      <div className="h-3 bg-gray-100 rounded w-12 ml-auto"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview Skeleton */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refresh Button Skeleton */}
      <div className="text-center">
        <div className="h-10 bg-gray-200 rounded-md w-32 mx-auto"></div>
      </div>
    </div>
  );
}