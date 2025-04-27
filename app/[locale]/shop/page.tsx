import BrowsePage from "@/components/shop/Browsepage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "shop",
};

export default function Shoppingpge() {
  return (
    <section className="h-screen w-full pt-24 lg:pt-4">
      <BrowsePage />
    </section>
  );
}
