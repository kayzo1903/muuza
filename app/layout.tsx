import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Poppins } from "next/font/google";
// components/not-found-layout.tsx

const poppin = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "700", "900"],
});

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppin.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
