import FoodCategories from "@/components/shop/categories";
import NearbyBusinesses from "@/components/shop/nearby";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "shop",
};


export default function Shoppingpge() {
  return (
    <section className="min-h-screen w-full pt-28  lg:scroll-pt-4">
      <FoodCategories />
      <NearbyBusinesses />
    </section>
  );
}
