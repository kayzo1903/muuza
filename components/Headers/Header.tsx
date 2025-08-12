"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import logo from "@/public/logo/muuzalogo.png";
import { AlignLeft, X } from "lucide-react";
import { ModeToggle } from "../Mode-toggle";
import LocaleSwitcher from "../(lang)/LocaleSwitcher";
import { Button } from "../ui/button";
import clsx from "clsx";

export default function Header() {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isSticky
          ? "bg-white dark:bg-gray-900 shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="px-4 lg:px-20 h-20 flex items-center justify-between">
        {/* Left: Logo + Menu button */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <AlignLeft size={26} className="text-gray-800 dark:text-gray-100" />
          </button>

          {/* Logo */}
          <Link href="/" className="block">
            <Image
              alt="Muuza logo"
              src={logo}
              priority
              height={28}
              width={140}
              className="h-auto w-auto"
            />
          </Link>
        </div>

        {/* Right: Desktop Links + Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-green-600 text-white hover:bg-green-700"
            >
              <Link href="/auth/sign-in">Login</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/auth/register">Sign up</Link>
            </Button>
          </div>

          <LocaleSwitcher />
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "fixed inset-0 z-40 transition-opacity duration-300",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={clsx(
            "absolute top-0 left-0 h-full w-4/5 max-w-xs bg-white dark:bg-gray-950 shadow-lg transform transition-transform duration-500 ease-in-out",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <X size={22} className="text-gray-800 dark:text-gray-100" />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col gap-4 px-6">
            <Button asChild variant="outline">
              <Link href="/auth/sign-in">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Sign up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
