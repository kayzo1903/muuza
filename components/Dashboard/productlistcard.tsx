import { Clock, Edit, Trash2, Utensils, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
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
    <Card className="flex flex-col overflow-hidden rounded-xl border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs mx-auto sm:max-w-none h-[340px] bg-card">
      {/* Image Section with Improved Overlay */}
      <div className="relative w-full h-44 bg-muted/30">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/70 bg-muted/20">
            <Utensils className="w-10 h-10 mb-1" />
            <span className="text-xs">No Image</span>
          </div>
        )}

        {/* Semi-transparent Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Availability Badge */}
        <div className="absolute top-2 left-2">
          <Badge
            variant={product.isAvailable ? "default" : "secondary"}
            className="px-2 py-1 text-xs font-medium shadow-sm"
          >
            {product.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>

        {/* Rating if available */}
        {product.rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-md text-xs">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
        )}

        {/* Product Info Floating Card */}
        <div className="absolute bottom-3 left-3 right-3 bg-background/95 backdrop-blur-md rounded-lg p-3 shadow-lg border border-border/50">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-sm line-clamp-1 flex-1 pr-2 text-foreground">
              {product.name}
            </h3>
            <span className="font-bold text-primary text-sm whitespace-nowrap bg-primary/10 px-1.5 py-0.5 rounded-md">
              {priceInShillings}
            </span>
          </div>

          {product.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-tight">
              {product.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 mt-2 text-xs">
            {product.preparationTime && (
              <div className="flex items-center gap-1 text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                <span>{product.preparationTime} min</span>
              </div>
            )}

            {product.subcategory && (
              <Badge variant="secondary" className="text-xs py-1 px-2">
                {product.subcategory}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <CardFooter className="p-3 border-t bg-muted/5 mt-auto">
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-9 text-xs font-medium transition-colors hover:bg-secondary/80"
            asChild
          >
            <Link href={`/dashboard/${businessId}/products/edit/${product.id}`} className="flex items-center justify-center">
              <Edit className="w-4 h-4 mr-1.5" />
              Edit
            </Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1 h-9 text-xs font-medium transition-colors"
            onClick={() => onDelete(product.id, product.name)}
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}