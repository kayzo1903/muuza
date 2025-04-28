import Help from "@/components/Dashboard/help";
import Footer from "@/components/Footer/footer";
import AuthHeader from "@/components/Headers/SimpleHeader";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "support",
  };

export default function HelpPage() {
  return (
    <main className="w-full">
      <AuthHeader />
      <Help />
      <Footer />
    </main>
  );
}
