
import { Wishlist } from "@/components/shop/wishlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "wishlist",
};

export default function WishlistPage() {
  return <main className="min-h-screen pt-20"><Wishlist /></main>;
}
