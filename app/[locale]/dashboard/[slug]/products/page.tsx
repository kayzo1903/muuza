import ProductList from "@/components/Dashboard/productList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Dashboard",
  description: "Manage your products and menu items",
};

export default function ProductsPage() {
  return (
    <main className="w-full min-h-screen">
      <ProductList />
    </main>
  );
}