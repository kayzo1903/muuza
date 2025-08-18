"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react"; // ❤️ 💬 icons
import Image from "next/image";

const dishes = [
  {
    name: "Ugali",
    category: "East African",
    image: "/foods/ugali.jpg",
    likes: 240,
    comments: 32,
  },
  {
    name: "Pilau",
    category: "East African",
    image: "/foods/pilau.jpg",
    likes: 320,
    comments: 45,
  },
  {
    name: "Nyama Choma",
    category: "East African",
    image: "/foods/nyama.jpg",
    likes: 410,
    comments: 58,
  },
  {
    name: "Chapati",
    category: "East African",
    image: "/foods/chapati.jpg",
    likes: 280,
    comments: 22,
  },
  {
    name: "Samaki",
    category: "Seafood",
    image: "/foods/samaki.jpg",
    likes: 150,
    comments: 14,
  },
  {
    name: "Biriani",
    category: "East African",
    image: "/foods/biryani.jpg",
    likes: 290,
    comments: 39,
  },
  {
    name: "Chips",
    category: "Fast Food",
    image: "/foods/chips.jpg",
    likes: 360,
    comments: 41,
  },
  {
    name: "Pizza",
    category: "International",
    image: "/foods/pizza.jpg",
    likes: 500,
    comments: 77,
  },
  {
    name: "Burgers",
    category: "International",
    image: "/foods/burger.jpg",
    likes: 470,
    comments: 65,
  },
  {
    name: "Ice Cream",
    category: "Dessert",
    image: "/foods/icecream.jpg",
    likes: 620,
    comments: 90,
  },
];

export default function PopularDishes() {
  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Popular Dishes</h2>
        <Link href="/dishes">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {/* Scrollable container on small screens */}
      <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
        {dishes.map((dish, i) => (
          <Link href={`/shop/dishes/${i + 1}`} key={i}>
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="min-w-[250px] sm:min-w-0 flex-shrink-0"
            >
              <Card className="relative rounded-2xl overflow-hidden shadow-md h-60 lg:h-72 group">
                {/* Background image with Next.js Image optimization */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>

                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Engagement metrics with hover effects */}
                <div className="absolute top-3 right-3 flex items-center gap-3 bg-black/50 px-3 py-1 rounded-full text-white text-xs backdrop-blur-sm">
                  <div className="flex items-center gap-1 hover:text-red-400 transition-colors">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>{dish.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span>{dish.comments}</span>
                  </div>
                </div>

                {/* Info overlay with enhanced typography */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold tracking-tight line-clamp-1">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-gray-300 font-medium">
                      {dish.category}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-3 bg-white/90 text-black hover:bg-white hover:shadow-md transition-all"
                    asChild
                  >
                    <Link href={`/dishes/${dish.name}`}>View Details</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
