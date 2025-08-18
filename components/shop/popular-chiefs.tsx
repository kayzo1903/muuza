"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Heart } from "lucide-react"; // Import star for ratings and heart for likes
import Image from "next/image";

const popularChefs = [
  { 
    name: "mwajuma", 
    specialty: "Swahili Cuisine", 
    image: "/chefs/mwajuma.jpg",
    rating: 4.8,
    likes: 28,
    experience: "15 years"
  },
  { 
    name: "abdul", 
    specialty: "Nyama Choma Expert", 
    image: "/chefs/abdul.jpg",
    rating: 4.9,
    likes: 23,
    experience: "12 years"
  },
  { 
    name: "anita", 
    specialty: "Vegetarian Dishes", 
    image: "/chefs/anita.jpg",
    rating: 4.7,
    likes: 34,
    experience: "10 years"
  },
  { 
    name: "catherine", 
    specialty: "Coastal Delicacies", 
    image: "/chefs/catherine.jpg",
    rating: 4.6,
    likes: 13,
    experience: "8 years"
  },
  { 
    name: "deogratus", 
    specialty: "Coastal Delicacies", 
    image: "/chefs/deogratus.jpg",
    rating: 4.0,
    likes: 22,
    experience: "8 years"
  } ,{ 
    name: "Fred", 
    specialty: "Coastal Delicacies", 
    image: "/chefs/fred.jpg",
    rating: 4.3,
    likes: 13,
    experience: "3 years"
  } ,{ 
    name: "kasimu", 
    specialty: "Coastal Delicacies", 
    image: "/chefs/kasimu.jpg",
    rating: 3.9,
    likes: 34,
    experience: "3 years"
  } ,{ 
    name: "mwanahawa", 
    specialty: "Coastal Delicacies", 
    image: "/chefs/mwanahawa.jpg",
    rating: 4.9,
    likes: 7,
    experience: "3 years"
  },{ 
    name: "mwanaisha", 
    specialty: "Coastal Delicacies", 
    image: "/chefs/mwanaisha.jpg",
    rating: 4.9,
    likes: 7,
    experience: "3 years"
  }
];

export default function PopularChefs() {
  return (
    <div className="w-full p-4">
      {/* Header with button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Popular Chefs 👨🏽‍🍳</h2>
        <Link href="/chefs">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {/* Scrollable container on small screens */}
      <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
        {popularChefs.map((chef, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="min-w-[250px] sm:min-w-0 flex-shrink-0"
          >
           <Card className="relative rounded-2xl overflow-hidden shadow-md h-60 lg:h-72">
  {/* Background image using Next.js Image */}
  <div className="absolute inset-0 w-full h-full">
    <Image
      src={chef.image}
      alt={chef.name}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/chef/default-chef.jpg';
      }}
    />
  </div>

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

  {/* Rating badge (top-left) */}
  <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full text-white text-xs">
    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
    <span>{chef.rating}</span>
  </div>

  {/* Likes badge (top-right) */}
  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full text-white text-xs">
    <Heart className="w-4 h-4 text-red-400" />
    <span>{chef.likes}</span>
  </div>

  {/* Info overlay */}
  <div className="absolute bottom-0 p-3 text-white">
    <h3 className="text-lg font-semibold">{chef.name}</h3>
    <p className="text-sm text-gray-200">{chef.specialty}</p>
    <p className="text-xs text-gray-300 mt-1">{chef.experience} experience</p>
    <Button
      variant="secondary"
      size="sm"
      className="mt-2 bg-white/90 text-black hover:bg-white"
    >
      View Profile
    </Button>
  </div>
</Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}