"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, Heart, MapPin, MessageCircle } from "lucide-react";

// Mock function to calculate distance
const calculateDistance = (businessIndex : number) => {
  const distances = [0.8, 1.2, 0.5];
  return distances[businessIndex % distances.length];
};

const featuredBusinesses = [
  {
    id: 1,
    name: "Zanzibar Bites",
    desc: "Famous for Pilau & Biriani",
    image: "/images/restaurant1.jpg",
    link: "/shop/restaurant/1",
    rating: 4.8,
    likes: 245,
    reviews: 42,
    category: "Swahili Cuisine",
    deliveryTime: "20-30 min",
    distance: 0.8,
  },
  {
    id: 2,
    name: "Mama Ntilie",
    desc: "Best Nyama Choma in Town",
    image: "/images/restaurant2.jpg",
    link: "/shop/restaurant/2",
    rating: 4.6,
    likes: 189,
    reviews: 35,
    category: "Grilled Meats",
    deliveryTime: "25-35 min",
    distance: 1.2,
  },
  {
    id: 3,
    name: "Pizza Hub",
    desc: "Buy 1 Get 1 Free Pizza Fridays",
    image: "/images/restaurant3.jpg",
    link: "/shop/restaurant/3",
    rating: 4.3,
    likes: 167,
    reviews: 28,
    category: "Italian",
    deliveryTime: "15-25 min",
    distance: 0.5,
  },
];

export default function FeaturedBusiness() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto change every 5s, but pause when user interacts
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % featuredBusinesses.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setIsPaused(true); // Pause auto-rotation on user interaction
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  const business = featuredBusinesses[current];
  const distance = calculateDistance(current);

  return (
    <section className="relative px-4 mb-8">
      <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 md:h-80 lg:h-96 border border-yellow-300">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={business.image}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={business.image}
              alt={business.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={current === 0}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/default-restaurant.jpg';
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Top info badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {/* Distance badge */}
          <span className="bg-green-900 text-white text-xs px-2 py-1 rounded-full shadow-md w-fit">
            <MapPin className="w-3 h-3 inline mr-1" />
            {distance} km
          </span>
          
          {/* Rating badge */}
          <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs w-fit">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span>{business.rating}</span>
          </div>
        </div>

        {/* Engagement metrics (top-right) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-red-400" />
            <span>{business.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3 text-blue-400" />
            <span>{business.reviews}</span>
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={business.name}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold">{business.name}</h2>
                <p className="text-sm lg:text-base mt-1 opacity-90">{business.desc}</p>
                <p className="text-xs opacity-80 mt-1">{business.category} • {business.deliveryTime}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Link href={business.link}>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-white/90 text-black hover:bg-white hover:shadow-md transition-all"
                  >
                    Visit Now
                  </Button>
                </Link>
                
                <Link href={`/shop/restaurant/${business.id}/menu`}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-transparent text-white border-white hover:bg-white/10 transition-all"
                  >
                    View Menu
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => goToSlide((current - 1 + featuredBusinesses.length) % featuredBusinesses.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all backdrop-blur-sm"
          aria-label="Previous business"
        >
          &larr;
        </button>
        <button 
          onClick={() => goToSlide((current + 1) % featuredBusinesses.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all backdrop-blur-sm"
          aria-label="Next business"
        >
          &rarr;
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {featuredBusinesses.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "bg-white w-6" : "bg-white/50 w-2"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}