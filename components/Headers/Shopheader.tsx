"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import logo from "@/public/logo/muuzalogo.png";
import { AlignLeft, X } from "lucide-react";
import { ModeToggle } from "../Mode-toggle";
import LocaleSwitcher from "../(lang)/LocaleSwitcher";
import Addlocation from "../Addlocation/Addlocation";

const ShopHeader = () => {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-shadow duration-300 ${
        isSticky ? "bg-white dark:bg-gray-950 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 lg:px-20 py-3 space-y-3 lg:space-y-0">
        {/* Large screen layout */}
        <div className="hidden lg:flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-gray-950 dark:text-gray-50"
            >
              <AlignLeft size={26} />
            </button>
            <Link href="/">
              <Image
                alt="Muuza Logo"
                src={logo}
                height={28}
                width={112}
                className="h-auto w-40"
              />
            </Link>
          </div>

          <Addlocation />

          <input
            type="text"
            placeholder="Search for products, foods, etc."
            className="flex-1 max-w-md px-4 py-2 border border-border bg-background text-sm rounded-lg"
          />

          <LocaleSwitcher />
          <ModeToggle />
        </div>

        {/* Small screen layout */}
        <div className="lg:hidden flex items-center justify-between gap-4">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-gray-950 dark:text-gray-50"
          >
            <AlignLeft size={26} />
          </button>
          <Link href="/">
            <Image
              alt="Muuza Logo"
              src={logo}
              height={28}
              width={112}
              className="h-auto w-32"
            />
          </Link>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <ModeToggle />
          </div>
        </div>

        <div className="lg:hidden flex items-center justify-between gap-4">
          <Addlocation />
        </div>
      </div>

      <div className="lg:hidden">
        <input
          type="text"
          placeholder="Search for products, foods, etc."
          className="w-full px-4 py-2 border border-border bg-background text-sm rounded-lg"
        />
      </div>

      {/* Slide-in Sidebar Nav */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`
            absolute top-0 left-0 h-full w-full md:max-w-md bg-white dark:bg-gray-950 shadow-lg
            transform transition-transform duration-500 ease-in-out
            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 dark:text-white hover:text-black"
            >
              <X size={24} />
            </button>
          </div>
          <nav>
            {/* <nav>{session ? <AuthLinks session={session} /> : <NoauthLinks />}</nav> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
