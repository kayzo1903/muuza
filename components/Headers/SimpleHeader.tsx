"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import logo from "@/public/logo/muuzalogo.png";
import LocaleSwitcher from "../(lang)/LocaleSwitcher";
import { ModeToggle } from "../Mode-toggle";

export default function AuthHeader() {
  return (
    <header className="w-full py-6 px-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="block">
          <Image
            alt="Muuza Logo"
            src={logo}
            width={150}
            height={40}
            priority
            className="h-auto w-auto"
          />
        </Link>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <ModeToggle/>
        </div>
      </div>
    </header>
  );
}
