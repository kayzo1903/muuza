import { db } from "@/db";
import { order, user } from "@/db/schema";
import { eq, desc, and, like, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Status enum for type safety
const OrderStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PREPARING: "preparing",
  READY: "ready",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params;
  const { searchParams } = new URL(request.url);
  
  // Query parameters
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

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

    // Build where conditions
    const conditions = [eq(order.businessId, businessId)];
    
    if (status && status !== "all") {
      conditions.push(eq(order.status, status as OrderStatus));
    }
    
    if (search) {
      conditions.push(
        like(order.id, `%${search}%`)
      );
    }
    
    if (startDate && endDate) {
      conditions.push(
        sql`${order.createdAt} >= ${new Date(startDate).toISOString()} AND ${order.createdAt} <= ${new Date(endDate).toISOString()}`
      );
    }

    // Get total count for pagination
    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(order)
      .where(and(...conditions));

    const totalCount = totalCountResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;

    // Get orders with customer information
    const orders = await db
      .select({
        id: order.id,
        status: order.status,
        totalAmount: order.totalAmount,
        deliveryAddress: order.deliveryAddress,
        specialInstructions: order.specialInstructions,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        customer: {
          id: user.id,
          name: user.name,
          phone: user.phone_number,
        },
      })
      .from(order)
      .where(and(...conditions))
      .leftJoin(user, eq(order.userId, user.id))
      .orderBy(desc(order.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Orders API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
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

    const body = await request.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    // Verify the order belongs to this business
    const orderRecord = await db.query.order.findFirst({
      where: (order, { eq, and }) =>
        and(eq(order.id, orderId), eq(order.businessId, businessId)),
    });

    if (!orderRecord) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Update order status
    await db
      .update(order)
      .set({ 
        status: status as OrderStatus,
        updatedAt: new Date()
      })
      .where(eq(order.id, orderId));

    return NextResponse.json({ 
      message: "Order status updated successfully",
      orderId,
      newStatus: status
    });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}