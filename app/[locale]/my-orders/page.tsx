
import CustomerOrders from "@/components/profile/orders";
import Footer from "@/components/Footer/footer";
import AuthHeader from "@/components/Headers/SimpleHeader";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "orders",
};

export default function MyOrdersPage() {
  return (
    <main className="w-full">
      <AuthHeader />
      <CustomerOrders />
      <Footer />
    </main>
  );
}
