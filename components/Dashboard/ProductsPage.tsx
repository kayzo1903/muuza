"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import ProductList from "./productList";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the product details below to add it to your inventory.
                You can always edit or remove it later.
              </DialogDescription>
            </DialogHeader>
            <ProductForm onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table Placeholder */}
      <div className="border rounded-md p-4 text-muted-foreground">
        <ProductList />
      </div>
    </div>
  );
}
