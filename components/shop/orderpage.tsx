"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // import carousel components
import Image from "next/image";

// Mock data (to simulate fetched product info)
const dummyProducts = [
  {
    id: "p1",
    name: "Chicken Biryani",
    price: 8000,
    businessName: "Mama John's Kitchen",
    images: [
      "/images/biryani1.jpg",
      "/images/biryani2.jpg",
      "/images/biryani3.jpg",
    ],
  },
  {
    id: "p2",
    name: "Chapati & Beans",
    price: 3000,
    businessName: "Swahili Tamu",
    images: [
      "/images/chapati1.jpg",
      "/images/chapati2.jpg",
    ],
  },
];

export default function OrderPage() {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!id) return <div className="p-6">Invalid order link.</div>;

  const product = dummyProducts.find((p) => p.id === id[1]);
  if (!product) return <div className="p-6">Product not found.</div>;

  const handleSubmit = () => {
    console.log("Order submitted:", {
      product,
      ...form,
    });
    // TODO: Send order to backend
  };

  return (
    <div className="p-6 max-w-xl mx-auto pt-20 space-y-6">
      {/* Carousel Section */}
      {product.images && (
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((src, idx) => (
              <CarouselItem key={idx}>
                <div className="relative h-80 w-full rounded-xl overflow-hidden bg-red-500">
                  <Image
                    src={src}
                    alt={`${product.name} image ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      {/* Order Card Section */}
      <Card>
        <CardHeader>
          <CardTitle>Order: {product.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            From: {product.businessName}
          </p>
          <p className="text-sm font-semibold">
            Price: TZS {product.price.toLocaleString()}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Your Name</label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Asha Mohamed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. 0712 345 678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Delivery Address</label>
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="e.g. Mikocheni B, Dar es Salaam"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Note (Optional)</label>
            <Textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Add any extra instruction..."
            />
          </div>

          <Button className="mt-4 w-full" onClick={handleSubmit}>
            Confirm Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
