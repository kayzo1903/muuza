// components/profile/ProfileLoading.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-6">
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        {/* User Profile Card Skeleton */}
        <Card className="rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="h-20 bg-gray-200 dark:bg-gray-700"></div>
          <CardHeader className="flex flex-col items-center text-center pb-4 relative -mt-12">
            <Skeleton className="h-24 w-24 rounded-full mb-4" />
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
        </Card>

        {/* Main Menu Card Skeleton */}
        <Card className="rounded-2xl shadow-lg border-gray-200 dark:border-gray-700">
          <CardContent className="p-6 space-y-4">
            {[1, 2, 3, 4].map((section) => (
              <div key={section}>
                <Skeleton className="h-5 w-32 mb-3" />
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      {item === 1 && <Skeleton className="h-5 w-5 rounded-full" />}
                    </div>
                  ))}
                </div>
                {section < 4 && <Skeleton className="h-px w-full my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* App Version Skeleton */}
        <div className="text-center mt-6">
          <Skeleton className="h-3 w-24 mx-auto" />
        </div>
      </div>
    </div>
  );
}