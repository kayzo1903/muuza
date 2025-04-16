"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be at least 0"),
  description: z.string().optional(),
  image: z
    .any()
    .refine((file) => file instanceof File || file === undefined, "Invalid file"),
});

type ProductFormData = z.infer<typeof formSchema>;

export default function ProductForm({ onClose }: { onClose: () => void }) {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      image: undefined,
    },
  });

  const onSubmit = (data: ProductFormData) => {
    console.log("Submitted:", data);

    if (data.image) {
      const file = data.image;
      console.log("Image File:", file);
    }

    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Image Upload */}
      <div>
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {preview && (
          <Image
            src={preview}
            alt="Preview"
            className="mt-2 rounded-md object-cover border"
            width={300}
            height={300}
          />
        )}
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" {...form.register("name")} />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...form.register("description")} />
      </div>

      {/* Price */}
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...form.register("price", { valueAsNumber: true })}
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
}
