"use client";

import { SidebarTrigger } from "../ui/sidebar";

type Business = {
  id: string;
  name: string;
  address?: string;
  ownerId: string;
};

export default function Dashboardheader({ business }: { business: Business }) {
  return (
    <div className="p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">📍 {business.name}</h1>
          <p className="text-muted-foreground text-center">
            Welcome back to your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
