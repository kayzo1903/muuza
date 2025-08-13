"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import logo from "@/public/logo/muuzalogo.png";
import { AlignLeft, X, User, Heart, ShoppingBag, LogOut } from "lucide-react";
import { ModeToggle } from "../Mode-toggle";
import LocaleSwitcher from "../(lang)/LocaleSwitcher";
import Addlocation from "../Addlocation/Addlocation";
import { HeaderProps } from "@/lib/session-props";
import { signOut } from "@/lib/auth-client"; // Better Auth logout
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function ShopHeader({
  session,
}: {
  session: HeaderProps["session"];
}) {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [pending , setPending] = useState(true)
  const router = useRouter();
  

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
    async function handleSignout() {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setPending(true)
        } ,
        onError: (ctx) => {
          console.log(ctx.error.message);
          toast.error("Failed to sign out , check your connection");
        },
        onSuccess: () => {
          setPending(false);
          router.push("/auth/sign-in");
          toast.success("Signed out successfully");
        },
      },
    });
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-shadow duration-300 ${
        isSticky ? "bg-white dark:bg-gray-800 shadow-md" : "bg-transparent"
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
          className={`absolute top-0 left-0 h-full w-full md:max-w-md bg-white dark:bg-gray-950 shadow-lg transform transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 dark:text-white hover:text-black"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Info */}
          {session ? (
            <div className="flex flex-col items-center gap-2 p-4 border-b border-border">
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt={session.user.name || "User"}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <p className="font-medium">{session.user.name}</p>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 px-4">
              <Button
                className="bg-green-600 text-white hover:bg-green-700"
              >
                <Link href="/auth/sign-in">Login</Link>
              </Button>
              <Button >
                <Link href="/auth/register">Sign up</Link>
              </Button>
            </ div>
          )}

          {/* Nav Links */}
          {session && (
            <nav className="flex flex-col p-4 gap-4">
              <Link
                href="/profile"
                className="flex items-center gap-3 hover:text-blue-600"
              >
                <User size={20} /> Profile
              </Link>
              <Link
                href="/my-orders"
                className="flex items-center gap-3 hover:text-blue-600"
              >
                <ShoppingBag size={20} /> Orders
              </Link>
              <Link
                href="/favorites"
                className="flex items-center gap-3 hover:text-blue-600"
              >
                <Heart size={20} /> Favorites
              </Link>
              <Button
                disabled={pending}
                onClick={handleSignout}
                className="flex items-center gap-3 text-red-500 hover:text-red-700"
              >
                <LogOut size={20} /> Logout
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
