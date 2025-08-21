"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const categories = [
  { name: "Ugali", icon: "🥘", href: "/shop/food-category/ugali" },
  { name: "Pilau", icon: "🍛", href: "/shop/food-category/pilau" },
  { name: "Ndizi", icon: "🍌", href: "/shop/food-category/ndizi" },
  { name: "Maandazi", icon: "🍩", href: "/shop/food-category/maandazi" },
  { name: "Chapati", icon: "🥣", href: "/shop/food-category/chapati" },
  { name: "Nyama Choma", icon: "🍖", href: "/shop/food-category/nyama-choma" },
  { name: "Samaki", icon: "🐟", href: "/shop/food-category/samaki" },
  { name: "Mihogo", icon: "🍠", href: "/shop/food-category/mihogo" },
  { name: "Chips", icon: "🍟", href: "/shop/food-category/chips" },
  { name: "Biriani", icon: "🍲", href: "/shop/food-category/biriani" },
  { name: "Wali", icon: "🍚", href: "/shop/food-category/wali" },
  { name: "Burgers", icon: "🍔", href: "/shop/food-category/burgers" },
  { name: "Fries", icon: "🍟", href: "/shop/food-category/fries" },
  { name: "Fried Chicken", icon: "🍗", href: "/shop/food-category/chicken" },
  { name: "Pizza", icon: "🍕", href: "/shop/food-category/pizza" },
  { name: "Ice Cream", icon: "🍦", href: "/shop/food-category/ice-cream" },
  { name: "Desserts", icon: "🍩", href: "/shop/food-category/desserts" },
  { name: "Sushi", icon: "🍣", href: "/shop/food-category/sushi" },
  { name: "Noodles", icon: "🍜", href: "/shop/food-category/noodles" },
  { name: "Pasta", icon: "🍝", href: "/shop/food-category/pasta" },
  { name: "Chocolate", icon: "🍫", href: "/shop/food-category/chocolate" },
  { name: "Coffee", icon: "☕", href: "/shop/food-category/coffee" },
  { name: "Soft Drinks", icon: "🥤", href: "/shop/food-category/drinks" },
  { name: "Chefs", icon: "👨🏽‍🍳", href: "/shop/chefs" }
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