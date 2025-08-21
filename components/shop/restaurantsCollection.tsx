"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, CheckCircle, MapPin, Heart, MessageCircle, Clock } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import DistanceFilter from "../distance-filter"; // Adjust the import path as necessary


// Mock function to calculate distance
const calculateDistance = (businessIndex: number) => {
  const distances = [0.5, 1.8, 2.3, 0.9, 3.2, 1.5, 0.7, 2.8, 1.2, 0.4, 4.5, 5.2, 6.1, 3.8, 7.3];
  return distances[businessIndex % distances.length];
};

const businesses = [
  // Your existing businesses array (extended with more items for discover section)
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
  // Additional restaurants for discover section
  {
    id: 11,
    name: "Pizza Palace",
    category: "Italian",
    image: "/images/restaurant3.jpg",
    rating: 4.6,
    verified: true,
    likes: 287,
    reviews: 56,
    description: "Authentic Italian pizzas and pastas",
    deliveryTime: "25-35 min",
  },
  {
    id: 12,
    name: "Burger Hub",
    category: "Fast Food",
    image: "/images/restaurant4.jpg",
    rating: 4.3,
    verified: true,
    likes: 198,
    reviews: 42,
    description: "Gourmet burgers and crispy fries",
    deliveryTime: "15-25 min",
  },
  {
    id: 13,
    name: "Sushi Express",
    category: "Japanese",
    image: "/images/restaurant5.jpg",
    rating: 4.9,
    verified: true,
    likes: 412,
    reviews: 94,
    description: "Fresh sushi and Japanese delicacies",
    deliveryTime: "30-45 min",
  },
  {
    id: 14,
    name: "Green Garden",
    category: "Vegetarian",
    image: "/images/restaurant6.jpg",
    rating: 4.4,
    verified: true,
    likes: 176,
    reviews: 38,
    description: "Healthy vegetarian and vegan options",
    deliveryTime: "20-30 min",
  },
  {
    id: 15,
    name: "Steak House",
    category: "American",
    image: "/images/restaurant7.jpg",
    rating: 4.7,
    verified: true,
    likes: 324,
    reviews: 72,
    description: "Premium steaks and grilled specialties",
    deliveryTime: "25-40 min",
  },
];

export default function RestaurantsCollection() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distanceFilter, setDistanceFilter] = useState(3);

  useEffect(() => {
    // Mock geolocation
    const mockLocation = { lat: -6.7924, lng: 39.2083 };
    setUserLocation(mockLocation);
  }, []);

  console.log(userLocation);
  

  // Calculate distances for all businesses
  const businessesWithDistance = businesses.map((biz, i) => ({
    ...biz,
    distance: calculateDistance(i),
  }));

  // Filter nearby businesses (within distance filter)
  const nearbyBusinesses = businessesWithDistance
    .filter((biz) => biz.distance <= distanceFilter)
    .sort((a, b) => a.distance - b.distance);

  // Discover businesses (beyond distance filter or highly rated)
  const discoverBusinesses = businessesWithDistance
    .filter((biz) => biz.distance > distanceFilter || biz.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);

  const handleDistanceChange = (distance: number) => {
    setDistanceFilter(distance);
  };

  return (
    <section className="w-full p-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Restaurants & Businesses</h1>
          <p className="text-sm dark:text-gray-300 text-gray-600">
            Discover the best restaurants and businesses near you
          </p>
        </div>

        {/* Nearby Section - Horizontal Scroll */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              Nearby ({nearbyBusinesses.length})
            </h2>
            
            {/* Distance filter component */}
            <DistanceFilter 
              onDistanceChange={handleDistanceChange} 
              defaultDistance={3}
              min={1}
              max={10}
            />
          </div>

          {/* Horizontal scroll container */}
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {nearbyBusinesses.length === 0 ? (
              <div className="w-full text-center py-8 text-gray-500">
                No restaurants found within {distanceFilter}km. Try increasing your distance.
              </div>
            ) : (
              nearbyBusinesses.map((biz) => {
                const rating = biz.rating < 2 ? 2.0 : biz.rating;
                
                return (
                  <Link href={`/shop/restaurant/${biz.id}`} key={biz.id}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="min-w-[280px] md:min-w-[300px] lg:min-w-[320px] flex-shrink-0"
                    >
                      <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
                        {/* Background image */}
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

                        {/* Distance badge */}
                        <span className="absolute top-3 left-3 bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
                          {biz.distance} km
                        </span>

                        {/* Rating badge */}
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
                            <Clock className="w-3 h-3" />
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
              })
            )}
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
            {discoverBusinesses.map((biz) => {
              const rating = biz.rating < 2 ? 2.0 : biz.rating;
              
              return (
                <motion.div
                  key={biz.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/shop/restaurant/${biz.id}`}>
                    <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
                      {/* Background image */}
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

                      {/* Distance badge */}
                      <span className="absolute top-3 left-3 bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
                        {biz.distance} km
                      </span>

                      {/* Rating badge */}
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
                          <Clock className="w-3 h-3" />
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
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}