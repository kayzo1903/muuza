"use client";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { ShoppingCart, DollarSign, Flame, BarChart } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8 w-full bg-green-400">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <CardTitle>Total Sales</CardTitle>
              <p className="text-2xl font-bold mt-2">TZS 1,250,000</p>
            </div>
            <DollarSign className="w-6 h-6 text-green-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <CardTitle>Total Orders</CardTitle>
              <p className="text-2xl font-bold mt-2">128</p>
            </div>
            <ShoppingCart className="w-6 h-6 text-blue-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <CardTitle>Top Selling</CardTitle>
              <p className="text-2xl font-bold mt-2">Chicken Chips</p>
            </div>
            <Flame className="w-6 h-6 text-orange-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <CardTitle>Total Products</CardTitle>
              <p className="text-2xl font-bold mt-2">35</p>
            </div>
            <BarChart className="w-6 h-6 text-purple-500" />
          </CardContent>
        </Card>
      </div>

      {/* 🧮 Daily/Weekly/Monthly Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <CardTitle>Today&apos;s Orders</CardTitle>
              <p className="text-2xl font-bold mt-2">7</p>
            </div>
            <ShoppingCart className="w-6 h-6 text-green-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <CardTitle>Month&apos;s Sales</CardTitle>
              <p className="text-2xl font-bold mt-2">TZS 2,340,000</p>
            </div>
            <DollarSign className="w-6 h-6 text-yellow-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <CardTitle>Week&apos;s Orders</CardTitle>
              <p className="text-2xl font-bold mt-2">42</p>
            </div>
            <BarChart className="w-6 h-6 text-blue-500" />
          </CardContent>
        </Card>
      </div>

      {/* 📥 Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4">
            <CardTitle className="mb-4">Recent Orders</CardTitle>

            <div className="space-y-4">
              {/* Order 1 */}
              <div>
                <div className="flex justify-between">
                  <div className="font-medium">Chips Kuku</div>
                  <div className="text-muted-foreground text-sm">5 mins ago</div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>Qty: 2</div>
                  <div>Total: TZS 10,000</div>
                </div>
              </div>

              {/* Order 2 */}
              <div>
                <div className="flex justify-between">
                  <div className="font-medium">Ugali Nyama</div>
                  <div className="text-muted-foreground text-sm">30 mins ago</div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>Qty: 1</div>
                  <div>Total: TZS 6,000</div>
                </div>
              </div>

              {/* Order 3 */}
              <div>
                <div className="flex justify-between">
                  <div className="font-medium">Burger & Juice</div>
                  <div className="text-muted-foreground text-sm">1 hr ago</div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>Qty: 1</div>
                  <div>Total: TZS 12,000</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
