"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, CheckCircle } from "lucide-react"; // ⭐ ✅

const businesses = [
  { name: "Mama Ntilie", category: "Local Food", image: "/images/restaurant1.jpg", rating: 4.2, verified: true },
  { name: "Kilimanjaro Restaurant", category: "Restaurant", image: "/images/restaurant2.jpg", rating: 3.8, verified: true },
  { name: "Taste of Coast", category: "Swahili Dishes", image: "/images/restaurant3.jpg", rating: 2.0, verified: false },
  { name: "Samaki Grill", category: "Seafood", image: "/images/restaurant4.jpg", rating: 4.5, verified: true },
  { name: "Chips Duka", category: "Fast Food", image: "/images/restaurant5.jpg", rating: 2.3, verified: false },
  { name: "Nyama Choma Base", category: "Barbecue", image: "/images/restaurant6.jpg", rating: 3.1, verified: true },
  { name: "Urban Cafe", category: "Coffee Shop", image: "/images/restaurant7.jpg", rating: 4.7, verified: true },
  { name: "Zanzibar Bites", category: "Swahili Snacks", image: "/images/restaurant8.jpg", rating: 2.5, verified: false },
  { name: "Fresh Juice Hub", category: "Drinks", image: "/images/restaurant2.jpg", rating: 3.9, verified: true },
  { name: "Golden Biryani", category: "Indian/East African", image: "/images/restaurant1.jpg", rating: 4.8, verified: true },
];

export default function NearbyBusinesses() {
  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Nearby Businesses</h2>
        <Link href="/businesses">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>

      {/* Scrollable container on small screens */}
      <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
        {businesses.map((biz, i) => {
          const rating = biz.rating < 2 ? 2.0 : biz.rating; // enforce min 2.0
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="min-w-[250px] sm:min-w-0 flex-shrink-0"
            >
              <Card className="relative rounded-2xl shadow-md overflow-hidden h-48 lg:h-72">
                {/* Image background */}
                <img
                  src={biz.image}
                  alt={biz.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                {/* Info */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                  <div className="flex items-center gap-1">
                    <h3 className="text-lg font-semibold">{biz.name}</h3>
                    {biz.verified && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <p className="text-sm opacity-90">{biz.category}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span>{rating.toFixed(1)}</span>
                  </div>

                  <Button variant="secondary" size="sm" className="mt-2 self-start">
                    More
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
