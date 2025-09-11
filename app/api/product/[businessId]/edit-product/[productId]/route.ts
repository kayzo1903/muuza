import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";


export async function GET(
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

    // Fetch the product details
    const productQuery = sql`
      SELECT 
        id, name, description, price, category, subcategory,
        is_available, preparation_time, ingredients, dietary_info,
        created_at, updated_at, business_id
      FROM menu_item 
      WHERE id = ${productId} AND business_id = ${businessId}
    `;

    const productResult = await db.execute(productQuery);
    
    if (productResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const product = productResult.rows[0];

    // Fetch all images for the product
    const imagesQuery = sql`
      SELECT url 
      FROM menu_item_image 
      WHERE menu_item_id = ${productId}
      ORDER BY is_primary DESC, sort_order ASC, created_at ASC
    `;

    const imagesResult = await db.execute(imagesQuery);
    const images = imagesResult.rows.map((row) => (row as Record<string, unknown>)["url"] as string);

    // Format the response to match your schema field names
    const productData = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price, // This is in minor units (cents)
      category: product.category,
      subcategory: product.subcategory,
      isAvailable: product.is_available,
      preparationTime: product.preparation_time,
      ingredients: product.ingredients || [],
      dietaryInfo: product.dietary_info || [],
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      images: images,
      businessId: product.business_id,
    };

    return NextResponse.json(productData);

  } catch (error) {
    console.error("Product fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}