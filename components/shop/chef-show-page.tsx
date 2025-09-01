"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Heart, MessageCircle, ChefHat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import DistanceFilter from "../distance-filter";

// Mock function to calculate distance
const calculateDistance = (chefIndex: number) => {
  const distances = [0.8, 1.2, 0.5, 2.1, 3.5, 4.2, 2.9, 1.7, 0.3];
  return distances[chefIndex % distances.length];
};

const allChefs = [
  {
    id: 1,
    name: "Mwajuma",
    specialty: "Swahili Cuisine",
    image: "/chefs/mwajuma.jpg",
    rating: 4.8,
    likes: 28,
    reviews: 12,
    experience: "15 years",
    description: "Expert in traditional Swahili dishes with a modern twist",
    deliveryTime: "20-30 min",
  },
  {
    id: 2,
    name: "Abdul",
    specialty: "Nyama Choma Expert",
    image: "/chefs/abdul.jpg",
    rating: 4.9,
    likes: 23,
    reviews: 8,
    experience: "12 years",
    description: "Master of grilled meats with secret family recipes",
    deliveryTime: "25-35 min",
  },
  {
    id: 3,
    name: "Anita",
    specialty: "Vegetarian Dishes",
    image: "/chefs/anita.jpg",
    rating: 4.7,
    likes: 34,
    reviews: 15,
    experience: "10 years",
    description: "Creates delicious plant-based meals that satisfy everyone",
    deliveryTime: "15-25 min",
  },
  {
    id: 4,
    name: "Catherine",
    specialty: "Coastal Delicacies",
    image: "/chefs/catherine.jpg",
    rating: 4.6,
    likes: 13,
    reviews: 6,
    experience: "8 years",
    description: "Brings the flavors of the coast to your plate",
    deliveryTime: "30-40 min",
  },
  {
    id: 5,
    name: "Deogratus",
    specialty: "Traditional Dishes",
    image: "/chefs/deogratus.jpg",
    rating: 4.0,
    likes: 22,
    reviews: 9,
    experience: "8 years",
    description: "Preserves authentic cooking methods and recipes",
    deliveryTime: "35-45 min",
  },
  {
    id: 6,
    name: "Fred",
    specialty: "Fusion Cuisine",
    image: "/chefs/fred.jpg",
    rating: 4.3,
    likes: 13,
    reviews: 5,
    experience: "3 years",
    description: "Innovative blends of local and international flavors",
    deliveryTime: "20-30 min",
  },
  {
    id: 7,
    name: "Kasimu",
    specialty: "Street Food",
    image: "/chefs/kasimu.jpg",
    rating: 3.9,
    likes: 34,
    reviews: 11,
    experience: "3 years",
    description: "Authentic street food experience from a master vendor",
    deliveryTime: "15-25 min",
  },
  {
    id: 8,
    name: "Mwanahawa",
    specialty: "Seafood Specialties",
    image: "/chefs/mwanahawa.jpg",
    rating: 4.9,
    likes: 7,
    reviews: 3,
    experience: "3 years",
    description: "Fresh seafood prepared with coastal techniques",
    deliveryTime: "25-35 min",
  },
  {
    id: 9,
    name: "Mwanaisha",
    specialty: "Desserts & Baking",
    image: "/chefs/mwanaisha.jpg",
    rating: 4.9,
    likes: 7,
    reviews: 4,
    experience: "3 years",
    description: "Sweet treats and baked goods that delight the senses",
    deliveryTime: "30-40 min",
  },
  {
    id: 10,
    name: "Rajab",
    specialty: "Indian Fusion",
    image: "/chefs/default-chef.jpg",
    rating: 4.5,
    likes: 18,
    reviews: 7,
    experience: "5 years",
    description: "Blends Indian spices with local ingredients",
    deliveryTime: "25-35 min",
  },
  {
    id: 11,
    name: "Neema",
    specialty: "Traditional Breakfast",
    image: "/chefs/default-chef.jpg",
    rating: 4.7,
    likes: 26,
    reviews: 10,
    experience: "7 years",
    description: "Specializes in authentic Tanzanian breakfast dishes",
    deliveryTime: "15-25 min",
  },
  {
    id: 12,
    name: "Juma",
    specialty: "BBQ Specialist",
    image: "/chefs/default-chef.jpg",
    rating: 4.8,
    likes: 32,
    reviews: 14,
    experience: "9 years",
    description: "Perfectly grilled meats with signature marinades",
    deliveryTime: "30-40 min",
  },
];

export default function ChefsFillter() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  console.log(userLocation);
  
  const [distanceFilter, setDistanceFilter] = useState(3); // Default to 3km

  // Add distances to chefs
  const chefsWithDistances = allChefs.map((chef, index) => ({
    ...chef,
    distance: calculateDistance(index),
  }));

  // Filter chefs based on selected distance
  const nearbyChefs = chefsWithDistances
    .filter((chef) => chef.distance <= distanceFilter)
    .sort((a, b) => a.distance - b.distance);

  const discoverChefs = chefsWithDistances
    .filter((chef) => chef.distance > 3 || chef.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);

  useEffect(() => {
    // Simulate getting user location
    const timer = setTimeout(() => {
      setUserLocation({ lat: -6.7924, lng: 39.2083 }); // Dar es Salaam coordinates
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDistanceChange = (distance: number) => {
    setDistanceFilter(distance);
  };

  return (
    <section className="w-full p-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Professional Chefs</h1>
          <p className="text-xs dark:text-gray-300 text-gray-600">
            Discover talented chefs near you and enjoy homemade meals
          </p>
        </div>

        {/* Nearby Section - Horizontal Scroll */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              Nearby Chefs ({nearbyChefs.length})
            </h2>
            
            {/* Distance filter component */}
            <DistanceFilter 
              onDistanceChange={handleDistanceChange} 
              defaultDistance={3}
              min={1}
              max={5}
            />
          </div>

          {/* Horizontal scroll container for all screen sizes */}
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {nearbyChefs.length === 0 ? (
              <div className="w-full text-center py-8 text-gray-500">
                No chefs found within {distanceFilter}km. Try increasing your distance.
              </div>
            ) : (
              nearbyChefs.map((chef) => (
                <Link href={`/shop/chefs/${chef.id}`} key={chef.id}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="min-w-[280px] md:min-w-[300px] lg:min-w-[320px] flex-shrink-0"
                  >
                    <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
                      {/* Background image using Next.js Image */}
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={chef.image}
                          alt={chef.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/chef/default-chef.jpg";
                          }}
                        />
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Chef distance badge */}
                      <span className="absolute top-3 left-3 bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
                        {chef.distance} km
                      </span>

                      {/* Rating badge (top-right) */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                        <span>{chef.rating}</span>
                      </div>

                      {/* Info overlay */}
                      <div className="absolute bottom-0 p-4 text-white w-full">
                        <h3 className="text-lg font-semibold">{chef.name}</h3>
                        <p className="text-sm text-gray-200">{chef.specialty}</p>
                        <div className="flex items-center gap-2 text-xs opacity-90 mb-1 mt-1">
                          <ChefHat className="w-3 h-3" />
                          <span>{chef.experience}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {chef.deliveryTime}
                          </span>
                        </div>
                        <p className="text-xs text-gray-200 line-clamp-2 mb-3">
                          {chef.description}
                        </p>

                        {/* Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3">
                            <button className="flex items-center gap-1 text-sm hover:text-red-400">
                              <Heart className="w-4 h-4" /> {chef.likes}
                            </button>
                            <button className="flex items-center gap-1 text-sm hover:text-blue-400">
                              <MessageCircle className="w-4 h-4" /> {chef.reviews}
                            </button>
                          </div>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white/90 text-black hover:bg-white text-xs sm:text-sm"
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Discover Section - Grid Layout */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Top Rated Chefs</h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {discoverChefs.map((chef) => (
              <motion.div
                key={chef.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/shop/chefs/${chef.id}`}>
                  <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
                    {/* Background image using Next.js Image */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={chef.image}
                        alt={chef.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/chef/default-chef.jpg";
                        }}
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Chef distance badge */}
                    <span className="absolute top-3 left-3 bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
                      {chef.distance} km
                    </span>

                    {/* Rating badge (top-right) */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                      <span>{chef.rating}</span>
                    </div>

                    {/* Info overlay */}
                    <div className="absolute bottom-0 p-4 text-white w-full">
                      <h3 className="text-lg font-semibold">{chef.name}</h3>
                      <p className="text-sm text-gray-200">{chef.specialty}</p>
                      <div className="flex items-center gap-2 text-xs opacity-90 mb-1 mt-1">
                        <ChefHat className="w-3 h-3" />
                        <span>{chef.experience}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {chef.deliveryTime}
                        </span>
                      </div>
                      <p className="text-xs text-gray-200 line-clamp-2 mb-3">
                        {chef.description}
                      </p>

                      {/* Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                          <button className="flex items-center gap-1 text-sm hover:text-red-400">
                            <Heart className="w-4 h-4" /> {chef.likes}
                          </button>
                          <button className="flex items-center gap-1 text-sm hover:text-blue-400">
                            <MessageCircle className="w-4 h-4" /> {chef.reviews}
                          </button>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white/90 text-black hover:bg-white text-xs sm:text-sm"
                        >
                          View Profile
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