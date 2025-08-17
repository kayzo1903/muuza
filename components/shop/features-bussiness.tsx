"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const featuredBusinesses = [
  {
    name: "🍲 Zanzibar Bites",
    desc: "Famous for Pilau & Biriani",
    image: "/images/restaurant1.jpg",
    link: "/businesses/zanzibar-bites",
  },
  {
    name: "🍗 Mama Ntilie",
    desc: "Best Nyama Choma in Town",
    image: "/images/restaurant2.jpg",
    link: "/businesses/mama-ntilie",
  },
  {
    name: "🍕 Pizza Hub",
    desc: "Buy 1 Get 1 Free Pizza Fridays",
    image: "/images/restaurant3.jpg",
    link: "/businesses/pizza-hub",
  },
];

export default function FeaturedBusiness() {
  const [current, setCurrent] = useState(0);

  // Auto change every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredBusinesses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const business = featuredBusinesses[current];

  return (
    <section>
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-56 object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
          <h2 className="text-2xl font-bold">{business.name}</h2>
          <p className="text-sm">{business.desc}</p>
          <Link href={business.link}>
            <Button variant="secondary" size="sm" className="mt-2">
              Visit Now
            </Button>
          </Link>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {featuredBusinesses.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
