import { db } from "@/db";
import { menuItem, menuItemImage } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
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

const products = await db
  .select({
    id: menuItem.id,
    name: menuItem.name,
    description: menuItem.description,
    price: menuItem.price,
    category: menuItem.category,
    subcategory: menuItem.subcategory,
    isAvailable: menuItem.isAvailable,
    preparationTime: menuItem.preparationTime,
    ingredients: menuItem.ingredients,
    dietaryInfo: menuItem.dietaryInfo,
    createdAt: menuItem.createdAt,
    updatedAt: menuItem.updatedAt,
    imageUrl: menuItemImage.url,
  })
  .from(menuItem)
  .where(eq(menuItem.businessId, businessId))
  .leftJoin(
    menuItemImage,
    () =>
      eq(menuItem.id, menuItemImage.menuItemId) &&
      eq(menuItemImage.isPrimary, true)
  )
  .orderBy(desc(menuItem.createdAt));


    return NextResponse.json({ products });

  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}