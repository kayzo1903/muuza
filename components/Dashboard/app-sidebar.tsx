"use client";
import { Sidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Store,
  LogOut,
  HelpCircle,
  ListOrdered,
  ChevronDown,
  ChevronRight,
  Settings,
  BarChart3,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LocaleSwitcher from "../(lang)/LocaleSwitcher";
import { ModeToggle } from "../Mode-toggle";
import { useState } from "react";

// Main navigation links
const mainNavLinks = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Orders", href: "/dashboard/orders", icon: ListOrdered },
  { title: "Products", href: "/dashboard/products", icon: Package },
  { title: "My Store", href: "/dashboard/store", icon: Store },
];

// Additional navigation sections (collapsible)
const additionalSections = [
  {
    title: "Analytics",
    icon: BarChart3,
    links: [
      { title: "Sales Report", href: "/dashboard/analytics/sales" },
      { title: "Customer Insights", href: "/dashboard/analytics/customers" },
      { title: "Product Performance", href: "/dashboard/analytics/products" },
    ]
  },
  {
    title: "Customer Management",
    icon: Users,
    links: [
      { title: "All Customers", href: "/dashboard/customers" },
      { title: "Reviews", href: "/dashboard/customers/reviews" },
      { title: "Messages", href: "/dashboard/customers/messages" },
    ]
  }
];

// Bottom navigation links
const bottomNavLinks = [
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
  { title: "Help Center", href: "/dashboard/help", icon: HelpCircle },
  { title: "Back to Shop", href: "/shop", icon: LogOut },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  return (
    <Sidebar>
      <aside className="h-screen w-64 border-r bg-background flex flex-col">
        {/* Header with user info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Image
              src={"/avatar/default.png"}
              alt="User Avatar"
              width={48}
              height={48}
              className="rounded-full object-cover border border-gray-300 dark:border-zinc-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-foreground truncate">
                Quest
              </p>
              <p className="text-sm text-muted-foreground truncate">
                Seller Account
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-1">
            {mainNavLinks.map(({ title, href, icon: Icon }) => {
              const isActive = pathname === href || 
                (href === '/dashboard/orders' && pathname.startsWith('/dashboard/orders')) ||
                (href === '/dashboard/products' && pathname.startsWith('/dashboard/products'));
                
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground group",
                    isActive 
                      ? "bg-primary/10 text-primary border-r-2 border-primary" 
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{title}</span>
                  {title === "Orders" && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  )}
                </Link>
              );
            })}
            
            {/* Quick Action Button */}
            <Link
              href="/dashboard/products/add"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mt-4"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add New Product</span>
            </Link>
          </div>

          {/* Additional Sections */}
          <div className="mt-6 space-y-1">
            {additionalSections.map((section) => {
              const isExpanded = expandedSections[section.title];
              const hasActiveChild = section.links.some(link => 
                pathname === link.href || pathname.startsWith(link.href)
              );
              
              return (
                <div key={section.title}>
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={cn(
                      "flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      hasActiveChild ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{section.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-8 mt-1 space-y-1">
                      {section.links.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(link.href);
                        
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                              isActive 
                                ? "text-primary font-medium" 
                                : "text-muted-foreground"
                            )}
                          >
                            {link.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t">
          <div className="space-y-1">
            {bottomNavLinks.map(({ title, href, icon: Icon }) => {
              const isActive = pathname === href;
              
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{title}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Theme and Language Switchers */}
          <div className="flex items-center justify-between mt-4 px-1">
            <LocaleSwitcher />
            <ModeToggle />
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center mt-4 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span>Online</span>
          </div>
        </div>
      </aside>
    </Sidebar>
  );
}