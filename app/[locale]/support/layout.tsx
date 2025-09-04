import Footer from "@/components/Footer/footer";
import AuthHeader from "@/components/Headers/SimpleHeader";

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AuthHeader />
      {children} <Footer />
    </section>
  );
}
