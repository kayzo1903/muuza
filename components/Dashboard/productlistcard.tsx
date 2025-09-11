import { Clock, Edit, Trash2, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Product } from "./productList";

interface ProductCardProps {
  product: Product;
  businessId: string;
  onDelete: (productId: string, productName: string) => void;
}

export default function ProductCard({ product, businessId, onDelete }: ProductCardProps) {
  const priceInShillings = (product.price / 100).toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
  });

  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-shadow h-[320px] md:h-[360px]">
      {/* Background Image */}
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          priority
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <Utensils className="w-12 h-12 text-muted-foreground" />
        </div>
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

      {/* Availability Badge */}
      <Badge
        variant={product.isAvailable ? "default" : "secondary"}
        className="absolute top-2 left-2 z-10"
      >
        {product.isAvailable ? "Available" : "Unavailable"}
      </Badge>

      {/* Action Buttons - Show only on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 space-x-2">
        <Button
          variant="secondary"
          size="icon"
          asChild
          className="h-8 w-8 bg-background/80 backdrop-blur-sm"
        >
          <Link href={`/dashboard/${businessId}/products/edit/${product.id}`}>
            <Edit className="w-4 h-4" />
          </Link>
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="h-8 w-8 bg-background/80 backdrop-blur-sm"
          onClick={() => onDelete(product.id, product.name)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Card Content Overlay */}
      <CardContent className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg leading-tight line-clamp-1">
            {product.name}
          </h3>
          <span className="font-bold text-primary px-2 py-1 rounded text-sm">
            {priceInShillings}
          </span>
        </div>

        {product.description && (
          <p className="text-sm text-gray-200 line-clamp-2 mt-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center gap-3 text-xs text-gray-300 mt-2">
          {product.preparationTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {product.preparationTime} min
            </div>
          )}

          {product.subcategory && (
            <Badge
              variant="outline"
              className="text-xs bg-black/50 text-white border-white/30"
            >
              {product.subcategory}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
