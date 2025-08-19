"use client";

import { Link } from "@/i18n/routing";
import { ModeToggle } from "../Mode-toggle";
import LocaleSwitcher from "../(lang)/LocaleSwitcher";

export default function AuthHeader() {
  return (
    <header className="w-full bg-green-600 dark:bg-green-900 h-16 lg:h-20 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo - centered on mobile, left-aligned on desktop */}
        <div className="flex-1 lg:flex-none">
          <Link 
            href="/" 
            className="text-3xl font-bold text-white hover:opacity-90 transition-opacity block text-center lg:text-left"
            aria-label="Home"
          >
            muuza
          </Link>
        </div>

        {/* Right side controls - theme toggle always visible, locale switcher on desktop only */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LocaleSwitcher />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}