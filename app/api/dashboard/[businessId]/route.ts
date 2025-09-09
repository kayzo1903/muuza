import { db } from "@/db";
import { order } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{businessId: string }> }
) {
  const { businessId } = await params;

  try {
    // Authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify business ownership
    const userBusiness = await db.query.business.findFirst({
      where: (business, { eq, and }) =>
        and(eq(business.id, businessId), eq(business.ownerId, session.user.id)),
    });

    if (!userBusiness) {
      return NextResponse.json(
        { error: "Business not found or unauthorized" },
        { status: 404 }
      );
    }

    // Parallel queries
    const [totalSales, totalOrders, topSelling, recentOrdersData] =
      await Promise.all([
        db.execute(
          sql`SELECT SUM(total_amount) as total FROM "order" WHERE business_id = ${businessId}`
        ),

        db.execute(
          sql`SELECT COUNT(*) as count FROM "order" WHERE business_id = ${businessId}`
        ),

        db.execute(sql`
        SELECT mi.name, SUM(oi.quantity) as total_sold
        FROM order_item oi
        JOIN "order" o ON oi.order_id = o.id
        JOIN menu_item mi ON oi.menu_item_id = mi.id
        WHERE o.business_id = ${businessId}
        GROUP BY mi.name
        ORDER BY total_sold DESC
        LIMIT 1
      `),

        db
          .select({
            id: order.id,
            total: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt,
          })
          .from(order)
          .where(eq(order.businessId, businessId))
          .orderBy(desc(order.createdAt))
          .limit(5),
      ]);

    return NextResponse.json({
      totalSales: Number(totalSales.rows[0]?.total) || 0,
      totalOrders: Number(totalOrders.rows[0]?.count) || 0,
      topSelling: topSelling.rows[0]?.name || "No data",
      recentOrders: recentOrdersData,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
