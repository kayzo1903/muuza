"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const specials = [
  { name: "Pilau + Soda", category: "East African", price: "TZS 6,000", image: "/foods/pilau.jpg" },
  { name: "Nyama Choma Friday", category: "Grilled Meat", price: "TZS 12,000", image: "/foods/nyama.jpg" },
  { name: "Chips Mayai", category: "Street Food", price: "TZS 4,500", image: "/foods/chips.jpg" },
  { name: "Pizza Deal (Buy 1 Get 1)", category: "Fast Food", price: "TZS 18,000", image: "/foods/pizza.jpg" },
];

export default function TodaysSpecial() {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Today’s Special</h2>
        <Link href="/specials">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
        {specials.map((dish, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="min-w-[250px] sm:min-w-0 flex-shrink-0"
          >
            <Card className="rounded-2xl shadow-md border border-yellow-200">
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    Special
                  </span>
                </div>
                {/* Info */}
                <div className="p-3 flex flex-col items-start">
                  <h3 className="text-lg font-semibold">{dish.name}</h3>
                  <p className="text-sm text-gray-500">{dish.category}</p>
                  <p className="text-sm font-bold text-green-600">{dish.price}</p>
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
