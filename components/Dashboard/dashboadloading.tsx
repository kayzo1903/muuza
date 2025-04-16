import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-8">
      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-4 space-y-4">
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-3/4 h-6" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily/Weekly/Monthly Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-4 space-y-4">
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-3/4 h-6" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 space-y-4">
            <Skeleton className="w-1/3 h-5" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
