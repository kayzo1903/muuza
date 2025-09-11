"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Tag, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProductsSkeleton } from "./Productlistskeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import ProductCard from "./productlistcard";
import { toast } from "sonner";

export interface Product {
  rating: ReactNode;
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  subcategory: string | null;
  isAvailable: boolean;
  preparationTime: number | null;
  ingredients: string[] | null;
  dietaryInfo: string[] | null;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
}

export default function ProductList() {
  const params = useParams();
  const businessId = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Delete Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
  } | null>(null);

  /**
   * Fetch products for the business
   */
  const fetchProducts = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`/api/product/${businessId}/get-products`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [businessId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /**
   * Refresh product list
   */
  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  /**
   * Open delete confirmation dialog
   */
  const handleDeleteClick = (productId: string, productName: string) => {
    setSelectedProduct({ id: productId, name: productName });
    setIsDeleteDialogOpen(true);
  };

  /**
   * Confirm and delete product
   */
  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(
        `/api/product/${businessId}/delete/${selectedProduct.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast("failed to delete product", {
          description: "Check out your connection",
        });
        throw new Error(errorData.error || "Failed to delete product");
      }

      // Update state by removing the deleted product
      setProducts((prev) =>
        prev.filter((product) => product.id !== selectedProduct.id)
      );

      // Close dialog
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    } catch {
      toast("failed to delete product", {
        description: "Check out your connection",
      });
    }
  };

  /**
   * Cancel deletion
   */
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  /**
   * Group products by category
   */
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  /**
   * Loading state
   */
  if (loading) {
    return <ProductsSkeleton />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your menu items and categories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button asChild>
            <Link href={`/dashboard/${businessId}/products/add`}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Product Categories Grid */}
      <div className="space-y-8">
        {Object.entries(productsByCategory).map(
          ([category, categoryProducts]) => (
            <div key={category} className="space-y-4">
              {/* Category Header */}
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Tag className="w-5 h-5" />
                {category}
                <Badge variant="secondary" className="ml-2">
                  {categoryProducts.length} items
                </Badge>
              </h2>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    businessId={businessId}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            </div>
          )
        )}

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Tag className="w-12 h-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">No products yet</h3>
                <p className="text-muted-foreground">
                  Get started by adding your first menu item
                </p>
                <Button asChild>
                  <Link href={`/dashboard/${businessId}/products/add`}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Product
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={handleDeleteCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete &quot;
              {selectedProduct?.name}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
