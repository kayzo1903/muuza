// app/api/user-data/route.ts
import { db } from "@/db";
import { user, business, order, favorite } from "@/db/schema";
import { eq, count, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get the current logged-in user from Better Auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch user details
    const userDetails = await db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    if (!userDetails) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch user's businesses
    const userBusinesses = await db.query.business.findMany({
      where: eq(business.ownerId, userId),
      orderBy: (business, { desc }) => [desc(business.createdAt)],
    });

    // Count user orders
    const orderCount = await db
      .select({ count: count() })
      .from(order)
      .where(eq(order.userId, userId));

    // Count user favorites (wishlist items)
    const favoriteCount = await db
      .select({ count: count() })
      .from(favorite)
      .where(eq(favorite.userId, userId));

    // Get primary business if exists
    const primaryBusiness = userBusinesses.length > 0 ? userBusinesses[0] : null;

    // Calculate pending orders for the primary business
    let pendingOrders = 0;
    let totalSales = 0;
    
    if (primaryBusiness) {
      const businessOrders = await db
        .select({ count: count(), total: sql<number>`sum(${order.totalAmount})` })
        .from(order)
        .where(
          sql`${order.businessId} = ${primaryBusiness.id} AND ${order.status} IN ('pending', 'confirmed', 'preparing')`
        );
      
      pendingOrders = businessOrders[0]?.count || 0;
      totalSales = businessOrders[0]?.total || 0;
    }

    // Transform data to match the expected structure
    const userData = {
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      avatarUrl: userDetails.image || "/avatars/default-user.jpg",
      phone: userDetails.phone_number || "",
      stats: {
        orders: orderCount[0]?.count || 0,
        wishlist: favoriteCount[0]?.count || 0,
        addresses: 0, // You might need to implement addresses table
      },
      store: primaryBusiness ? {
        id: primaryBusiness.id,
        name: primaryBusiness.name,
        pendingOrders,
        rating: primaryBusiness.rating,
        totalSales,
        isActive: primaryBusiness.isOpen && primaryBusiness.status === "open",
      } : null,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}