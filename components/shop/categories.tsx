"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const categories = [
  { name: "Ugali", icon: "🥘", href: "/foods/ugali" },
  { name: "Pilau", icon: "🍛", href: "/foods/pilau" },
  { name: "Ndizi", icon: "🍌", href: "/foods/ndizi" },
  { name: "Maandazi", icon: "🍩", href: "/foods/maandazi" },
  { name: "Chapati", icon: "🥣", href: "/foods/chapati" },
  { name: "Nyama Choma", icon: "🍖", href: "/foods/nyama-choma" },
  { name: "Samaki", icon: "🐟", href: "/foods/samaki" },
  { name: "Mihogo", icon: "🍠", href: "/foods/mihogo" },
  { name: "Chips", icon: "🍟", href: "/foods/chips" },
  { name: "Biriani", icon: "🍲", href: "/foods/biriani" },
  { name: "Wali", icon: "🍚", href: "/foods/wali" },
  { name: "Burgers", icon: "🍔", href: "/foods/burgers" },
  { name: "Fries", icon: "🍟", href: "/foods/fries" },
  { name: "Fried Chicken", icon: "🍗", href: "/foods/chicken" },
  { name: "Pizza", icon: "🍕", href: "/foods/pizza" },
  { name: "Ice Cream", icon: "🍦", href: "/foods/ice-cream" },
  { name: "Desserts", icon: "🍩", href: "/foods/desserts" },
  { name: "Sushi", icon: "🍣", href: "/foods/sushi" },
  { name: "Noodles", icon: "🍜", href: "/foods/noodles" },
  { name: "Pasta", icon: "🍝", href: "/foods/pasta" },
  { name: "Chocolate", icon: "🍫", href: "/foods/chocolate" },
  { name: "Coffee", icon: "☕", href: "/foods/coffee" },
  { name: "Soft Drinks", icon: "🥤", href: "/foods/drinks" },
  { name: "Chefs", icon: "👨🏽‍🍳", href: "/service/chefs" }
];

export default function EastAfricanFoods() {
  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-4 hide-scrollbar space-x-4 px-4">
        {categories.map((cat) => (
          <motion.div
            key={cat.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0" // Prevent cards from shrinking
          >
            <Link href={cat.href}>
              <Card className="w-32 h-32 flex flex-col items-center justify-center p-2 rounded-full shadow-md cursor-pointer hover:shadow-lg transition">
                <CardContent className="flex flex-col items-center p-0">
                  <span className="text-4xl">{cat.icon}</span>
                  <span className="mt-2 text-sm font-medium text-center">
                    {cat.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}