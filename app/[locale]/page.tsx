import WhyMuuza from "@/components/Features/Features";
import Footer from "@/components/Footer/footer";
import Hero from "@/components/Hero/Hero";

export default async function Home() {



  return (
    <div className="w-full">
      <Hero />
      <WhyMuuza />
      <Footer />
    </div>
  );
}
