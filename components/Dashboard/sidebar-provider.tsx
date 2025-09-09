// components/sidebar/sidebar-data-provider.tsx
"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "./app-sidebar";

interface SidebarData {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
  };
  businesses: Array<{
    id: string;
    name: string;
    username: string;
    logo: string | null;
  }>;
  pendingOrdersCount: number;
}

export function SidebarDataProvider() {
  const [data, setData] = useState<SidebarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/dashboard/sidebar-data");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch sidebar data: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching sidebar data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-64 border-r bg-background flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    // Fallback to basic sidebar if data fetching fails
    return <AppSidebar userData={null} businesses={[]} pendingOrdersCount={0} />;
  }

  return (
    <AppSidebar 
      userData={data.user} 
      businesses={data.businesses} 
      pendingOrdersCount={data.pendingOrdersCount} 
    />
  );
}