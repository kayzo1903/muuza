"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
//import Image from "next/image";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string; // local object URL or path
};

type Props = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <Card className="w-full max-w-sm shadow-sm">
      <CardContent className="p-4 space-y-3">
        {/* <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="rounded-md object-cover w-full h-40"
        /> */}

        <div>
          <CardTitle className="text-lg">{product.name}</CardTitle>
          {product.description && (
            <p className="text-sm text-muted-foreground">{product.description}</p>
          )}
          <p className="text-md font-semibold mt-2">TZS {product.price.toLocaleString()}</p>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(product)}
          >
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
