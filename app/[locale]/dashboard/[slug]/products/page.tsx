import ProductsPage from "@/components/Dashboard/ProductsPage";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "product",
};

export default function Products() {
  return (
    <main className="w-full min-h-screen">
      <ProductsPage />
    </main>
  );
}
