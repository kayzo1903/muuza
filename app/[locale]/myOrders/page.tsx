
import Footer from "@/components/Footer/footer";
import { Metadata } from "next";
import AuthHeader from "@/components/Headers/SimpleHeader";
import CustomerOrdersPage from "@/components/customer/myOrders";
<<<<<<< HEAD

=======
>>>>>>> beedd2443a060ac0b83a315ac973410f0208854e



export const metadata: Metadata = {
  title: "orders",
};

export default function MyOrdersPage() {
  return (
    <main>
      <AuthHeader />
<<<<<<< HEAD
      <CustomerOrdersPage />
=======
     <CustomerOrdersPage />
>>>>>>> beedd2443a060ac0b83a315ac973410f0208854e
      <Footer />
    </main>
  );
}
