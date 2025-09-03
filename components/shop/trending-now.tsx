"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, MessageCircle, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Mock function to calculate distance - in a real app, you'd use actual location data
const calculateDistance = (dishIndex : number) => {
  const distances = [0.8, 1.2, 0.5, 2.1];
  return distances[dishIndex % distances.length];
};

const trendingDishes = [
  {
    id: 1,
    name: "Mandazi",
    category: "Snack",
    image: "/foods/mandazi.jpg",
    likes: 180,
    comments: 24,
    price: "TZS 1,500",
    restaurant: "Mama Asha's Kitchen",
    rating: 4.6,
    description: "Soft, sweet fried dough perfect with tea or coffee",
    deliveryTime: "15-25 min",
  },
  {
    id: 2,
    name: "Chips Mayai",
    category: "Street Food",
    image: "/foods/chips.jpg",
    likes: 220,
    comments: 35,
    price: "TZS 4,500",
    restaurant: "Street Food Hub",
    rating: 4.3,
    description: "French fries omelette, a Tanzanian street food favorite",
    deliveryTime: "20-30 min",
  },
  {
    id: 3,
    name: "Pilau",
    category: "East African",
    image: "/foods/pilau.jpg",
    likes: 310,
    comments: 42,
    price: "TZS 5,500",
    restaurant: "Zanzibar Spice House",
    rating: 4.8,
    description: "Fragrant spiced rice with tender meat and vegetables",
    deliveryTime: "25-35 min",
  },
  {
    id: 4,
    name: "Nyama Choma",
    category: "Grilled",
    image: "/foods/nyama.jpg",
    likes: 390,
    comments: 56,
    price: "TZS 12,000",
    restaurant: "Grill Masters",
    rating: 4.7,
    description: "Succulent grilled meat with traditional side dishes",
    deliveryTime: "30-40 min",
  },
];

export default function TrendingNow() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // In a real app, you would get the user's actual location here
  useEffect(() => {
    // Mock geolocation - replace with actual geolocation API
    const mockLocation = { lat: -6.7924, lng: 39.2083 }; // Dar es Salaam coordinates
    setUserLocation(mockLocation);
  }, []);
  console.log(userLocation);
  

  return (
    <div className="w-full p-4">
      {/* Header with button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-md lg:text-xl font-bold flex items-center gap-2">
          Trending Now Near You 🔥
          <MapPin className="w-5 h-5 text-red-500" />
        </h2>
        <Link href="/shop/dishes">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {/* Scrollable container on small screens */}
      <div className="flex overflow-x-auto pb-4 gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible sm:gap-6 sm:pb-0">
        {trendingDishes.map((dish, i) => {
          const distance = calculateDistance(i);
          return (
            <Link href={`/shop/dishes/${dish.id}`} key={dish.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="min-w-[280px] md:min-w-[300px] lg:min-w-[320px] sm:min-w-0 flex-shrink-0"
              >
                <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-red-400">
                  {/* Background image using Next.js Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/foods/default.jpg";
                      }}
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Distance badge (top-left) */}
                  <span className="absolute top-3 left-3 bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    {distance} km
                  </span>

                  {/* Trending badge (top-right) */}
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    🔥 Trending
                  </span>

                  {/* Rating badge (below trending badge) */}
                  <div className="absolute top-12 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                    <span>{dish.rating}</span>
                  </div>

                  {/* Engagement metrics (top-left below distance) */}
                  <div className="absolute top-12 left-3 flex items-center gap-3 bg-black/70 px-2 py-1 rounded-full text-white text-xs backdrop-blur-sm">
                    <div className="flex items-center gap-1 hover:text-red-400 transition-colors">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                      <span>{dish.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      <span>{dish.comments}</span>
                    </div>
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 p-4 text-white w-full">
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold">{dish.name}</h3>
                      <p className="text-sm text-gray-200 line-clamp-1">{dish.restaurant}</p>
                      <p className="text-xs text-gray-300">{dish.category}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs opacity-90 mb-1">
                      <span>{dish.deliveryTime}</span>
                    </div>
                    
                    <p className="text-sm font-bold text-green-400 mb-2">
                      {dish.price}
                    </p>
                    
                    <p className="text-xs text-gray-200 line-clamp-2 mb-3">
                      {dish.description}
                    </p>

                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full bg-white/90 text-black hover:bg-white text-xs sm:text-sm"
                    >
                      Order Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}