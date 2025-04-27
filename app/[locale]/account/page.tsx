import MyAccount from "@/components/customer/manageAccount";
import Footer from "@/components/Footer/footer";
import AuthHeader from "@/components/Headers/SimpleHeader";

export default function ManageAccountPage() {
  return (
    <main>
      <AuthHeader />
      <MyAccount />
      <Footer />
    </main>
  );
}
