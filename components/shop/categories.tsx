"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const categories = [
  { name: "Ugali", icon: "🥘", href: "/shop/foods/ugali" },
  { name: "Pilau", icon: "🍛", href: "/shop/foods/pilau" },
  { name: "Ndizi", icon: "🍌", href: "/shop/foods/ndizi" },
  { name: "Maandazi", icon: "🍩", href: "/shop/foods/maandazi" },
  { name: "Chapati", icon: "🥣", href: "/shop/foods/chapati" },
  { name: "Nyama Choma", icon: "🍖", href: "/shop/foods/nyama-choma" },
  { name: "Samaki", icon: "🐟", href: "/shop/foods/samaki" },
  { name: "Mihogo", icon: "🍠", href: "/shop/foods/mihogo" },
  { name: "Chips", icon: "🍟", href: "/shop/foods/chips" },
  { name: "Biriani", icon: "🍲", href: "/shop/foods/biriani" },
  { name: "Wali", icon: "🍚", href: "/shop/foods/wali" },
  { name: "Burgers", icon: "🍔", href: "/shop/foods/burgers" },
  { name: "Fries", icon: "🍟", href: "/shop/foods/fries" },
  { name: "Fried Chicken", icon: "🍗", href: "/shop/foods/chicken" },
  { name: "Pizza", icon: "🍕", href: "/shop/foods/pizza" },
  { name: "Ice Cream", icon: "🍦", href: "/shop/foods/ice-cream" },
  { name: "Desserts", icon: "🍩", href: "/shop/foods/desserts" },
  { name: "Sushi", icon: "🍣", href: "/shop/foods/sushi" },
  { name: "Noodles", icon: "🍜", href: "/shop/foods/noodles" },
  { name: "Pasta", icon: "🍝", href: "/shop/foods/pasta" },
  { name: "Chocolate", icon: "🍫", href: "/shop/foods/chocolate" },
  { name: "Coffee", icon: "☕", href: "/shop/foods/coffee" },
  { name: "Soft Drinks", icon: "🥤", href: "/shop/foods/drinks" },
  { name: "Chefs", icon: "👨🏽‍🍳", href: "/shop/service/chefs" }
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