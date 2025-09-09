import Dashboard from "@/components/Dashboard/dashabord";
import DashboardSkeleton from "@/components/Dashboard/dashboadloading";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "dashboard",
};

type Params = Promise<{ slug: string }>

export default async function ManagementProductPage(props : { params: Params }) {
   const params = await props.params
   const slug = params.slug   
   
  return (
    <main className="w-full px-6">
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard businessId={slug} />
      </Suspense>
    </main>
  );
}
