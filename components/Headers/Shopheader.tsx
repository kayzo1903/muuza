"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Heart,
  ShoppingBag,
  User,
  LogOut,
  Store,
  X,
  Loader2,
} from "lucide-react";
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
          toast.error("Failed to sign out, check your connection");
        },
        onSuccess: () => {
          setPending(false);
          router.push("/auth/sign-in");
          toast.success("Signed out successfully");
        },
      },
    });
  }

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-shadow duration-300 bg-green-600 dark:bg-green-900 h-16 lg:h-14 ${
        isSticky ? "shadow-md" : "shadow-none"
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 lg:px-8 h-full">
        {/* Mobile: Navbar toggle */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
            className="hover:bg-green-700 focus-visible:ring-white focus-visible:ring-offset-green-600"
          >
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:opacity-90 transition-opacity"
        >
          muuza
        </Link>

        {/* Desktop Search */}
        {showSearch && (
          <div className="hidden lg:block px-4 w-[480px]">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-20 rounded-xl shadow-md bg-gray-50 dark:bg-gray-100 text-gray-900 h-10"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-700 hover:bg-green-800 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Right Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 text-gray-50 font-medium">
          <Link
            href="/orders"
            className="p-1 rounded-md hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600 transition-colors"
            aria-label="Orders"
          >
            <ShoppingBag className="h-5 w-5 text-white" />
          </Link>
          <Link
            href="/favourites"
            className="p-1 rounded-md hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600 transition-colors"
            aria-label="Favorites"
          >
            <Heart className="h-5 w-5 text-white" />
          </Link>

          <LocaleSwitcher />
          <ModeToggle />

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer w-8 h-8 hover:ring-2 hover:ring-white">
                  <AvatarImage src={session.user.image ?? ""} />
                  <AvatarFallback>
                    {session.user.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-1">
                <DropdownMenuItem asChild className="p-0">
                  <Link
                    href="/profile"
                    className="px-2 py-1.5 w-full rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-0">
                  <Link
                    href="/settings"
                    className="px-2 py-1.5 w-full rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Settings
                  </Link>
                </DropdownMenuItem>
                <div className="border-t my-1 dark:border-gray-700"></div>
                <DropdownMenuItem className="p-0">
                  <Button
                    variant="ghost"
                    disabled={pending}
                    onClick={handleSignout}
                    className="w-full justify-start px-2 py-1.5 h-auto text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                  >
                    {pending && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    Log Out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/sign-in">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white bg-transparent hover:bg-white/10"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  size="sm"
                  className="bg-white text-green-600 hover:bg-white/90"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile: Profile / Auth */}
        <div className="lg:hidden">
          {session?.user ? (
            <Link href="/profile">
              <Avatar className="w-8 h-8 hover:ring-2 hover:ring-white">
                <AvatarImage src={session.user.image ?? ""} />
                <AvatarFallback>{session.user.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link
              href="/auth/sign-in"
              className="p-1 rounded-md hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600 transition-colors"
              aria-label="Sign in"
            >
              <User className="h-6 w-6 text-white" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search (below header) */}
      {showSearch && (
        <div className="lg:hidden px-4 pb-3 pt-1 w-full bg-green-600 dark:bg-green-900">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="pr-20 rounded-xl shadow-md h-10 text-gray-900 bg-gray-50 dark:bg-gray-100"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-lg text-sm"
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
          className={`absolute top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
            mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileMenu(false)}
              className="text-gray-600 dark:text-white hover:text-black dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Info */}
          {session?.user ? (
            <div className="flex flex-col items-center gap-2 p-4 border-b dark:border-gray-700">
              <Avatar className="w-14 h-14">
                <AvatarImage src={session.user.image ?? ""} />
                <AvatarFallback>{session.user.name?.[0] ?? ""}</AvatarFallback>
              </Avatar>
              <p className="font-medium text-lg">{session.user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {session.user.email}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-4 py-6">
              <div className="flex gap-4 items-center px-4 py-3">
                <LocaleSwitcher />
                <ModeToggle />
              </div>
              <div className="border-t my-2 dark:border-gray-700"></div>
              <Link
                href="/auth/sign-in"
                className="bg-green-600 text-white hover:bg-green-700 flex items-center justify-center rounded-md px-4 py-3 font-medium transition-colors"
                onClick={() => setMobileMenu(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="flex items-center justify-center rounded-md border px-4 py-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMobileMenu(false)}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Nav Links */}
          {session?.user && (
            <nav className="flex flex-col p-4 gap-1">
              <Link
                href="/profile"
                onClick={() => setMobileMenu(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md ${
                  isActive("/profile")
                    ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100"
                    : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition-colors`}
              >
                <User size={20} /> Profile
              </Link>
              <Link
                href="/orders"
                onClick={() => setMobileMenu(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md ${
                  isActive("/orders")
                    ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100"
                    : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition-colors`}
              >
                <ShoppingBag size={20} /> Orders
              </Link>
              <Link
                href="/favourites"
                onClick={() => setMobileMenu(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md ${
                  isActive("/favourites")
                    ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100"
                    : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition-colors`}
              >
                <Heart size={20} /> Favorites
              </Link>
              <Link
                href="/get-store"
                onClick={() => setMobileMenu(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md ${
                  isActive("/get-store")
                    ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100"
                    : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition-colors`}
              >
                <Store size={20} /> Get your store
              </Link>

              <div className="border-t my-2 dark:border-gray-700"></div>

              <div className="flex gap-4 items-center px-4 py-3">
                <LocaleSwitcher />
                <ModeToggle />
              </div>

              <Button
                disabled={pending}
                onClick={handleSignout}
                className="flex items-center gap-3 px-4 py-3 h-auto mt-2 bg-red-500 hover:bg-red-600 text-white"
              >
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                <LogOut size={20} /> Logout
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
