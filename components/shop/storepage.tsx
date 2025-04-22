// app/business/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Phone, MapPin, Clock, Star } from "lucide-react";

export default function BusinessPage() {
  const { id } = useParams();

  // Simulated data (replace with fetch from backend)
  const business = {
    id,
    name: "Mama John's Kitchen",
    bio: "Home of the best biryani",
    description:
      "We specialize in traditional Swahili dishes prepared with love. Fresh ingredients, daily specials, and quick delivery.",
    phone: "+255 712 345 678",
    location: "Kariakoo, Dar es Salaam",
    hours: "Mon–Sat: 9am–9pm",
    rating: 4.7,
    specialOffer: "10% off on Fridays",
    isOpen: true,
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">{business.name}</h1>
        <p className="text-muted-foreground">{business.bio}</p>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <Star className="w-4 h-4 text-yellow-500" />
          {business.rating} rating
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{business.description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              {business.phone}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              {business.location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              {business.hours}
            </div>
            {business.specialOffer && (
              <div className="text-green-600 font-medium">
                🎉 Offer: {business.specialOffer}
              </div>
            )}
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  business.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {business.isOpen ? "Open Now" : "Closed"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TODO: Add Product Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Available Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Products will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
