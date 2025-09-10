"use client";
import { useEffect, useState } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { ShoppingCart, DollarSign, Flame, BarChart } from "lucide-react";
import DashboardSkeleton from "./Analytic-dashboard-skeleton";

interface DashboardProps {
  businessId: string;
}

interface DashboardData {
  totalSales: number;
  totalOrders: number;
  topSelling: string;
  recentOrders: Array<{
    id: string;
    total: number;
    status: string;
    createdAt: string;
  }>;
}

export default function Dashboard({ businessId }: DashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`/api/dashboard/${businessId}/summary`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }
        
        const result = await res.json();
        
        setData(result);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [businessId]);

  if (loading) {
    return (
      <DashboardSkeleton />
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">
                Total Sales
              </CardTitle>
              <p className="text-2xl font-bold">
                TZS {data.totalSales.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">
                Total Orders
              </CardTitle>
              <p className="text-2xl font-bold">{data.totalOrders}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">
                Top Selling
              </CardTitle>
              <p className="text-xl font-bold truncate max-w-[120px]">
                {data.topSelling}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Flame className="w-5 h-5 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">
                Active Orders
              </CardTitle>
              <p className="text-2xl font-bold">
                {data.recentOrders.filter(order => 
                  ['pending', 'confirmed', 'preparing'].includes(order.status)
                ).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart className="w-5 h-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <CardTitle className="text-lg font-semibold mb-4 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Recent Orders
            </CardTitle>
            <div className="space-y-4">
              {data.recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No recent orders
                </p>
              ) : (
                data.recentOrders.map((order) => (
                  <div key={order.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium">Order #{order.id.slice(0, 8)}...</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Total: TZS {order.total.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <div className="text-muted-foreground text-xs mt-1">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <CardTitle className="text-lg font-semibold mb-4 flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              Performance Overview
            </CardTitle>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Average Order Value</span>
                <span className="font-medium">
                  TZS {data.totalOrders > 0 ? Math.round(data.totalSales / data.totalOrders).toLocaleString() : 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Conversion Rate</span>
                <span className="font-medium">12.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Customer Satisfaction</span>
                <span className="font-medium">4.2/5 ⭐</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}