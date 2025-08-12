import Footer from "@/components/Footer/footer";
import AuthHeader from "@/components/Headers/SimpleHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
      <AuthHeader />
      {children}
      <Footer />
    </main>
  );
}
