"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Heart, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Mock function to calculate distance - in a real app, you'd use actual location data
const calculateDistance = (chefIndex : number) => {
  const distances = [0.8, 1.2, 0.5, 2.1, 3.5, 4.2, 2.9, 1.7, 0.3];
  return distances[chefIndex % distances.length];
};

const popularChefs = [
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
  },
];

export default function PopularChefsFilter() {
  // Properly type the state for user location
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
          Popular Chefs Near You 👨🏽‍🍳
          <MapPin className="w-5 h-5 text-red-500" />
        </h2>
        <Link href="/shop/chefs">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {/* Scrollable container on small screens */}
      <div className="flex overflow-x-auto pb-4 gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible sm:gap-6 sm:pb-0">
        {popularChefs.map((chef, i) => {
          const distance = calculateDistance(i);
          return (
            <Link href={`/shop/chefs/${chef.id}`} key={chef.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="min-w-[280px] md:min-w-[300px] lg:min-w-[320px] sm:min-w-0 flex-shrink-0"
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

                  {/* Distance badge (top-left) */}
                  <span className="absolute top-3 left-3 bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    {distance} km
                  </span>

                  Rating badge (top-right)
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                    <span>{chef.rating}</span>
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 p-4 text-white w-full">
                    <h3 className="text-lg font-semibold">{chef.name}</h3>
                    <p className="text-sm text-gray-200">{chef.specialty}</p>
                    <div className="flex items-center gap-2 text-xs opacity-90 mb-1 mt-1">
          
                      <span>{chef.experience} experience</span>
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
          );
        })}
      </div>
    </div>
  );
}