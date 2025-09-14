// app/api/product/[businessId]/edit/add-edit-product/[productId]/route.ts

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export async function PUT(
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

    // Parse form data
    const formData = await request.formData();
    
    // Extract form data
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string;
    const isAvailable = formData.get("isAvailable") === "true";
    const preparationTime = parseInt(formData.get("preparationTime") as string) || 0;
    
    // Parse arrays from JSON strings
    const ingredients = JSON.parse(formData.get("ingredients") as string || "[]");
    const dietaryInfo = JSON.parse(formData.get("dietaryInfo") as string || "[]");
    
    // Get images to delete
    const imagesToDelete = JSON.parse(formData.get("imagesToDelete") as string || "[]");
    
    // Get new image files (for development, we'll just store file names)
    const imageFiles = formData.getAll("images") as File[];

    // Validate required fields
    if (!name || !price || !category || !subcategory) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert price to minor units (cents) for storage
    const priceInCents = Math.round(price * 100);

    // Update the main product information
    await db.execute(sql`
      UPDATE menu_item 
      SET 
        name = ${name},
        description = ${description || null},
        price = ${priceInCents},
        category = ${category},
        subcategory = ${subcategory},
        is_available = ${isAvailable},
        preparation_time = ${preparationTime},
        ingredients = ${JSON.stringify(ingredients)}::jsonb,
        dietary_info = ${JSON.stringify(dietaryInfo)}::jsonb,
        updated_at = NOW()
      WHERE id = ${productId} AND business_id = ${businessId}
    `);

    // Handle image deletions
    if (imagesToDelete.length > 0) {
      await db.execute(sql`
        DELETE FROM menu_item_image 
        WHERE menu_item_id = ${productId} 
        AND url = ANY(${imagesToDelete})
      `);
    }

    // Handle new image uploads (for development, we'll just store file names)
    if (imageFiles.length > 0) {
      // Get current max sort_order to append new images
      const maxSortOrderResult = await db.execute(sql`
        SELECT COALESCE(MAX(sort_order), 0) as max_sort_order 
        FROM menu_item_image 
        WHERE menu_item_id = ${productId}
      `);
      
      const maxSortOrderRaw = maxSortOrderResult.rows[0]?.max_sort_order;
      const maxSortOrder = typeof maxSortOrderRaw === "number" ? maxSortOrderRaw : parseInt(maxSortOrderRaw as string) || 0;
      
      // Insert new images
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        // For development, we'll just store the file name as a placeholder URL
        const placeholderUrl = `/uploads/${file.name}`;
        const sortOrder = maxSortOrder + i + 1;
        const isPrimary = i === 0 && imagesToDelete.length > 0; // Make first new image primary if we deleted some
        
        await db.execute(sql`
          INSERT INTO menu_item_image (menu_item_id, url, sort_order, is_primary)
          VALUES (${productId}, ${placeholderUrl}, ${sortOrder}, ${isPrimary})
        `);
      }
    }

    // Fetch the updated product with images to return
    const updatedProductResult = await db.execute(sql`
      SELECT 
        id, name, description, price, category, subcategory,
        is_available, preparation_time, ingredients, dietary_info,
        created_at, updated_at, business_id
      FROM menu_item 
      WHERE id = ${productId}
    `);

    const updatedProduct = updatedProductResult.rows[0];

    // Fetch all images for the product
    const imagesResult = await db.execute(sql`
      SELECT url 
      FROM menu_item_image 
      WHERE menu_item_id = ${productId}
      ORDER BY is_primary DESC, sort_order ASC, created_at ASC
    `);

    const images = imagesResult.rows.map((row) => (row as Record<string, unknown>)["url"] as string);

    // Format the response
    const productData = {
      id: updatedProduct.id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: Number(updatedProduct.price) / 100, // Convert back to major units
      category: updatedProduct.category,
      subcategory: updatedProduct.subcategory,
      isAvailable: updatedProduct.is_available,
      preparationTime: updatedProduct.preparation_time,
      ingredients: updatedProduct.ingredients || [],
      dietaryInfo: updatedProduct.dietary_info || [],
      createdAt: updatedProduct.created_at,
      updatedAt: updatedProduct.updated_at,
      images: images,
      businessId: updatedProduct.business_id,
    };

    return NextResponse.json({
      message: "Product updated successfully",
      product: productData
    });

  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}