"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Star, Heart, MessageCircle, Clock, SlidersHorizontal, MapPin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import DistanceFilter from "../distance-filter";
import Link from "next/link";

// Mock function to calculate distance
const calculateDistance = (index: number) => {
  const distances = [0.5, 1.8, 2.3, 0.9, 3.2, 1.5, 0.7, 2.8, 1.2, 0.4, 4.5, 5.2, 6.1, 3.8, 7.3];
  return distances[index % distances.length];
};

// Combine all dishes from your components
const allDishes = [
  // Popular Dishes
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
    deliveryTime: "20-30 min",
    type: "popular",
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
    deliveryTime: "25-35 min",
    type: "popular",
  },
  // Today's Specials
  {
    id: 101,
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
    type: "special",
  },
  {
    id: 102,
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
    type: "special",
  },
  // Trending Dishes
  {
    id: 201,
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
    type: "trending",
  },
  {
    id: 202,
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
    type: "trending",
  },
  // Add more dishes as needed...
  {
    id: 203,
    name: "Samaki wa Kupaka",
    category: "Seafood",
    image: "/foods/samaki.jpg",
    likes: 190,
    comments: 28,
    price: "TZS 8,500",
    restaurant: "Coastal Delights",
    rating: 4.9,
    description: "Grilled fish in coconut sauce, a coastal specialty",
    deliveryTime: "30-40 min",
    type: "trending",
  },
  {
    id: 204,
    name: "Wali wa Nazi",
    category: "Rice Dish",
    image: "/foods/pilau.jpg",
    likes: 150,
    comments: 20,
    price: "TZS 4,000",
    restaurant: "Swahili Kitchen",
    rating: 4.4,
    description: "Coconut rice with traditional spices",
    deliveryTime: "25-35 min",
    type: "popular",
  },
];

export default function AllDishesPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distanceFilter, setDistanceFilter] = useState(5);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const mockLocation = { lat: -6.7924, lng: 39.2083 };
    setUserLocation(mockLocation);
  }, []);
  console.log(userLocation);
  
  // Calculate distances for all dishes
  const dishesWithDistance = allDishes.map((dish, i) => ({
    ...dish,
    distance: calculateDistance(i),
  }));

  // Filter for nearby dishes
  const nearbyDishes = dishesWithDistance
    .filter((dish) => dish.distance <= distanceFilter)
    .sort((a, b) => a.distance - b.distance);

  // Filter for discover dishes (outside filter range or highly rated)
  const discoverDishes = dishesWithDistance
    .filter((dish) => dish.distance > distanceFilter || dish.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);

  const handleDistanceChange = (distance: number) => {
    setDistanceFilter(distance);
  };

  return (
    <section className="w-full p-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">All Dishes</h1>
          <p className="text-sm dark:text-gray-300 text-gray-600">
            Discover all available dishes from restaurants near you
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
            
            {showFilters && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Sort by Distance</SelectItem>
                    <SelectItem value="rating">Sort by Rating</SelectItem>
                    <SelectItem value="price">Sort by Price</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="East African">East African</SelectItem>
                    <SelectItem value="Grilled Meat">Grilled Meat</SelectItem>
                    <SelectItem value="Snack">Snack</SelectItem>
                    <SelectItem value="Street Food">Street Food</SelectItem>
                    <SelectItem value="Seafood">Seafood</SelectItem>
                    <SelectItem value="Rice Dish">Rice Dish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <DistanceFilter 
            onDistanceChange={handleDistanceChange} 
            defaultDistance={5}
            min={1}
            max={15}
          />
        </div>

        {/* Nearby Section - Horizontal Scroll */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              Nearby Dishes ({nearbyDishes.length})
            </h2>
          </div>

          {/* Horizontal scroll container for all screen sizes */}
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {nearbyDishes.length === 0 ? (
              <div className="w-full text-center py-8 text-gray-500">
                No dishes found within {distanceFilter}km. Try increasing your distance.
              </div>
            ) : (
              nearbyDishes.map((dish) => {
                const rating = dish.rating < 2 ? 2.0 : dish.rating;
                
                return (
                  <Link href={`/shop/dishes/${dish.id}`} key={dish.id}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="min-w-[280px] md:min-w-[300px] lg:min-w-[320px] flex-shrink-0"
                    >
                      <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
                        {/* Background image */}
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

                        {/* Distance badge */}
                        <span className="absolute top-3 left-3 bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
                          {dish.distance} km
                        </span>

                        {/* Special badge if applicable */}
                        {dish.type === "special" && (
                          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                            {dish.discount}
                          </span>
                        )}

                        {/* Rating badge */}
                        <div className="absolute top-12 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                          <span>{rating.toFixed(1)}</span>
                        </div>

                        {/* Info overlay */}
                        <div className="absolute bottom-0 p-4 text-white w-full">
                          <h3 className="text-lg font-semibold">{dish.name}</h3>
                          <p className="text-sm text-gray-200">{dish.restaurant}</p>
                          <div className="flex items-center gap-2 text-xs opacity-90 mb-1 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{dish.deliveryTime}</span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {dish.rating}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-green-400 mb-2">
                            {dish.price}
                          </p>
                          <p className="text-xs text-gray-200 line-clamp-2 mb-3">
                            {dish.description}
                          </p>

                          {/* Buttons */}
                          <div className="flex items-center justify-between">
                            <div className="flex gap-3">
                              <button className="flex items-center gap-1 text-sm hover:text-red-400">
                                <Heart className="w-4 h-4" /> {dish.likes}
                              </button>
                              <button className="flex items-center gap-1 text-sm hover:text-blue-400">
                                <MessageCircle className="w-4 h-4" /> {dish.comments}
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
                );
              })
            )}
          </div>
        </div>

        {/* Discover Section - Grid Layout */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Discover More Dishes</h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {discoverDishes.map((dish) => {
              const rating = dish.rating < 2 ? 2.0 : dish.rating;
              
              return (
                <motion.div
                  key={dish.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/shop/dishes/${dish.id}`}>
                    <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
                      {/* Background image */}
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

                      {/* Distance badge */}
                      <span className="absolute top-3 left-3 bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
                        {dish.distance} km
                      </span>

                      {/* Special badge if applicable */}
                      {dish.type === "special" && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                          {dish.discount}
                        </span>
                      )}

                      {/* Rating badge */}
                      <div className="absolute top-12 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                        <span>{rating.toFixed(1)}</span>
                      </div>

                      {/* Info overlay */}
                      <div className="absolute bottom-0 p-4 text-white w-full">
                        <h3 className="text-lg font-semibold">{dish.name}</h3>
                        <p className="text-sm text-gray-200">{dish.restaurant}</p>
                        <div className="flex items-center gap-2 text-xs opacity-90 mb-1 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{dish.deliveryTime}</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {dish.rating}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-green-400 mb-2">
                          {dish.price}
                        </p>
                        <p className="text-xs text-gray-200 line-clamp-2 mb-3">
                          {dish.description}
                        </p>

                        {/* Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3">
                            <button className="flex items-center gap-1 text-sm hover:text-red-400">
                              <Heart className="w-4 h-4" /> {dish.likes}
                            </button>
                            <button className="flex items-center gap-1 text-sm hover:text-blue-400">
                              <MessageCircle className="w-4 h-4" /> {dish.comments}
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
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}