import Image from "next/image";
import Header from "../Header/Header";
import muuza from "@/public/Hero/litoon-dev-UphGuoCzSmw-unsplash.jpg";
import { useTranslations } from "next-intl";
import SearchFoods from "../PlaceInput/GooglMapsearch";

export default function Hero() {
  const t = useTranslations("HomePage"); // Use translation hook

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Header />

      {/* Background image */}
      <Image
        src={muuza}
        alt="Muuza background"
        fill
        priority
        placeholder="blur"
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Content aligned to left center */}
      <div className="px-4 relative z-10 flex flex-col items-start justify-center h-full text-left lg:px-20">
        <h1 className=" text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 max-w-3xl">
          {t("heroTitle")}
        </h1>
        <p className="text-md font-semibold sm:text-xl text-gray-700 mb-8">
          {t("heroDescription")}
        </p>
        <SearchFoods />
      </div>

  

      
    </section>
  );
}
