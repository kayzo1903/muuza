import FavouritePage from "@/components/profile/favorites";
import Footer from "@/components/Footer/footer";
import AuthHeader from "@/components/Headers/SimpleHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "favourites",
};

export default function MyfavouritePage() {
  return (
    <main className="w-full">
      <AuthHeader />
      <FavouritePage />
      <Footer />
    </main>
  );
}
