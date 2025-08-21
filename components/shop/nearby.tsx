"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, CheckCircle, MapPin, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Mock function to calculate distance - in a real app, you'd use actual location data
const calculateDistance = (businessIndex : number) => {
  const distances = [0.5, 1.8, 2.3, 0.9, 3.2, 1.5, 0.7, 2.8, 1.2, 0.4];
  return distances[businessIndex % distances.length];
};

const businesses = [
  {
    id: 1,
    name: "Mama Ntilie",
    category: "Local Food",
    image: "/images/restaurant1.jpg",
    rating: 4.2,
    verified: true,
    likes: 124,
    reviews: 23,
    description: "Authentic local dishes with homemade flavors",
    deliveryTime: "20-30 min",
  },
  {
    id: 2,
    name: "Kilimanjaro Restaurant",
    category: "Restaurant",
    image: "/images/restaurant2.jpg",
    rating: 3.8,
    verified: true,
    likes: 89,
    reviews: 15,
    description: "Fine dining with a view of the city",
    deliveryTime: "25-35 min",
  },
  {
    id: 3,
    name: "Taste of Coast",
    category: "Swahili Dishes",
    image: "/images/restaurant3.jpg",
    rating: 2.0,
    verified: false,
    likes: 45,
    reviews: 8,
    description: "Coastal flavors and seafood specialties",
    deliveryTime: "30-40 min",
  },
  {
    id: 4,
    name: "Samaki Grill",
    category: "Seafood",
    image: "/images/restaurant4.jpg",
    rating: 4.5,
    verified: true,
    likes: 210,
    reviews: 42,
    description: "Fresh seafood grilled to perfection",
    deliveryTime: "15-25 min",
  },
  {
    id: 5,
    name: "Chips Duka",
    category: "Fast Food",
    image: "/images/restaurant5.jpg",
    rating: 2.3,
    verified: false,
    likes: 67,
    reviews: 12,
    description: "Quick bites and local fast food favorites",
    deliveryTime: "10-20 min",
  },
  {
    id: 6,
    name: "Nyama Choma Base",
    category: "Barbecue",
    image: "/images/restaurant6.jpg",
    rating: 3.1,
    verified: true,
    likes: 156,
    reviews: 31,
    description: "Best grilled meat in town with traditional sides",
    deliveryTime: "25-40 min",
  },
  {
    id: 7,
    name: "Urban Cafe",
    category: "Coffee Shop",
    image: "/images/restaurant7.jpg",
    rating: 4.7,
    verified: true,
    likes: 298,
    reviews: 67,
    description: "Artisan coffee and light meals in a modern setting",
    deliveryTime: "15-25 min",
  },
  {
    id: 8,
    name: "Zanzibar Bites",
    category: "Swahili Snacks",
    image: "/images/restaurant8.jpg",
    rating: 2.5,
    verified: false,
    likes: 78,
    reviews: 14,
    description: "Authentic Zanzibari street food and snacks",
    deliveryTime: "20-30 min",
  },
  {
    id: 9,
    name: "Fresh Juice Hub",
    category: "Drinks",
    image: "/images/restaurant2.jpg",
    rating: 3.9,
    verified: true,
    likes: 132,
    reviews: 28,
    description: "Fresh juices, smoothies and healthy drinks",
    deliveryTime: "10-15 min",
  },
  {
    id: 10,
    name: "Golden Biryani",
    category: "Indian/East African",
    image: "/images/restaurant1.jpg",
    rating: 4.8,
    verified: true,
    likes: 345,
    reviews: 89,
    description: "Fusion of Indian and East African flavors",
    deliveryTime: "30-45 min",
  },
];

export default function NearbyBusinesses() {
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Nearby Businesses 🏪
          <MapPin className="w-5 h-5 text-red-500" />
        </h2>
        <Link href="/shop/restaurant">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {/* Scrollable container on small screens */}
      <div className="flex overflow-x-auto pb-4 gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible sm:gap-6 sm:pb-0">
        {businesses.map((biz, i) => {
          const distance = calculateDistance(i);
          const rating = biz.rating < 2 ? 2.0 : biz.rating; // enforce min 2.0
          
          return (
            <Link href={`/shop/restaurant/${biz.id}`} key={biz.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="min-w-[280px] md:min-w-[300px] lg:min-w-[320px] sm:min-w-0 flex-shrink-0"
              >
                <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
                  {/* Background image using Next.js Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={biz.image}
                      alt={biz.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/default-restaurant.jpg";
                      }}
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Distance badge (top-left) */}
                  <span className="absolute top-3 left-3 bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    {distance} km
                  </span>

                  {/* Rating badge (top-right) */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                    <span>{rating.toFixed(1)}</span>
                  </div>

                  {/* Verification badge */}
                  {biz.verified && (
                    <div className="absolute top-12 right-3 flex items-center gap-1 bg-green-800 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-300" />
                      <span>Verified</span>
                    </div>
                  )}

                  {/* Engagement metrics */}
                  <div className="absolute top-12 left-3 flex items-center gap-3 bg-black/70 px-2 py-1 rounded-full text-white text-xs backdrop-blur-sm">
                    <div className="flex items-center gap-1 hover:text-red-400 transition-colors">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                      <span>{biz.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      <span>{biz.reviews}</span>
                    </div>
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 p-4 text-white w-full">
                    <div className="flex items-center gap-1 mb-1">
                      <h3 className="text-lg font-semibold">{biz.name}</h3>
                      {biz.verified && (
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-200">{biz.category}</p>
                    <div className="flex items-center gap-2 text-xs opacity-90 mb-1 mt-1">
                      <span>{biz.deliveryTime}</span>
                    </div>
                    <p className="text-xs text-gray-200 line-clamp-2 mb-3">
                      {biz.description}
                    </p>

                    {/* Button */}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full bg-white/90 text-black hover:bg-white text-xs sm:text-sm"
                    >
                      View Menu
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