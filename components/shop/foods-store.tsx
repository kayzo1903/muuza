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
      rating: 4.8,
    },
    tags: ["Traditional", "Vegetarian"],
    featured: true,
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
      rating: 4.6,
    },
    tags: ["Coconut", "Special"],
    featured: true,
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
      rating: 4.3,
    },
    tags: ["Spicy", "Homemade"],
    featured: false,
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
      rating: 4.5,
    },
    tags: ["Buttery", "Premium"],
    featured: false,
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
      rating: 4.7,
    },
    tags: ["Healthy", "Whole Wheat"],
    featured: false,
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
      rating: 4.0,
    },
    tags: ["Street Food", "Affordable"],
    featured: false,
  },
];

export default function FoodsStore({ params }: { params: { id: string } }) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const foodcategory = params.id;
  console.log(userLocation);

  // Filter items - nearby (within 3km) and discover (beyond 3km or popular)
  const nearbyItems = chapatiItems
    .filter((item) => item.restaurant.distance <= 3)
    .sort((a, b) => a.restaurant.distance - b.restaurant.distance);

  const discoverItems = chapatiItems
    .filter((item) => item.restaurant.distance > 3 || item.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);

  useEffect(() => {
    // Simulate getting user location and data loading
    const timer = setTimeout(() => {
      setUserLocation({ lat: -6.7924, lng: 39.2083 }); // Dar es Salaam coordinates
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full p-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold capitalize mb-2">
            {foodcategory.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-600">
            Discover the best {foodcategory.replace(/-/g, " ")} from restaurants
            near you
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

          {/* Horizontal scroll container for all screen sizes */}
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {nearbyItems.map((item) => (
              <Link href={`/shop/dishes/${item.id}`} key={item.id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="min-w-[280px] md:min-w-[300px] lg:min-w-[320px] flex-shrink-0" // Responsive widths
                >
                  <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
                    {/* Background image using Next.js Image */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/foods/default.jpg";
                        }}
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Restaurant distance badge */}
                    <span className="absolute top-3 left-3 bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
                      {item.restaurant.distance} km
                    </span>

                    {/* Info overlay */}
                    <div className="absolute bottom-0 p-4 text-white w-full">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-200">
                        {item.restaurant.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs opacity-90 mb-1 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.restaurant.deliveryTime}</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {item.restaurant.rating}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-green-400 mb-2">
                        {item.price}
                      </p>
                      <p className="text-xs text-gray-200 line-clamp-2 mb-3">
                        {item.description}
                      </p>

                      {/* Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                          <button className="flex items-center gap-1 text-sm hover:text-red-400">
                            <Heart className="w-4 h-4" /> {item.likes}
                          </button>
                          <button className="flex items-center gap-1 text-sm hover:text-blue-400">
                            <MessageCircle className="w-4 h-4" /> {item.reviews}
                          </button>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white/90 text-black hover:bg-white"
                        >
                          Order Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
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
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/shop/dishes/${item.id}`}>
                  <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
                    {/* Background image using Next.js Image */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/foods/default.jpg";
                        }}
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Restaurant distance badge */}
                    <span className="absolute top-3 left-3 bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
                      {item.restaurant.distance} km
                    </span>

                    {/* Info overlay */}
                    <div className="absolute bottom-0 p-4 text-white w-full">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-200">
                        {item.restaurant.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs opacity-90 mb-1 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.restaurant.deliveryTime}</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {item.restaurant.rating}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-green-400 mb-2">
                        {item.price}
                      </p>
                      <p className="text-xs text-gray-200 line-clamp-2 mb-3">
                        {item.description}
                      </p>

                      {/* Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                          <button className="flex items-center gap-1 text-sm hover:text-red-400">
                            <Heart className="w-4 h-4" /> {item.likes}
                          </button>
                          <button className="flex items-center gap-1 text-sm hover:text-blue-400">
                            <MessageCircle className="w-4 h-4" /> {item.reviews}
                          </button>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white/90 text-black hover:bg-white"
                        >
                          Order Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
