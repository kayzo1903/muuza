"use client";

import React, { useState, useEffect } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { AlignLeft, X } from "lucide-react";
import { ModeToggle } from "../Mode-toggle";
import LocaleSwitcher from "../(lang)/LocaleSwitcher";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { HeaderProps } from "@/lib/session-props";

export default function Header({
  session,
}: {
  session: HeaderProps["session"];
}) {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [pending, setPending] = useState(false);
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
          setPending(true);
        },
        onError: () => {
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

  const userName = session?.user?.name || "User";
  const userImage = session?.user?.image || undefined;

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 rounded-bl-4xl lg:rounded-none",
        isSticky ? "bg-green-600 dark:bg-green-900 shadow-md" : "bg-transparent"
      )}
    >
      <div className="px-4 lg:px-20 h-20 flex items-center justify-between relative">
        {/* Left: Menu button (only on mobile) */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <AlignLeft size={26} className="text-gray-800 dark:text-gray-100" />
          </button>
        </div>

        {/* Center: Logo (centered on mobile, left-aligned on desktop) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:left-0 lg:transform-none">
          <Link href="/" className="text-3xl font-semibold text-white">
            muuza
          </Link>
        </div>

        {/* Right: Desktop Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-3">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={userImage} />
                      <AvatarFallback>{userName[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignout} disabled={pending}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
              </>
            )}
          </div>

          <div className="hidden lg:flex gap-4 items-center">
            <LocaleSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "fixed inset-0 z-40 transition-opacity duration-300",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={clsx(
            "absolute top-0 left-0 h-full w-4/5 max-w-xs bg-white dark:bg-gray-950 shadow-lg transform transition-transform duration-500 ease-in-out",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <X size={22} className="text-gray-800 dark:text-gray-100" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 px-6">
            {session?.user ? (
              <>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={userImage} />
                    <AvatarFallback>{userName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{userName}</span>
                </div>

                <div className="flex gap-4 items-center">
                  <LocaleSwitcher />
                  <ModeToggle />
                </div>

                <Button asChild variant="outline">
                  <Link href="/profile">Profile</Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleSignout}
                  disabled={pending}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div>
                <div className="flex gap-4 items-center">
                  <LocaleSwitcher />
                  <ModeToggle />
                </div>
                <Button asChild variant="outline">
                  <Link href="/auth/sign-in">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Sign up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
