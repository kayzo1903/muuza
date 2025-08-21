// components/FoodsSkeleton.tsx

export default function FoodsSkeleton() {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="flex gap-4 overflow-hidden mb-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-80 h-96 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
