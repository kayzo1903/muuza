import { db } from "@/db";
import { menuItemImage } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { asc, desc } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify business ownership
    const business = await db.query.business.findFirst({
      where: (business, { eq, and }) =>
        and(eq(business.id, businessId), eq(business.ownerId, session.user.id)),
    });

    if (!business) {
      return NextResponse.json(
        { error: "Business not found or access denied" },
        { status: 404 }
      );
    }

    // Fetch products with their images ordered by sortOrder
    const products = await db.query.menuItem.findMany({
      where: (item, { eq }) => eq(item.businessId, businessId),
      with: {
        images: {
          orderBy: (images: typeof menuItemImage) => [asc(images.sortOrder)],
        },
      },
      orderBy: (items) => [desc(items.createdAt)],
    });
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
