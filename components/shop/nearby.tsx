"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const businesses = [
  { name: "Mama Ntilie", category: "Local Food", image: "/images/restaurant1.jpg" },
  { name: "Kilimanjaro Restaurant", category: "Restaurant", image: "/images/restaurant2.jpg" },
  { name: "Taste of Coast", category: "Swahili Dishes", image: "/images/restaurant3.jpg" },
  { name: "Samaki Grill", category: "Seafood", image: "/images/restaurant4.jpg" },
  { name: "Chips Duka", category: "Fast Food", image: "/images/restaurant5.jpg" },
  { name: "Nyama Choma Base", category: "Barbecue", image: "/images/restaurant6.jpg" },
  { name: "Urban Cafe", category: "Coffee Shop", image: "/images/restaurant7.jpg" },
  { name: "Zanzibar Bites", category: "Swahili Snacks", image: "/images/restaurant8.jpg" },
  { name: "Fresh Juice Hub", category: "Drinks", image: "/images/restaurant2.jpg" },
  { name: "Golden Biryani", category: "Indian/East African", image: "/images/restaurant1.jpg" },
];

export default function NearbyBusinesses() {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">Nearby Businesses</h2>

      {/* Scrollable container on small screens */}
      <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
        {businesses.map((biz, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="min-w-[250px] sm:min-w-0 flex-shrink-0"
          >
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-0">
                {/* Image */}
                <div className="h-40 w-full overflow-hidden rounded-t-2xl relative">
                  <img
                    src={biz.image}
                    alt={biz.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Info */}
                <div className="p-3 flex flex-col items-start">
                  <h3 className="text-lg font-semibold">{biz.name}</h3>
                  <p className="text-sm text-gray-500">{biz.category}</p>
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
