import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");

  const footerLinks = [
    { path: "#", name: `${t("about")}` },
    { path: "#", name: `${t("sell")}` },
    { path: "#", name: `${t("help")}` },
    { path: "/privacy-policy", name: `${"privacy policy"}` },
    { path: "/terms-of-service", name: `${"terms-of-service"}` },
    { path: "/blog", name: `${t("blog")}` },
  ];

  return (
    <footer className="pt-4 sm:pt-10 lg:pt-12 max-w-7xl mx-auto border-t px-4 md:px-8">
      <div className="flex flex-col items-center pt-6">
        {/* Navigation links */}
        <nav className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className="text-gray-500 transition duration-100 hover:text-skin active:text-skin"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} - muuza. {t("rightsReserved")}.
      </div>
    </footer>
  );
};

export default Footer;
