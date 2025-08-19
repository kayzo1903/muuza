"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const featuredBusinesses = [
  { id:1,
    name: "🍲 Zanzibar Bites",
    desc: "Famous for Pilau & Biriani",
    image: "/images/restaurant1.jpg",
    link: "/shop/restaurant",
  },
  { id:2 ,
    name: "🍗 Mama Ntilie",
    desc: "Best Nyama Choma in Town",
    image: "/images/restaurant2.jpg",
    link: "/shop/restaurant",
  },
  { id:1 ,
    name: "🍕 Pizza Hub",
    desc: "Buy 1 Get 1 Free Pizza Fridays",
    image: "/images/restaurant3.jpg",
    link: "/shop/restaurant",
  },
];

export default function FeaturedBusiness() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Auto change every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % featuredBusinesses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const business = featuredBusinesses[current];

  return (
    <section className="relative px-4">
      <div className="relative rounded-2xl overflow-hidden shadow-lg h-56 lg:h-96">
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
              priority={current === 0} // Only prioritize first image
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/default-restaurant.jpg';
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={business.name}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold">{business.name}</h2>
              <p className="text-sm lg:text-base mt-1">{business.desc}</p>
              <Link href={business.link} className="inline-block mt-3">
                <Button variant="secondary" size="sm" className="hover:scale-105 transition-transform">
                  Visit Now
                </Button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => goToSlide((current - 1 + featuredBusinesses.length) % featuredBusinesses.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Previous business"
        >
          &larr;
        </button>
        <button 
          onClick={() => goToSlide((current + 1) % featuredBusinesses.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
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
              className={`h-2 w-2 rounded-full transition-all ${
                i === current ? "bg-white w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}