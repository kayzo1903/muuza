// app/favourites/page.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const dummyFavourites = [
  {
    id: "p1",
    name: "Chicken Biryani",
    price: 8000,
    image: "/others/food1.jpg",
    businessId: "1",
    businessName: "Mama John's Kitchen",
  },
  {
    id: "p2",
    name: "Chapati & Beans",
    price: 3000,
    image: "/others/food2.jpg",
    businessId: "2",
    businessName: "Swahili Tamu",
  },
];

export default function FavouritesPage() {
  return (
    <div className="px-5 space-y-8 pt-20 h-screen">
      <h1 className="text-2xl font-bold">Your Favourites</h1>
      {dummyFavourites.length === 0 ? (
        <p className="text-muted-foreground">You have no favourite items yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dummyFavourites.map((item) => (
            <Card key={item.id} className="relative">
              <CardContent className="p-4 space-y-2">
                {/* <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-md"
                /> */}
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  From: <Link href={`/shop/store/${item.businessId}`} className="underline">{item.businessName}</Link>
                </p>
                <p className="text-sm text-muted-foreground">
                  TZS {item.price.toLocaleString()}
                </p>
                <div className="flex justify-end pt-2">
                  <Link href={`/shop/order/${item.id}`}>
                    <Button size="sm">Order</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
