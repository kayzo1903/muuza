import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ChefProfileLoading() {
  return (
    <div className="max-w-6xl mx-auto pb-16 md:pb-0">
      {/* Cover Photo Skeleton */}
      <div className="relative h-64 md:h-80 w-full">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* Profile Header Skeleton */}
      <div className="px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6 -mt-12">
          {/* Avatar Skeleton */}
          <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white dark:border-gray-900" />
          
          <div className="flex-1 space-y-4 pt-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
            
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-9 w-28 rounded-md" />
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </div>
        </div>

        {/* Bio Skeleton */}
        <div className="mt-6 space-y-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Key Details Bar Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 py-4 border-t">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-wrap gap-3 mt-4">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <Tabs defaultValue="menu" className="w-full mt-6">
        <TabsList className="w-full px-4">
          <TabsTrigger value="menu" disabled>
            Menu
          </TabsTrigger>
          <TabsTrigger value="reviews" disabled>
            Reviews
          </TabsTrigger>
        </TabsList>

        {/* Menu Tab Content Skeleton */}
        <TabsContent value="menu" className="px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4 border rounded-lg p-4">
                <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-9 w-20 rounded-md" />
                    <Skeleton className="h-9 w-20 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab Content Skeleton */}
        <TabsContent value="reviews" className="px-4 py-6">
          <div className="space-y-6">
            {/* Add Review Form Skeleton */}
            <div className="border rounded-lg p-4 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-6 rounded-sm" />
                ))}
              </div>
              <Skeleton className="h-20 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Existing Reviews Skeleton */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4 rounded-sm" />
                  ))}
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Mobile CTA Bar Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t p-3 flex justify-between md:hidden">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 flex-1 rounded-md ml-3" />
      </div>

      {/* Desktop Cart Button Skeleton */}
      <div className="fixed bottom-8 right-8 hidden md:block">
        <Skeleton className="h-12 w-32 rounded-full" />
      </div>
    </div>
  );
}