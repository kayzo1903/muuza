import FoodCategories from "@/components/shop/categories";
import FeaturedBusiness from "@/components/shop/features-bussiness";
import NearbyBusinesses from "@/components/shop/nearby";
import PopularChefs from "@/components/shop/popular-chiefs";
import PopularDishes from "@/components/shop/pupular-dishes";
import TodaysSpecial from "@/components/shop/today-special";
import TrendingNow from "@/components/shop/trending-now";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "shop",
};

export default function Shoppingpge() {
  return (
    <section className="min-h-screen w-full pt-32 pb-8  lg:pt-24 lg:scroll-pt-4">
      <FoodCategories />
      <NearbyBusinesses />
      <PopularDishes />
      <FeaturedBusiness />
      <TodaysSpecial />
      <TrendingNow />
      <PopularChefs />
    </section>
  );
}
