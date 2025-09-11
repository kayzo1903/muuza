// app/api/product/[businessId]/delete/[productId]/route.ts

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ businessId: string; productId: string }> }
) {
  const { businessId, productId } = await params;

  try {
    // Authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify business ownership using raw SQL
    const businessOwnershipCheck = await db.execute(sql`
      SELECT id FROM business 
      WHERE id = ${businessId} AND owner_id = ${session.user.id}
    `);

    if (businessOwnershipCheck.rows.length === 0) {
      return NextResponse.json(
        { error: "Business not found or unauthorized" },
        { status: 404 }
      );
    }

    // Verify the product exists and belongs to this business
    const productCheck = await db.execute(sql`
      SELECT id FROM menu_item 
      WHERE id = ${productId} AND business_id = ${businessId}
    `);

    if (productCheck.rows.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // First, delete all images associated with the product
    await db.execute(sql`
      DELETE FROM menu_item_image 
      WHERE menu_item_id = ${productId}
    `);

    // Then delete the product itself
    const deleteResult = await db.execute(sql`
      DELETE FROM menu_item 
      WHERE id = ${productId} AND business_id = ${businessId}
      RETURNING id
    `);

    if (deleteResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
      deletedProductId: productId
    });

  } catch (error) {
    console.error("Product deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}