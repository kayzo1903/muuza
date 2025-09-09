import Dashboardheader from "@/components/Dashboard/header";
import { SidebarDataProvider } from "@/components/Dashboard/sidebar-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { db } from "@/db";
import { business } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Params = Promise<{ slug: string }>;

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { slug } = await params; // slug is actually the businessId

  // 1. Get logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return redirect(`/auth/sign-in`);
  }

  const userId = session.user.id;

  // 2. Fetch the business by its ID
  const businessData = await db.query.business.findFirst({
    where: and(eq(business.id, slug), eq(business.ownerId, userId)),
  });

  // 3. If no business found, redirect or show 404
  if (!businessData) {
    return redirect("/auth/sign-in"); // fallback to dashboard list
  }

  return (
    <SidebarProvider>
      <SidebarDataProvider />
      <main className="w-full">
        {/* Pass the business object to header */}
        <Dashboardheader business={businessData} />
        {children}
      </main>
    </SidebarProvider>
  );
}
