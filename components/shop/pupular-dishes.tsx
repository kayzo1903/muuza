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
  const distances = [0.8, 1.2, 0.5, 2.1, 3.5, 4.2, 2.9, 1.7, 0.3, 1.5];
  return distances[dishIndex % distances.length];
};

const dishes = [
  {
    id: 1,
    name: "Ugali",
    category: "East African",
    image: "/foods/ugali.jpg",
    likes: 240,
    comments: 32,
    price: "TZS 3,000",
    restaurant: "Mama Africa Kitchen",
    rating: 4.5,
    description: "Traditional maize flour dish served with sukuma wiki or meat stew",
  },
  {
    id: 2,
    name: "Pilau",
    category: "East African",
    image: "/foods/pilau.jpg",
    likes: 320,
    comments: 45,
    price: "TZS 5,500",
    restaurant: "Zanzibar Spice House",
    rating: 4.8,
    description: "Fragrant spiced rice with tender meat and vegetables",
  },
  {
    id: 3,
    name: "Nyama Choma",
    category: "East African",
    image: "/foods/nyama.jpg",
    likes: 410,
    comments: 58,
    price: "TZS 12,000",
    restaurant: "Grill Masters",
    rating: 4.7,
    description: "Succulent grilled meat with traditional side dishes",
  },
  {
    id: 4,
    name: "Chapati",
    category: "East African",
    image: "/foods/chapati.jpg",
    likes: 280,
    comments: 22,
    price: "TZS 2,000",
    restaurant: "Coastal Delights",
    rating: 4.3,
    description: "Soft, flaky flatbread perfect with curry or tea",
  },
  {
    id: 5,
    name: "Samaki Wa Kupaka",
    category: "Seafood",
    image: "/foods/samaki.jpg",
    likes: 150,
    comments: 14,
    price: "TZS 8,500",
    restaurant: "Ocean Breeze",
    rating: 4.6,
    description: "Grilled fish in rich coconut sauce with spices",
  },
  {
    id: 6,
    name: "Biriani",
    category: "East African",
    image: "/foods/biryani.jpg",
    likes: 290,
    comments: 39,
    price: "TZS 6,800",
    restaurant: "Sultan's Feast",
    rating: 4.9,
    description: "Aromatic rice dish with layers of meat and spices",
  },
  {
    id: 7,
    name: "Chips Mayai",
    category: "Fast Food",
    image: "/foods/chips.jpg",
    likes: 360,
    comments: 41,
    price: "TZS 4,500",
    restaurant: "Street Food Hub",
    rating: 4.2,
    description: "French fries omelette, a Tanzanian street food favorite",
  },
  {
    id: 8,
    name: "Pizza",
    category: "International",
    image: "/foods/pizza.jpg",
    likes: 500,
    comments: 77,
    price: "TZS 15,000",
    restaurant: "Italiano Corner",
    rating: 4.4,
    description: "Wood-fired pizza with fresh toppings and cheese",
  },
  {
    id: 9,
    name: "Burgers",
    category: "International",
    image: "/foods/burger.jpg",
    likes: 470,
    comments: 65,
    price: "TZS 7,200",
    restaurant: "Burger Junction",
    rating: 4.5,
    description: "Juicy beef patty with fresh vegetables and special sauce",
  },
  {
    id: 10,
    name: "Ice Cream",
    category: "Dessert",
    image: "/foods/icecream.jpg",
    likes: 620,
    comments: 90,
    price: "TZS 3,500",
    restaurant: "Sweet Treats",
    rating: 4.8,
    description: "Creamy homemade ice cream in various flavors",
  },
];

export default function PopularDishes() {
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
          Popular Dishes Near You 🍽️
          <MapPin className="w-5 h-5 text-red-500" />
        </h2>
        <Link href="/dishes">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {/* Scrollable container on small screens */}
      <div className="flex overflow-x-auto pb-4 gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible sm:gap-6 sm:pb-0">
        {dishes.map((dish, i) => {
          const distance = calculateDistance(i);
          return (
            <Link href={`/shop/dishes/${dish.id}`} key={dish.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="min-w-[280px] md:min-w-[300px] lg:min-w-[320px] sm:min-w-0 flex-shrink-0"
              >
                <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
                  {/* Background image with Next.js Image optimization */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
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

                  {/* Rating badge (top-right) */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                    <span>{dish.rating}</span>
                  </div>

                  {/* Engagement metrics with hover effects */}
                  <div className="absolute top-12 right-3 flex items-center gap-3 bg-black/70 px-3 py-1 rounded-full text-white text-xs backdrop-blur-sm">
                    <div className="flex items-center gap-1 hover:text-red-400 transition-colors">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                      <span>{dish.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      <span>{dish.comments}</span>
                    </div>
                  </div>

                  {/* Info overlay with enhanced typography */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="space-y-1 mb-2">
                      <h3 className="text-lg font-bold tracking-tight line-clamp-1">
                        {dish.name}
                      </h3>
                      <p className="text-sm text-gray-300 font-medium line-clamp-1">
                        {dish.restaurant}
                      </p>
                      <p className="text-xs text-gray-300">{dish.category}</p>
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
                      className="w-full bg-white/90 text-black hover:bg-white hover:shadow-md transition-all text-xs sm:text-sm"
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