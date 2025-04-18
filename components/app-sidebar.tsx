"use client";
import { Sidebar } from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";
import userAvatar from "@/public/others/user_avatar.png";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Store,
  LogOut,
  ShoppingCart,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Optional: if you use a cn helper
import Image from "next/image";
import LocaleSwitcher from "./(lang)/LocaleSwitcher";
import { ModeToggle } from "./Mode-toggle";

const navLinks = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Add Product", href: "/dashboard/products/add", icon: PlusCircle },
  { title: "My Products", href: "/dashboard/products", icon: Package },
  { title: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { title: "My Store", href: "/dashboard/store", icon: Store }, // Replace 'my-store' dynamically later
  { title: "Help", href: "/dashboard/help", icon: HelpCircle },
  { title: "Exit", href: "/shop", icon: LogOut },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <aside className="h-screen w-64 border-r bg-background p-4 flex flex-col">
        <nav className="flex flex-col space-y-2 pl-3 mt-4">
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
                Quest
              </p>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Welcome back
              </p>
            </div>
          </div>
          {navLinks.map(({ title, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-2xl font-semibold text-gray-700 dark:text-gray-50 transition hover:bg-muted",
                  isActive && "bg-muted text-primary"
                )}
              >
                <Icon className="h-6 w-6" />
                <span>{title}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-4">
          <LocaleSwitcher />
          <ModeToggle />
        </div>
      </aside>
    </Sidebar>
  );
}
