"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Home,
  ChevronRight,
  CheckCircle,
  XCircle,
  Truck,
  ChefHat,
  ShoppingBag,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* --------------------------
   1. Types
--------------------------- */
type OrderStatus = "preparing" | "on_the_way" | "delivered" | "cancelled";

interface Order {
  id: string;
  status: OrderStatus;
  total: string;
  orderDate: string;
  estimatedDelivery?: string;
  deliveryAddress: string;
  paymentMethod: string;
  deliveryPerson?: {
    name: string;
    phone: string;
  };
  items: {
    id: number;
    name: string;
    image: string;
    price: string;
    quantity: number;
    restaurant: string;
  }[];
}

/* --------------------------
   2. Mock Data
--------------------------- */
const mockOrders: Order[] = [
  {
    id: "ORD-12345",
    status: "delivered",
    orderDate: "2023-10-15T14:30:00Z",
    deliveryAddress: "123 Main Street, Dar es Salaam",
    paymentMethod: "Mobile Money",
    total: "TZS 19,000",
    deliveryPerson: {
      name: "John Michael",
      phone: "+255 123 456 789",
    },
    items: [
      {
        id: 1,
        name: "Nyama Choma",
        image: "/foods/nyama.jpg",
        price: "TZS 12,000",
        quantity: 1,
        restaurant: "Grill Masters",
      },
      {
        id: 10,
        name: "Ice Cream",
        image: "/foods/icecream.jpg",
        price: "TZS 3,500",
        quantity: 2,
        restaurant: "Sweet Treats",
      },
    ],
  },
  {
    id: "ORD-12346",
    status: "on_the_way",
    orderDate: "2023-10-16T12:15:00Z",
    estimatedDelivery: "2023-10-16T13:00:00Z",
    deliveryAddress: "456 Ocean Road, Dar es Salaam",
    paymentMethod: "Credit Card",
    total: "TZS 16,500",
    deliveryPerson: {
      name: "Sarah James",
      phone: "+255 987 654 321",
    },
    items: [
      {
        id: 8,
        name: "Pizza",
        image: "/foods/pizza.jpg",
        price: "TZS 15,000",
        quantity: 1,
        restaurant: "Italiano Corner",
      },
    ],
  },
  {
    id: "ORD-12347",
    status: "preparing",
    orderDate: "2023-10-16T13:30:00Z",
    estimatedDelivery: "2023-10-16T14:30:00Z",
    deliveryAddress: "789 Market Street, Dar es Salaam",
    paymentMethod: "Cash on Delivery",
    total: "TZS 18,800",
    items: [
      {
        id: 3,
        name: "Nyama Choma",
        image: "/foods/nyama.jpg",
        price: "TZS 12,000",
        quantity: 1,
        restaurant: "Grill Masters",
      },
      {
        id: 6,
        name: "Biriani",
        image: "/foods/biryani.jpg",
        price: "TZS 6,800",
        quantity: 1,
        restaurant: "Sultan's Feast",
      },
    ],
  },
  {
    id: "ORD-12348",
    status: "cancelled",
    orderDate: "2023-10-14T18:20:00Z",
    deliveryAddress: "101 Beach Road, Dar es Salaam",
    paymentMethod: "Mobile Money",
    total: "TZS 9,500",
    items: [
      {
        id: 5,
        name: "Samaki Wa Kupaka",
        image: "/foods/samaki.jpg",
        price: "TZS 8,500",
        quantity: 1,
        restaurant: "Ocean Breeze",
      },
    ],
  },
];

/* --------------------------
   3. Status Config
--------------------------- */
const orderStatusConfig: Record<
  OrderStatus,
  {
    title: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    progress: number;
  }
> = {
  preparing: {
    title: "Preparing",
    icon: ChefHat,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    progress: 30,
  },
  on_the_way: {
    title: "On the Way",
    icon: Truck,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    progress: 70,
  },
  delivered: {
    title: "Delivered",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100",
    progress: 100,
  },
  cancelled: {
    title: "Cancelled",
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-100",
    progress: 0,
  },
};

/* --------------------------
   4. Component
--------------------------- */
export default function Orders() {
  const [activeTab, setActiveTab] = useState<"all" | OrderStatus>("all");

  // Filter based on tab
  const filteredOrders =
    activeTab === "all"
      ? mockOrders
      : mockOrders.filter((order) => order.status === activeTab);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1">
          <li>
            <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600">
              <Home className="w-4 h-4 mr-2" /> Home
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="ml-1 text-gray-500">My Orders</span>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-500" /> My Orders
          </h1>
          <p className="text-gray-600 mt-1">Track and manage your food orders</p>
        </div>
        <Link href="/shop/dishes">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Order Food
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-8">
        {[
          { key: "all", label: "All Orders" },
          { key: "preparing", label: "Preparing", icon: ChefHat },
          { key: "on_the_way", label: "On the Way", icon: Truck },
          { key: "delivered", label: "Delivered", icon: CheckCircle },
          { key: "cancelled", label: "Cancelled", icon: XCircle },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as "all" | OrderStatus)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 ${
              activeTab === key ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />} {label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center py-12 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">No orders found</h2>
          <p className="text-gray-600 mb-6">
            {activeTab === "all"
              ? "You haven't placed any orders yet."
              : `You don't have any ${orderStatusConfig[activeTab as OrderStatus]?.title.toLowerCase()} orders.`}
          </p>
          <Link href="/shop/dishes">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Browse Menu
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const StatusIcon = orderStatusConfig[order.status].icon;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-5 rounded-2xl shadow-md border border-gray-200">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Order {order.id}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${orderStatusConfig[order.status].bgColor} ${orderStatusConfig[order.status].color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {orderStatusConfig[order.status].title}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Ordered on{" "}
                        {new Date(order.orderDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{order.total}</p>
                      <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  {(order.status === "preparing" || order.status === "on_the_way") && (
                    <div className="mb-5">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Order placed</span>
                        <span>
                          ETA:{" "}
                          {new Date(order.estimatedDelivery!).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-yellow-500 h-2.5 rounded-full"
                          style={{ width: `${orderStatusConfig[order.status].progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Items */}
                  <div className="mb-5">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center py-3 border-b border-gray-100 last:border-0"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/foods/default.jpg";
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.restaurant}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.price}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {order.deliveryAddress}
                      </div>
                      {order.deliveryPerson && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Truck className="w-4 h-4 mr-2" />
                          {order.deliveryPerson.name}
                          <a
                            href={`tel:${order.deliveryPerson.phone}`}
                            className="ml-3 flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <Phone className="w-4 h-4 mr-1" /> Call
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(order.status === "preparing" || order.status === "on_the_way") && (
                        <>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Support
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Cancel Order
                          </Button>
                        </>
                      )}

                      <Button variant="outline" size="sm">
                        View Details
                      </Button>

                      {order.status === "delivered" && (
                        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
