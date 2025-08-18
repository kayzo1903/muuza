"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

const specials = [
  { name: "Pilau + Soda", category: "East African", price: "TZS 6,000", image: "/foods/pilau.jpg" },
  { name: "Nyama Choma Friday", category: "Grilled Meat", price: "TZS 12,000", image: "/foods/nyama.jpg" },
  { name: "Chips Mayai", category: "Street Food", price: "TZS 4,500", image: "/foods/chips.jpg" },
  { name: "Pizza Deal (Buy 1 Get 1)", category: "Fast Food", price: "TZS 18,000", image: "/foods/pizza.jpg" },
];

export default function TodaysSpecial() {
  // Manage likes and comments per dish
  const [likes, setLikes] = useState(Array(specials.length).fill(0));
  const [comments, setComments] = useState(Array(specials.length).fill(0));

  const handleLike = (index: number) => {
    const updated = [...likes];
    updated[index] += 1;
    setLikes(updated);
  };

  const handleComment = (index: number) => {
    const updated = [...comments];
    updated[index] += 1;
    setComments(updated);
  };

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Today’s Special</h2>
        <Link href="/specials">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>

      {/* Scrollable grid */}
      <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
        {specials.map((dish, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="min-w-[250px] sm:min-w-0 flex-shrink-0"
          >
            <Card className="relative rounded-2xl overflow-hidden shadow-md h-64 lg:h-72 border border-yellow-300">
              {/* Background image */}
              <img
                src={dish.image}
                alt={dish.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Special badge */}
              <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                Special
              </span>

              {/* Info overlay */}
              <div className="absolute bottom-0 p-3 text-white w-full">
                <h3 className="text-lg font-semibold">{dish.name}</h3>
                <p className="text-sm text-gray-200">{dish.category}</p>
                <p className="text-sm font-bold text-green-400">{dish.price}</p>

                {/* Buttons */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleLike(i)}
                      className="flex items-center gap-1 text-sm hover:text-red-400"
                    >
                      <Heart className="w-4 h-4" /> {likes[i]}
                    </button>
                    <button
                      onClick={() => handleComment(i)}
                      className="flex items-center gap-1 text-sm hover:text-blue-400"
                    >
                      <MessageCircle className="w-4 h-4" /> {comments[i]}
                    </button>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 text-black hover:bg-white"
                  >
                    More
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
