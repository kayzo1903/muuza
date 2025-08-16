"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Heart, ShoppingBag, User, LogOut, Store, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import LocaleSwitcher from "../(lang)/LocaleSwitcher";
import { ModeToggle } from "../Mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HeaderProps } from "@/lib/session-props";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "@/i18n/routing";

export default function ShopHeader({ session }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const [pending, setPending] = useState(false);

  const showSearch =
    pathname.startsWith("/en/shop") || pathname.startsWith("/sw/shop");
  const router = useRouter();

  // Sticky scroll effect
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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-shadow duration-300 bg-green-600 dark:bg-green-900 h-24 lg:h-16 rounded-bl-4xl lg:rounded-none ${
        isSticky ? "shadow-md" : "shadow-none"
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 lg:px-8 py-3">
        {/* Mobile: Navbar toggle */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenu(true)}
          >
            <Menu
              className={`h-6 w-6 ${isSticky ? "text-black" : "text-white"}`}
            />
          </Button>
        </div>

        {/* Logo */}
        <Link href="/" className="flex text-3xl font-semibold text-white">
          muuza
        </Link>

        {/* Desktop Search */}
        {showSearch && (
          <div className="hidden lg:block px-4 w-[480px] ">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-20 rounded-xl shadow-md bg-gray-50 dark:bg-gray-100 text-gray-900"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Right Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 text-gray-50 font-medium">
          <Link href="/orders">
            <ShoppingBag className={`h-6 w-6 `} />
          </Link>
          <Link href="/favourites">
            <Heart className={`h-6 w-6`} />
          </Link>

          <LocaleSwitcher />
          <ModeToggle />
        </div>

        <div className="hidden lg:block">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session.user.image ?? ""} />
                  <AvatarFallback>
                    {session.user.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button
                    disabled={pending}
                    onClick={handleSignout}
                    className="flex items-center gap-3 bg-red-500 text-white"
                  >
                    Log Out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/sign-in">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile: Profile / Auth */}
        <div className="lg:hidden">
          {session?.user ? (
            <Link href="/profile">
              <Avatar className="w-8 h-8">
                <AvatarImage src={session.user.image ?? ""} />
                <AvatarFallback>{session.user.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href="/auth/sign-in">
              <User className={`h-8 w-8`} />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search (below header) */}
      {showSearch && (
        <div className="lg:hidden absolute left-1/2 -translate-x-1/2 w-[90%] -bottom-6 ">
          <div className="relative ">
            <Input
              type="text"
              placeholder="Search products..."
              className="pr-20 rounded-xl shadow-md h-12 text-gray-900 bg-gray-50 dark:bg-gray-100"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Mobile Slide-in Sidebar */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileMenu(false)}
        />
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white  dark:bg-gray-900 shadow-lg transform transition-transform duration-500 ease-in-out ${
            mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileMenu(false)}
              className="text-gray-600 dark:text-white hover:text-black"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Info */}
          {session?.user ? (
            <div className="flex flex-col items-center gap-2 p-4 border-b">
              <Avatar className="w-10 h-10">
                <AvatarImage src={session.user.image ?? ""} />
                <AvatarFallback>{session.user.name?.[0] ?? ""}</AvatarFallback>
              </Avatar>
              <p className="font-medium">{session.user.name}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-4">
              <Link
                href="/auth/sign-in"
                className="bg-green-600 text-white hover:bg-green-700 flex items-center justify-center rounded-md px-4 py-2"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="flex items-center justify-center rounded-md border px-4 py-2 hover:bg-gray-100"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Nav Links */}
          {session?.user && (
            <nav className="flex flex-col p-4 gap-4">
              <Link
                href="/profile"
                className="flex items-center gap-3 text-gray-700 dark:text-gray-100 hover:text-green-600"
              >
                <User size={20} /> Profile
              </Link>
              <Link
                href="/orders"
                className="flex items-center gap-3 text-gray-700 dark:text-gray-100 hover:text-green-600"
              >
                <ShoppingBag size={20} /> Orders
              </Link>
              <Link
                href="/favourites"
                className="flex items-center gap-3 text-gray-700 dark:text-gray-100 hover:text-green-600"
              >
                <Heart size={20} /> Favorites
              </Link>
              <Link
                href="/get-store"
                className="flex items-center gap-3 text-gray-700 dark:text-gray-100 hover:text-green-600"
              >
                <Store size={20} /> Get your store
              </Link>
              <div className="flex gap-4 items-center">
                <LocaleSwitcher />
                <ModeToggle />
              </div>

              <Button
                disabled={pending}
                onClick={handleSignout}
                className="flex items-center gap-3 bg-red-500 text-white"
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
