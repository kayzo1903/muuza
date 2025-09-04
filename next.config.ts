import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**", // More specific pattern if needed
      },
      // Add other domains as needed
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // You might want to add these for better image optimization
    formats: ['image/webp', 'image/avif'],
  },
  // Optional: Add other optimization settings
  compress: true,
  poweredByHeader: false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);