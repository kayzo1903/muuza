"use client";

import { useEffect, useState } from "react";
import ProductCard from "./productcard";
import pizza from "@/public/foods/pizza.jpg";
import bugger from "@/public/foods/bugger.jpg";
import chicken from "@/public/foods/chicken.jpg";
import ProductCardSkeleton from "./productcardskeleton";

// Sample static data
const sampleProducts = [
  {
    id: "1",
    name: "Chicken Burger",
    description: "Juicy grilled chicken with fresh toppings",
    price: 8500,
    image: `${bugger}`, // place image in public/images
  },
  {
    id: "2",
    name: "Chips Kuku",
    description: "Classic combo served hot",
    price: 7000,
    image: `${chicken}`,
  },
  {
    id: "3",
    name: "Pizza Margherita",
    description: "Cheesy goodness with tomato sauce",
    price: 15000,
    image: `${pizza}`,
  },
];

export default function ProductList() {
  const [products, setProducts] = useState(sampleProducts);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEdit = (product: unknown) => {
    console.log("Edit:", product);
    // TODO: Open edit modal, pass product data
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}

      {/* Product Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
      </div>
    </div>
  );
}
