import { Skeleton } from "@/components/ui/skeleton";

export default function GetStoreLoading() {
  return (
    <main className="flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6 text-center">
        <Skeleton className="h-10 w-2/3 mx-auto mb-4" />
        <Skeleton className="h-5 w-1/2 mx-auto mb-6" />
        <Skeleton className="h-12 w-40 mx-auto" />
      </section>

      {/* Benefits Section Skeleton */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <Skeleton className="h-8 w-1/3 mx-auto mb-12" />
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow"
            >
              <Skeleton className="h-10 w-10 mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section Skeleton */}
      <section className="py-16 px-6">
        <Skeleton className="h-8 w-1/3 mx-auto mb-12" />
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow text-center"
            >
              <Skeleton className="h-10 w-10 mx-auto mb-4 rounded-full" />
              <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
              <Skeleton className="h-4 w-full mx-auto mb-2" />
              <Skeleton className="h-4 w-2/3 mx-auto" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Skeleton */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6 text-center">
        <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-4 w-2/3 mx-auto mb-6" />
        <Skeleton className="h-12 w-40 mx-auto" />
      </section>
    </main>
  );
}
