"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react"; // Import the icons
import Image from "next/image";

const trendingDishes = [
  { 
    name: "Mandazi", 
    category: "Snack", 
    image: "/foods/mandazi.jpg",
    likes: 180,
    comments: 24
  },
  { 
    name: "Chips Mayai", 
    category: "Street Food", 
    image: "/foods/chips.jpg",
    likes: 220,
    comments: 35
  },
  { 
    name: "Pilau", 
    category: "East African", 
    image: "/foods/pilau.jpg",
    likes: 310,
    comments: 42
  },
  { 
    name: "Nyama Choma", 
    category: "Grilled", 
    image: "/foods/nyama.jpg",
    likes: 390,
    comments: 56
  },
];

export default function TrendingNow() {
  return (
    <div className="w-full p-4">
      {/* Header with button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Trending Now 🔥</h2>
        <Link href="/trending">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {/* Scrollable container on small screens */}
      <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
        {trendingDishes.map((dish, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="min-w-[250px] sm:min-w-0 flex-shrink-0"
          >
           <Card className="relative rounded-2xl overflow-hidden shadow-md h-60 lg:h-72 border border-red-300">
  {/* Background image using Next.js Image */}
  <div className="absolute inset-0 w-full h-full">
    <Image
      src={dish.image}
      alt={dish.name}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

  {/* Trending badge */}
  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
    🔥 Trending
  </span>

  {/* Likes + Comments badge (top-right) */}
  <div className="absolute top-3 right-3 flex items-center gap-3 bg-black/50 px-3 py-1 rounded-full text-white text-xs">
    <div className="flex items-center gap-1">
      <Heart className="w-4 h-4 text-red-400" />
      <span>{dish.likes}</span>
    </div>
    <div className="flex items-center gap-1">
      <MessageCircle className="w-4 h-4 text-blue-400" />
      <span>{dish.comments}</span>
    </div>
  </div>

  {/* Info overlay */}
  <div className="absolute bottom-0 p-3 text-white">
    <h3 className="text-lg font-semibold">{dish.name}</h3>
    <p className="text-sm text-gray-200">
      {dish.category} · Trending this week
    </p>
    <Button
      variant="secondary"
      size="sm"
      className="mt-2 bg-white/90 text-black hover:bg-white"
    >
      More
    </Button>
  </div>
</Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}