"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Dummy data for chapati items from different restaurants
const chapatiItems = [
  {
    id: 1,
    name: "Traditional Chapati",
    image: "/foods/chapati.jpg",
    price: "TZS 2,000",
    rating: 4.5,
    likes: 124,
    reviews: 23,
    description: "Soft, flaky traditional chapati made with love",
    restaurant: {
      id: 1,
      name: "Zanzibar Flavor",
      distance: 1.2, // km
      deliveryTime: "20-30 min",
      rating: 4.8
    },
    tags: ["Traditional", "Vegetarian"],
    featured: true
  },
  {
    id: 2,
    name: "Coconut Chapati",
    image: "/foods/chapati.jpg",
    price: "TZS 2,500",
    rating: 4.8,
    likes: 256,
    reviews: 45,
    description: "Chapati with coconut flavor, a coastal specialty",
    restaurant: {
      id: 2,
      name: "Jahazi Grill",
      distance: 0.3, // km (300m)
      deliveryTime: "15-25 min",
      rating: 4.6
    },
    tags: ["Coconut", "Special"],
    featured: true
  },
  {
    id: 3,
    name: "Spicy Chapati",
    image: "/foods/chapati.jpg",
    price: "TZS 1,800",
    rating: 4.3,
    likes: 89,
    reviews: 12,
    description: "Chapati with a hint of spice for extra flavor",
    restaurant: {
      id: 3,
      name: "Mama Asha's Kitchen",
      distance: 2.1, // km
      deliveryTime: "25-35 min",
      rating: 4.3
    },
    tags: ["Spicy", "Homemade"],
    featured: false
  },
  {
    id: 4,
    name: "Butter Chapati",
    image: "/foods/chapati.jpg",
    price: "TZS 2,200",
    rating: 4.6,
    likes: 167,
    reviews: 34,
    description: "Rich buttery chapati, extra soft and delicious",
    restaurant: {
      id: 4,
      name: "Coastal Delights",
      distance: 3.5, // km
      deliveryTime: "30-40 min",
      rating: 4.5
    },
    tags: ["Buttery", "Premium"],
    featured: false
  },
  {
    id: 5,
    name: "Whole Wheat Chapati",
    image: "/foods/chapati.jpg",
    price: "TZS 2,800",
    rating: 4.7,
    likes: 203,
    reviews: 56,
    description: "Healthy whole wheat chapati option",
    restaurant: {
      id: 5,
      name: "Healthy Bites",
      distance: 4.2, // km
      deliveryTime: "35-45 min",
      rating: 4.7
    },
    tags: ["Healthy", "Whole Wheat"],
    featured: false
  },
  {
    id: 6,
    name: "Street Style Chapati",
    image: "/foods/chapati.jpg",
    price: "TZS 1,500",
    rating: 4.2,
    likes: 76,
    reviews: 8,
    description: "Authentic street-style chapati, quick and affordable",
    restaurant: {
      id: 6,
      name: "Street Food Hub",
      distance: 5.1, // km
      deliveryTime: "40-50 min",
      rating: 4.0
    },
    tags: ["Street Food", "Affordable"],
    featured: false
  }
];

export default function FoodsStore({ params }: { params: { id: string } }) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const foodcategory = params.id;
  const nearbyRef = useRef<HTMLDivElement>(null);
  console.log(userLocation);
  

  // Filter items - nearby (within 3km) and discover (beyond 3km or popular)
  const nearbyItems = chapatiItems
    .filter(item => item.restaurant.distance <= 3)
    .sort((a, b) => a.restaurant.distance - b.restaurant.distance);

  const discoverItems = chapatiItems
    .filter(item => item.restaurant.distance > 3 || item.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);

  useEffect(() => {
    // Simulate getting user location and data loading
    const timer = setTimeout(() => {
      setUserLocation({ lat: -6.7924, lng: 39.2083 }); // Dar es Salaam coordinates
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll for nearby section
  useEffect(() => {
    if (nearbyRef.current) {
      const scrollContainer = nearbyRef.current;
      let scrollAmount = 0;
      
      const scrollInterval = setInterval(() => {
        if (scrollContainer) {
          scrollAmount += 1;
          scrollContainer.scrollLeft = scrollAmount;
          
          if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollAmount = 0;
          }
        }
      }, 30);

      return () => clearInterval(scrollInterval);
    }
  }, []);

  return (
    <section className="w-full p-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold capitalize mb-2">
            {foodcategory.replace(/-/g, ' ')}
          </h1>
          <p className="text-gray-600">
            Discover the best {foodcategory.replace(/-/g, ' ')} from restaurants near you
          </p>
        </div>

        {/* Nearby Section - Horizontal Scroll */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              Nearby ({nearbyItems.length})
            </h2>
          </div>

          <motion.div 
            ref={nearbyRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {nearbyItems.map((item) => (
              <motion.div 
                key={item.id} 
                className="min-w-[320px] flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-96 overflow-hidden group border-0 shadow-lg relative">
                  {/* Food Image - Full Cover */}
                  <div className="relative h-full w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/foods/default.jpg';
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      {/* Restaurant Info */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                            {item.restaurant.name}
                          </span>
                          <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-0">
                            {item.restaurant.distance} km away
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs opacity-90">
                          <Clock className="w-3 h-3" />
                          <span>{item.restaurant.deliveryTime}</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {item.restaurant.rating}
                          </span>
                        </div>
                      </div>

                      {/* Food Info */}
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <Link 
                            href={`/shop/dishes/${item.id}`}
                            className="font-semibold text-lg line-clamp-1 hover:text-blue-300 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <span className="font-bold text-green-300">{item.price}</span>
                        </div>
                        <p className="text-sm opacity-90 line-clamp-2">{item.description}</p>
                      </div>

                      {/* Engagement Stats & Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm opacity-90">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-300" />
                            {item.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4 text-blue-300" />
                            {item.reviews}
                          </span>
                        </div>
                        
                        <Link href={`/shop/dishes/${item.id}`}>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Order Now
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Like Button */}
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Discover Section - Grid Layout */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Discover</h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {discoverItems.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden group border-0 shadow-lg relative h-96">
                  {/* Food Image - Full Cover */}
                  <div className="relative h-full w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/foods/default.jpg';
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      {/* Restaurant Info */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                            {item.restaurant.name}
                          </span>
                          <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-0">
                            {item.restaurant.distance} km
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs opacity-90">
                          <Clock className="w-3 h-3" />
                          <span>{item.restaurant.deliveryTime}</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {item.restaurant.rating}
                          </span>
                        </div>
                      </div>

                      {/* Food Info */}
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <Link 
                            href={`/shop/dishes/${item.id}`}
                            className="font-semibold text-lg line-clamp-1 hover:text-blue-300 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <span className="font-bold text-green-300">{item.price}</span>
                        </div>
                        <p className="text-sm opacity-90 line-clamp-2">{item.description}</p>
                      </div>

                      {/* Engagement Stats & Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm opacity-90">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-300" />
                            {item.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4 text-blue-300" />
                            {item.reviews}
                          </span>
                        </div>
                        
                        <Link href={`/shop/dishes/${item.id}`}>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Order Now
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Like Button */}
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}