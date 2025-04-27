import FavouritePage from "@/components/customer/favorites";
import Footer from "@/components/Footer/footer";
import AuthHeader from "@/components/Headers/SimpleHeader";

export default function MyfavouritePage() {
  return (
    <main className="w-full">
      <AuthHeader />
      <FavouritePage />
      <Footer />
    </main>
  );
}
