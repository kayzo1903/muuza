"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, MessageCircle, Star, Trash2, ArrowLeft, ShoppingCart, Home, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Mock wishlist data
const mockWishlist = [
  {
    id: 1,
    name: "Ugali",
    category: "East African",
    image: "/foods/ugali.jpg",
    likes: 240,
    comments: 32,
    price: "TZS 3,000",
    restaurant: "Mama Africa Kitchen",
    rating: 4.5,
    description: "Traditional maize flour dish served with sukuma wiki or meat stew",
  },
  {
    id: 3,
    name: "Nyama Choma",
    category: "East African",
    image: "/foods/nyama.jpg",
    likes: 410,
    comments: 58,
    price: "TZS 12,000",
    restaurant: "Grill Masters",
    rating: 4.7,
    description: "Succulent grilled meat with traditional side dishes",
  },
];

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlist);
  const [isEmpty, setIsEmpty] = useState(wishlistItems.length === 0);

  useEffect(() => {
    setIsEmpty(wishlistItems.length === 0);
  }, [wishlistItems]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  if (isEmpty) {
    return (
      <div className="container mx-auto p-4 min-h-screen">
        {/* Enhanced Breadcrumb Navigation */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link href="/shop" className="ml-1 text-sm font-medium text-gray-700 hover:text-green-600 md:ml-2">Shop</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link href="/shop/dishes" className="ml-1 text-sm font-medium text-gray-700 hover:text-green-600 md:ml-2">Dishes</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Wishlist</span>
              </div>
            </li>
          </ol>
        </nav>
        
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Heart className="w-16 h-16 text-gray-300 mb-4" strokeWidth={1} />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            You haven&apos;t added any dishes to your wishlist yet. Start exploring our delicious options!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop/dishes">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                Browse Dishes
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Enhanced Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/shop" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Shop</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/shop/dishes" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Dishes</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Wishlist</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Your Wishlist
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          </h1>
          <p className="text-gray-600 mt-1">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
        
        <div className="flex gap-2">
          <Link href="/shop/dishes">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse More
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearWishlist}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Wishlist Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((dish) => (
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-yellow-300">
              {/* Remove from wishlist button */}
              <button
                onClick={() => removeFromWishlist(dish.id)}
                className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                aria-label="Remove from wishlist"
              >
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              </button>

              {/* Background image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/foods/default.jpg";
                  }}
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Rating badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{dish.rating}</span>
              </div>

              {/* Engagement metrics */}
              <div className="absolute top-12 right-3 flex items-center gap-3 bg-black/70 px-3 py-1 rounded-full text-white text-xs backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>{dish.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span>{dish.comments}</span>
                </div>
              </div>

              {/* Dish information */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="space-y-1 mb-2">
                  <h3 className="text-lg font-bold tracking-tight line-clamp-1">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-gray-300 font-medium line-clamp-1">
                    {dish.restaurant}
                  </p>
                  <p className="text-xs text-gray-300">{dish.category}</p>
                </div>
                <p className="text-sm font-bold text-green-400 mb-2">
                  {dish.price}
                </p>
                <p className="text-xs text-gray-200 line-clamp-2 mb-3">
                  {dish.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white hover:shadow-md transition-all text-xs sm:text-sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order Now
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Continue shopping CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Find more delicious dishes to add to your wishlist</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop/dishes">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}