"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const trendingDishes = [
  { name: "Mandazi", category: "Snack", image: "/foods/mandazi.jpg" },
  { name: "Chips Mayai", category: "Street Food", image: "/foods/chips.jpg" },
  { name: "Pilau", category: "East African", image: "/foods/pilau.jpg" },
  { name: "Nyama Choma", category: "Grilled", image: "/foods/nyama.jpg" },
];

export default function TrendingNow() {
  return (
    <div className="w-full p-4">
      {/* Header with button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Trending Now 🔥</h2>
        <Link href="/trending">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {/* Scrollable container on small screens */}
      <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
        {trendingDishes.map((dish, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="min-w-[250px] sm:min-w-0 flex-shrink-0"
          >
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-0">
                {/* Image */}
                <div className="h-40 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Info */}
                <div className="p-3 flex flex-col items-start">
                  <h3 className="text-lg font-semibold">{dish.name}</h3>
                  <p className="text-sm text-gray-500">
                    {dish.category} · Trending this week
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
