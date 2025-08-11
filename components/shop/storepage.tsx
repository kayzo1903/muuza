"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Phone, MapPin, Clock, Star } from "lucide-react";

export default function BusinessPage() {
  const { id } = useParams();

  // Simulated data (replace with real backend data)
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
    gallery: [
      "/images/biryani.jpg",
      "/images/ugali-nyama.jpg",
      "/images/chapati-beans.jpg",
      "/images/pilau.jpg",
    ],
    reviews: [
      {
        name: "Amina M.",
        comment: "Delicious food and quick delivery. Highly recommend!",
        rating: 5,
      },
      {
        name: "Juma K.",
        comment: "Loved the biryani. It tastes just like home.",
        rating: 4.5,
      },
    ],
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{business.name}</h1>
        <p className="text-muted-foreground">{business.bio}</p>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <Star className="w-4 h-4 text-yellow-500" />
          {business.rating} rating
        </div>
      </div>

      <Separator />

      {/* About Card */}
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

      {/* Food Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Food Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {business.gallery.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={src}
                  alt={`food-${i}`}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Available Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Products will be displayed here.</p>
        </CardContent>
      </Card>

      {/* Customer Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {business.reviews.map((review, index) => (
            <div key={index} className="border-b pb-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{review.name}</h4>
                <div className="flex items-center text-yellow-500 text-sm">
                  <Star className="w-4 h-4 mr-1" />
                  {review.rating}
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
