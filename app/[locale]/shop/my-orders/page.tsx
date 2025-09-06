
import Orders from "@/components/shop/myorder";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "my-orders",
};

export default function MyOrdersPage() {
  return (
    <main className="w-full pt-20">
      <Orders />
    </main>
  );
}
