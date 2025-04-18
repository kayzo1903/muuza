// app/dashboard/orders/page.tsx

"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const fakeOrders = [
  {
    id: "ORD123",
    customer: "Alice",
    phone: "+254712345678",
    address: "123 Biryani Lane, Nairobi",
    date: "2025-04-15",
    amount: "Ksh 3,000",
    status: "Pending",
    items: [
      { name: "Chicken Biryani", quantity: 2, price: 1000 },
      { name: "Samosa", quantity: 4, price: 250 },
    ],
  },
  {
    id: "ORD124",
    customer: "Bob",
    phone: "+254798765432",
    address: "789 Burger Ave, Mombasa",
    date: "2025-04-14",
    amount: "Ksh 5,000",
    status: "Completed",
    items: [
      { name: "Beef Burger", quantity: 3, price: 1500 },
      { name: "Fries", quantity: 2, price: 500 },
    ],
  },
  {
    id: "ORD125",
    customer: "Jane",
    phone: "+254700112233",
    address: "456 Veg Street, Kisumu",
    date: "2025-04-12",
    amount: "Ksh 1,500",
    status: "Cancelled",
    items: [
      { name: "Veg Pizza", quantity: 1, price: 1500 },
    ],
  },
];

const statusColor = {
  Pending: "bg-yellow-200 text-yellow-800",
  Completed: "bg-green-200 text-green-800",
  Cancelled: "bg-red-200 text-red-800",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(fakeOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof fakeOrders[0] | null>(null);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setSelectedOrder((prev) => prev && { ...prev, status: newStatus });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" /> Orders
        </h1>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        statusColor[order.status as keyof typeof statusColor]
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Order Details</DialogTitle>
                        </DialogHeader>
                        {selectedOrder && selectedOrder.id === order.id && (
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Order ID: {selectedOrder.id}</p>
                              <p>Customer: {selectedOrder.customer}</p>
                              <p>Phone: {selectedOrder.phone}</p>
                              <p>Address: {selectedOrder.address}</p>
                              <p>Date: {selectedOrder.date}</p>
                              <p>Status: {selectedOrder.status}</p>
                            </div>
                            <div>
                              <label className="font-medium">Update Status</label>
                              <Select
                                value={selectedOrder.status}
                                onValueChange={(value) => updateOrderStatus(order.id, value)}
                              >
                                <SelectTrigger className="w-[200px]">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Pending">Pending</SelectItem>
                                  <SelectItem value="Completed">Completed</SelectItem>
                                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <h4 className="font-semibold">Items</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {selectedOrder.items.map((item, index) => (
                                  <li key={index}>
                                    {item.quantity}x {item.name} — Ksh {item.price}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <p className="font-bold">Total: {selectedOrder.amount}</p>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
