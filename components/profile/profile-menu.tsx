// components/profile/ProfileMenu.jsx
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  LogOut, 
  ShoppingBag, 
  Heart, 
  Store, 
  Settings, 
  HelpCircle, 
  MessageSquare, 
  MapPin,
  Star,
  User,
  Shield,
  Bell,
  CreditCard,
  Edit,
  Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserData } from "./interface";

// Profile menu items configuration
const menuItems = {
  account: [
    { id: "orders", label: "My Orders", icon: ShoppingBag, color: "text-yellow-600", badge: true },
    { id: "wishlist", label: "Wishlist", icon: Heart, color: "text-red-500", badge: true },
    { id: "addresses", label: "Saved Addresses", icon: MapPin, color: "text-blue-500" },
    { id: "payments", label: "Payment Methods", icon: CreditCard, color: "text-green-500" }
  ],
  settings: [
    { id: "profile", label: "Profile Settings", icon: User, color: "text-gray-600" },
    { id: "notifications", label: "Notifications", icon: Bell, color: "text-blue-500" },
    { id: "privacy", label: "Privacy & Security", icon: Shield, color: "text-purple-500" }
  ],
  support: [
    { id: "help", label: "Help Center", icon: HelpCircle, color: "text-blue-500" },
    { id: "contact", label: "Contact Support", icon: MessageSquare, color: "text-green-500" },
    { id: "feedback", label: "Give Feedback", icon: MessageSquare, color: "text-yellow-500" }
  ]
};


type ProfileMenuProps = {
  userData: UserData;
};

export default function ProfileMenu({ userData } : ProfileMenuProps) {
  const hasStore = !!userData?.store;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your account and preferences</p>
        </div>

        {/* User Profile Card */}
        <Card className="rounded-2xl shadow-lg mb-6 overflow-hidden">
          <CardHeader className="flex flex-col items-center text-center pb-4 relative mt-8">
            <div className="relative">
              <Avatar className="h-24 w-24 mb-4 border-4 border-white dark:border-gray-900">
                <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                <AvatarFallback className="bg-yellow-500 text-white text-xl">
                  {userData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                className="absolute bottom-4 right-0 h-8 w-8 rounded-full bg-yellow-500 hover:bg-yellow-600"
                onClick={() => console.log("Edit profile picture")}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              {userData.name}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">{userData.email}</p>
            {userData.phone && (
              <p className="text-gray-500 dark:text-gray-400 text-xs">{userData.phone}</p>
            )}
           
          </CardHeader>
        </Card>

        {/* Main Menu Card */}
        <Card className="rounded-2xl shadow-lg border-yellow-200 dark:border-gray-700">
          <CardContent className="p-6 space-y-4">
            {/* Account Section */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-yellow-600" />
                Account
              </h3>
              <div className="space-y-2">
                {menuItems.account.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link 
                      key={item.id} 
                      href={`/${item.id}`} 
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`h-5 w-5 ${item.color}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && userData.stats && (
                        <Badge variant="secondary" className={
                          item.id === "orders" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                        }>
                          {item.id === "orders" ? userData.stats.orders : userData.stats.wishlist}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Store Section */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Store className="h-4 w-4 text-green-600" />
                My Store
              </h3>
              {hasStore ? (
                <div className="space-y-2">
                  <Link href="/dashboard" className="flex items-center justify-between p-3 rounded-lg hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <Store className="h-5 w-5 text-green-600" />
                      <div>
                        <div>{userData.store.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {userData.store.rating} • {userData.store.totalSales} sales
                        </div>
                      </div>
                    </div>
                    {userData.store.pendingOrders > 0 && (
                      <Badge variant="destructive">{userData.store.pendingOrders}</Badge>
                    )}
                  </Link>
                </div>
              ) : (
                <Link href="/onboarding/create-store" className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                  <Plus className="h-5 w-5" />
                  <span>Create Your Store</span>
                </Link>
              )}
            </div>

            <Separator className="my-4" />

            {/* Settings Section */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-600" />
                Settings
              </h3>
              <div className="space-y-2">
                {menuItems.settings.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link 
                      key={item.id} 
                      href={`/${item.id}`} 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <IconComponent className={`h-5 w-5 ${item.color}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Support Section */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-600" />
                Support
              </h3>
              <div className="space-y-2">
                {menuItems.support.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link 
                      key={item.id} 
                      href={`/${item.id}`} 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <IconComponent className={`h-5 w-5 ${item.color}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Logout */}
            <Link href="/logout" className="flex items-center gap-3 p-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Link>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">App Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}