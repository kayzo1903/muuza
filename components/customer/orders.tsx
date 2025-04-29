// app/shop/customer-orders/page.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const dummyCustomerOrders = [
  {
    id: "o1",
    productName: "Chicken Biryani",
    businessName: "Mama John's Kitchen",
    price: 8000,
    quantity: 1,
    status: "Pending",
    date: "2025-04-25",
  },
  {
    id: "o2",
    productName: "Chapati & Beans",
    businessName: "Swahili Tamu",
    price: 3000,
    quantity: 2,
    status: "Delivered",
    date: "2025-04-20",
  },
];

export default function CustomerOrders() {
  return (
    <div className="px-6 pt-20 space-y-6 h-screen">
      <h1 className="text-2xl font-bold">My Orders</h1>

      {dummyCustomerOrders.length === 0 ? (
        <p className="text-muted-foreground">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {dummyCustomerOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md">
              <CardHeader>
                <CardTitle>{order.productName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  From: {order.businessName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Ordered on: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-sm">Quantity: {order.quantity}</p>
                <p className="text-sm font-semibold">
                  Total: TZS {(order.price * order.quantity).toLocaleString()}
                </p>
                <Separator />
                <p className={`text-sm ${order.status === "Delivered" ? "text-green-600" : "text-orange-500"}`}>
                  Status: {order.status}
                </p>

                {order.status === "Pending" && (
                  <Button variant="destructive" size="sm" className="mt-2">
                    Cancel Order
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
