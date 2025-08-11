// app/shop/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

const dummyBusinesses = [
  {
    id: "1",
    name: "Mama John's Kitchen",
    bio: "Best home-cooked biryani in town.",
    isOpen: true,
    specialOffer: "10% off Fridays",
    image: "/others/sample-store.jpg",
  },
  {
    id: "2",
    name: "Swahili Tamu",
    bio: "Delicious Swahili cuisine.",
    isOpen: false,
    specialOffer: "Free drink with Pilau",
    image: "/others/sample-store2.jpg",
  },
];

const dummyProducts = [
  {
    id: "p1",
    name: "Chicken Biryani",
    price: 8000,
    image: "/others/food1.jpg",
    businessId: "1",
  },
  {
    id: "p2",
    name: "Chapati & Beans",
    price: 3000,
    image: "/others/food2.jpg",
    businessId: "2",
  },
];

export default function BrowsePage() {
  return (
    <div className="px-4 lg:px-20 space-y-8 pt-20">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Nearby Businesses</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyBusinesses.map((biz) => (
            <Link key={biz.id} href={`/shop/store/${biz.id}`}>
              <Card className="hover:shadow-md cursor-pointer">
                <CardHeader>
                  <CardTitle>{biz.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p className="text-sm text-muted-foreground">{biz.bio}</p>
                  <p className="text-xs text-primary">{biz.specialOffer}</p>
                  <p className={`text-xs ${biz.isOpen ? "text-green-600" : "text-red-500"}`}>
                    {biz.isOpen ? "Open Now" : "Closed"}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Trending Foods</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dummyProducts.map((product) => (
            <Card key={product.id} className="relative">
              <CardContent className="p-4 space-y-2">
                {/* <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-md"
                /> */}
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  From: <Link href={`/shop/store/${product.businessId}`} className="underline">{dummyBusinesses.find(b => b.id === product.businessId)?.name}</Link>
                </p>
                <p className="text-sm text-muted-foreground">TZS {product.price.toLocaleString()}</p>
                <div className="flex justify-between items-center pt-2">
                  <Link href={`/shop/order/getorder/${product.id}`}>
                    <Button size="sm">
                      <ShoppingCart className="w-4 h-4 mr-1" /> Order
                    </Button>
                  </Link>
                  <Button size="icon" variant="ghost">
                    <Heart className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
