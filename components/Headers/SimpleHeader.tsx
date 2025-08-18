"use client";

import { Link } from "@/i18n/routing";


export default function AuthHeader() {
  return (
    <header className="w-full pt-8 pr-4 bg-green-600 dark:bg-green-900 rounded-b-4xl h-20">
      <div className="flex justify-between items-center relative">
        {/* Center: Logo (centered on mobile, left-aligned on desktop) */}
        <div className="absolute left-1/2 transform -translate-x-1/2  lg:transform-none">
          <Link href="/" className="text-4xl font-semibold text-white">
            muuza
          </Link>
        </div>
      </div>
    </header>
  );
}
