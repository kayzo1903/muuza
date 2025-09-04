import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function AccountSettingSkeleton() {
  return (
    <div className="p-6 space-y-8 pt-24 lg:pt-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <header>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-80" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture Skeleton */}
        <Card className="lg:col-span-1 shadow-md">
          <CardContent className="pt-6 text-center">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <Skeleton className="w-28 h-28 rounded-full" />
            </div>
            <Skeleton className="h-4 w-32 mx-auto mt-2" />
          </CardContent>
        </Card>

        {/* Profile Form Skeleton */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Full Name */}
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>

            <Separator />

            {/* Phone */}
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>

            <Separator />

            {/* Address */}
            <div>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>

            <Skeleton className="h-10 w-full mt-4" />
          </CardContent>
        </Card>
      </div>

      {/* Password Section */}
      <Card className="shadow-md">
        <CardHeader>
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-40" />
        </CardContent>
      </Card>

      <Separator />

      {/* Logout Button */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
