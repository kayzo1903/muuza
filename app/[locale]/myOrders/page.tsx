
import Footer from "@/components/Footer/footer";
import { Metadata } from "next";
import AuthHeader from "@/components/Headers/SimpleHeader";
import CustomerOrdersPage from "@/components/customer/customerorderpage";

export const metadata: Metadata = {
  title: "orders",
};

export default function MyOrdersPage() {
  return (
    <main>
      <AuthHeader />
      <CustomerOrdersPage />
      <Footer />
    </main>
  );
}
