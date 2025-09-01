import React from 'react'
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ChefHat, Utensils, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function NotfoundComp() {
  return (
    <div className="max-w-md w-full mx-auto">
        {/* Animated 404 number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-9xl font-bold text-amber-500 dark:text-yellow-400 drop-shadow-md">
            404
          </h1>
        </motion.div>

        {/* Message card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 rounded-2xl shadow-lg border-amber-200 dark:border-amber-800 bg-white dark:bg-gray-850">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Page Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
              </p>
              
              {/* Chef illustration */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                    <ChefHat className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <Utensils className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Suggested actions */}
            <div className="space-y-3">
              <Button 
                onClick={() => window.history.back()}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              
              <Link href="/" className="block">
                <Button className="w-full flex items-center justify-center gap-2 bg-white text-amber-600 hover:bg-amber-50 border border-amber-300 dark:bg-gray-800 dark:text-amber-400 dark:border-amber-700 dark:hover:bg-amber-900/20">
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </Link>
              
              <Link href="/shop/dishes" className="block">
                <Button className="w-full flex items-center justify-center gap-2 bg-white text-amber-600 hover:bg-amber-50 border border-amber-300 dark:bg-gray-800 dark:text-amber-400 dark:border-amber-700 dark:hover:bg-amber-900/20">
                  <Search className="w-4 h-4" />
                  Browse Dishes
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Additional helpful links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Popular pages you might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/shop/chefs">
              <Button variant="outline" size="sm" className="text-xs">
                Chefs
              </Button>
            </Link>
            <Link href="/shop/categories">
              <Button variant="outline" size="sm" className="text-xs">
                Categories
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline" size="sm" className="text-xs">
                Cart
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="sm" className="text-xs">
                Profile
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
  )
}