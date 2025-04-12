import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppin = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Muuza",
  description: `Welcome to Muuza – Discover Local Food, Celebrate Culture!
Muuza is a platform that connects food lovers with local chefs, vendors, 
and home cooks offering authentic, cultural meals straight from their kitchen to your hands.
`,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={poppin.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
