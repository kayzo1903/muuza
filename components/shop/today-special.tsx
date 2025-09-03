"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart, MessageCircle, MapPin, Star } from "lucide-react";
import Image from "next/image";

// Mock function to calculate distance - in a real app, you'd use actual location data
const calculateDistance = (specialIndex : number) => {
  const distances = [0.8, 1.2, 0.5, 2.1];
  return distances[specialIndex % distances.length];
};

const specials = [
  {
    id: 1,
    name: "Pilau + Soda",
    category: "East African",
    price: "TZS 6,000",
    image: "/foods/pilau.jpg",
    restaurant: "Zanzibar Spice House",
    rating: 4.8,
    likes: 42,
    comments: 8,
    description: "Fragrant spiced rice with a refreshing soda",
    deliveryTime: "20-30 min",
    originalPrice: "TZS 8,000",
    discount: "25% OFF",
  },
  {
    id: 2,
    name: "Nyama Choma Friday",
    category: "Grilled Meat",
    price: "TZS 12,000",
    image: "/foods/nyama.jpg",
    restaurant: "Grill Masters",
    rating: 4.7,
    likes: 67,
    comments: 15,
    description: "Succulent grilled meat with traditional sides",
    deliveryTime: "25-35 min",
    originalPrice: "TZS 15,000",
    discount: "20% OFF",
  },
  {
    id: 3,
    name: "Chips Mayai",
    category: "Street Food",
    price: "TZS 4,500",
    image: "/foods/chips.jpg",
    restaurant: "Street Food Hub",
    rating: 4.2,
    likes: 89,
    comments: 22,
    description: "French fries omelette, a Tanzanian favorite",
    deliveryTime: "15-25 min",
    originalPrice: "TZS 5,500",
    discount: "18% OFF",
  },
  {
    id: 4,
    name: "Pizza Deal (Buy 1 Get 1)",
    category: "Fast Food",
    price: "TZS 18,000",
    image: "/foods/pizza.jpg",
    restaurant: "Italiano Corner",
    rating: 4.4,
    likes: 124,
    comments: 35,
    description: "Two pizzas for the price of one with all toppings",
    deliveryTime: "30-40 min",
    originalPrice: "TZS 36,000",
    discount: "50% OFF",
  },
];

export default function TodaysSpecial() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [likes, setLikes] = useState(specials.map(special => special.likes));
  const [comments, setComments] = useState(specials.map(special => special.comments));

  // In a real app, you would get the user's actual location here
  useEffect(() => {
    // Mock geolocation - replace with actual geolocation API
    const mockLocation = { lat: -6.7924, lng: 39.2083 }; // Dar es Salaam coordinates
    setUserLocation(mockLocation);
  }, []);
  console.log(userLocation);
  

  const handleLike = (index: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking like
    e.stopPropagation(); // Prevent event bubbling
    const updated = [...likes];
    updated[index] += 1;
    setLikes(updated);
  };

  const handleComment = (index: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking comment
    e.stopPropagation(); // Prevent event bubbling
    const updated = [...comments];
    updated[index] += 1;
    setComments(updated);
  };

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-md lg:text-xl font-bold flex items-center gap-2">
          Today&apos;s Special Deals 🎯
          <MapPin className="w-5 h-5 text-red-500" />
        </h2>
        <Link href="/shop/dishes">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {/* Scrollable grid */}
      <div className="flex overflow-x-auto pb-4 gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible sm:gap-6 sm:pb-0">
        {specials.map((dish, i) => {
          const distance = calculateDistance(i);
          return (
            <Link href={`/shop/dishes/${dish.id}`} key={dish.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="min-w-[280px] md:min-w-[300px] lg:min-w-[320px] sm:min-w-0 flex-shrink-0"
              >
                <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
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

                  {/* Special badge (top-right) */}
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    {dish.discount}
                  </span>

                  {/* Rating badge (below special badge) */}
                  <div className="absolute top-12 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                    <span>{dish.rating}</span>
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 p-4 text-white w-full">
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold">{dish.name}</h3>
                      <p className="text-sm text-gray-200 line-clamp-1">{dish.restaurant}</p>
                      <p className="text-xs text-gray-300">{dish.category}</p>
                    </div>
                    
                    {/* Price display with discount */}
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm font-bold text-green-400">{dish.price}</p>
                      <p className="text-xs text-gray-400 line-through">{dish.originalPrice}</p>
                    </div>
                    
                    <p className="text-xs text-gray-200 line-clamp-2 mb-3">
                      {dish.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <button
                          onClick={(e) => handleLike(i, e)}
                          className="flex items-center gap-1 text-sm hover:text-red-400 transition-colors"
                        >
                          <Heart className="w-4 h-4" /> {likes[i]}
                        </button>
                        <button
                          onClick={(e) => handleComment(i, e)}
                          className="flex items-center gap-1 text-sm hover:text-blue-400 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" /> {comments[i]}
                        </button>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/90 text-black hover:bg-white text-xs sm:text-sm"
                      >
                        Order Now
                      </Button>
                    </div>
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