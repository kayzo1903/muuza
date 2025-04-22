import Footer from "@/components/Footer/footer";
import ShopHeaderWrapper from "@/components/Headers/ShopHeaderWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
      <ShopHeaderWrapper />
      {children}
      <Footer />
    </main>
  );
}
