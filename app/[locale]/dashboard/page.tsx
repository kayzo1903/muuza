import Dashboard from "@/components/Dashboard/dashabord";
import DashboardSkeleton from "@/components/Dashboard/dashboadloading";
import { Suspense } from "react";

export default function ManagementProductPage() {
  return (
    <main className="w-full px-6">
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </main>
  );
}
