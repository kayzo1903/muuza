import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ businessId: string; orderId: string }> }
) {
  const { businessId, orderId } = await params;

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

    // Get order with details
    const orderDetails = await db.query.order.findFirst({
      where: (order, { eq, and }) =>
        and(eq(order.id, orderId), eq(order.businessId, businessId)),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
            phone_number: true,
          },
        },
        items: {
          with: {
            menuItem: {
              columns: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });

    if (!orderDetails) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(orderDetails);
  } catch (error) {
    console.error("Order details API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}