"use client";


import {
  LogOut,
  Settings,
  Briefcase,
  HelpCircle,
  Heart,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import userAvatar from "@/public/others/user_avatar.png";

export default function AuthLinks() {

  return (
    <aside className="w-full h-screen shadow-xl flex flex-col justify-between p-6 pb-16">
      {/* Top section */}
      <div>
        {/* User Info */}
        <div className="flex items-center space-x-4 mb-8">
          <Image
            src={userAvatar}
            alt="User Avatar"
            width={68}
            height={68}
            className="rounded-full object-cover border border-gray-300 dark:border-zinc-700"
          />
          <div>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              John Doe
            </p>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Welcome back
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-8 text-gray-700 dark:text-gray-300 text-2xl font-semibold pt-16">
          <Link
            href="/account"
            className="flex items-center space-x-4 hover:text-black dark:hover:text-white"
          >
            <Settings size={36} />
            <span className="text-green-600">Manage Account</span>
          </Link>
          <Link
            href="/register-business"
            className="flex items-center space-x-4 hover:text-black dark:hover:text-white"
          >
            <Briefcase size={36} />
            <span>Register Business</span>
          </Link>
          <Link
            href="/orders"
            className="flex items-center space-x-4 hover:text-black dark:hover:text-white"
          >
            <ShoppingBag size={36} />
            <span>Orders</span>
          </Link>
          <Link
            href="/help"
            className="flex items-center space-x-4 hover:text-black dark:hover:text-white"
          >
            <HelpCircle size={36} />
            <span>Help</span>
          </Link>
          <Link
            href="/favourites"
            className="flex items-center space-x-4 hover:text-black dark:hover:text-white"
          >
            <Heart size={36} />
            <span>Favourites</span>
          </Link>
        </nav>
      </div>

      {/* Bottom section - Sign Out */}
      <Button className="h-16">
        <LogOut size={36} />
        <span className="text-xl">Sign Out</span>
      </Button>
    </aside>
  );
}
