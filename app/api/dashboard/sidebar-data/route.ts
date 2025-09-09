// app/api/sidebar-data/route.ts
import { db } from "@/db";
import { business, user, order } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { eq, and, count } from "drizzle-orm";

export async function GET() {
  try {
    // Get the current logged-in user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user data
    const userData = await db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's businesses
    const userBusinesses = await db.query.business.findMany({
      where: eq(business.ownerId, userId),
    });

    // Get pending orders count for the first business (or all businesses)
    let pendingOrdersCount = 0;
    if (userBusinesses.length > 0) {
      const pendingOrdersResult = await db
        .select({ count: count() })
        .from(order)
        .where(
          and(
            eq(order.businessId, userBusinesses[0].id),
            eq(order.status, "pending")
          )
        );
      
      pendingOrdersCount = pendingOrdersResult[0]?.count || 0;
    }

    return NextResponse.json({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        image: userData.image,
        role: userData.role,
      },
      businesses: userBusinesses,
      pendingOrdersCount,
    });

  } catch (error) {
    console.error("Sidebar data fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}