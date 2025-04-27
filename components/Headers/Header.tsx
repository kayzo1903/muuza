"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import logo from "@/public/logo/muuzalogo.png";
import { AlignLeft, X } from "lucide-react";
import { ModeToggle } from "../Mode-toggle";
import LocaleSwitcher from "../(lang)/LocaleSwitcher";
import { Button } from "../ui/button";
import AuthLinks from "../SideNavBar/Navigations";
import { Session } from "next-auth";
import NoauthLinks from "../SideNavBar/AuthNavs";

const Header = ({ session }: { session: Session | null }) => {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full mx-auto z-50 h-20 transition-shadow duration-300 py-2 ${
        isSticky ? "bg-white dark:bg-gray-950 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="px-4 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center justify-betweens space-x-4">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-gray-950 dark:text-gray-50"
          >
            <AlignLeft size={30} />
          </button>
          <Link href="/">
            <Image
              alt="Muuza logo"
              src={logo}
              priority
              height={28}
              width={112}
              className="h-auto w-56"
            />
          </Link>
        </div>

        <div
          className="flex items-center gap-8
         flex-nowrap"
        >
          {/* auth button */}
          <div className="gap-2 items-center flex-nowrap hidden lg:flex">
            <Button
              asChild
              className="bg-white text-black hover:text-white hover:dark:text-black "
            >
              <Link href="/auth">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth">Sign up</Link>
            </Button>
          </div>

          {/* mode toggle */}
          <div className="flex gap-6 flex-nowrap items-center">
            <LocaleSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Slide-in Nav from left with overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Side Nav */}
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
          {/* no auth links */}
          <nav>{session ? <AuthLinks session={session} /> : <NoauthLinks />}</nav>
          </div>
      </div>
    </header>
  );
};

export default Header;
