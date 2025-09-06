"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Home, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  const skeletonItems = Array(6).fill(0); // Number of placeholder cards

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Breadcrumb Skeleton */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-300"
            >
              <Home className="w-4 h-4 mr-2 text-gray-400" />
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center text-gray-300">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="ml-1 text-sm md:ml-2">Shop</span>
            </div>
          </li>
          <li>
            <div className="flex items-center text-gray-300">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="ml-1 text-sm md:ml-2">Dishes</span>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center text-gray-400">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="ml-1 text-sm md:ml-2">Wishlist</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-48" />
            <Heart className="w-6 h-6 text-gray-300" />
          </div>
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>

      {/* Wishlist Items Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skeletonItems.map((_, index) => (
          <div key={index}>
            <Card className="relative rounded-2xl overflow-hidden shadow-md h-96 border border-gray-200">
              {/* Image Skeleton */}
              <div className="absolute inset-0">
                <Skeleton className="w-full h-full" />
              </div>

              {/* Overlay Skeleton */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
                <Skeleton className="h-3 w-1/3 rounded" />
                <Skeleton className="h-4 w-20 rounded mt-2" />
                <Skeleton className="h-3 w-full rounded mt-2" />
                <Skeleton className="h-8 w-full rounded-lg mt-3" />
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Continue Shopping Skeleton */}
      <div className="mt-12 text-center">
        <Skeleton className="h-4 w-80 mx-auto mb-4" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
