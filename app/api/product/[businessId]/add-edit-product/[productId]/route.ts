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
      SELECT id, name, category FROM menu_item 
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
    const name = (formData.get("name") as string)?.trim();
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
    
    // Get new image files
    const imageFiles = formData.getAll("images") as File[];

    // Validate required fields
    if (!name || !price || !category || !subcategory) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // --- DUPLICATE CHECK: Prevent naming conflict ---
    const existingProduct = productCheck.rows[0] as { name: string; category: string };
    
    // Only check for duplicates if the name or category has changed
    if (name !== existingProduct.name || category !== existingProduct.category) {
      const duplicateCheck = await db.execute(sql`
        SELECT id, name 
        FROM menu_item 
        WHERE business_id = ${businessId} 
          AND category = ${category}
          AND name = ${name}
          AND id != ${productId}  -- Exclude the current product being edited
        LIMIT 1
      `);

      if (duplicateCheck.rows.length > 0) {
        const duplicateProduct = duplicateCheck.rows[0] as { id: string; name: string };
        
        // Fetch the duplicate product details for better error message
        const duplicateDetails = await db.execute(sql`
          SELECT mi.name, mi.price, mi.image_url
          FROM menu_item mi
          WHERE mi.id = ${duplicateProduct.id}
        `);
        
        const duplicate = duplicateDetails.rows[0] as { name: string; price: number; image_url?: string };
        
        return NextResponse.json(
          {
            error: "A product with this name already exists in this category.",
            duplicate: true,
            existingProduct: {
              id: duplicateProduct.id,
              name: duplicate.name,
              price: duplicate.price ? Number(duplicate.price) / 100 : 0,
              image: duplicate.image_url
            }
          },
          { status: 409 }
        );
      }
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

    // Handle new image uploads
    if (imageFiles.length > 0) {
      // Get current max sort_order to append new images
      const maxSortOrderResult = await db.execute(sql`
        SELECT COALESCE(MAX(sort_order), 0) as max_sort_order 
        FROM menu_item_image 
        WHERE menu_item_id = ${productId}
      `);
      
      const maxSortOrderRaw = maxSortOrderResult.rows[0]?.max_sort_order;
      const maxSortOrder = typeof maxSortOrderRaw === "number" ? maxSortOrderRaw : parseInt(maxSortOrderRaw as string) || 0;
      
      // Check if we need to set any image as primary (if all existing primaries were deleted)
      const primaryImageCheck = await db.execute(sql`
        SELECT COUNT(*) as primary_count 
        FROM menu_item_image 
        WHERE menu_item_id = ${productId} AND is_primary = true
      `);
      
      const primaryCount = parseInt((primaryImageCheck.rows[0] as { primary_count: string }).primary_count || "0");
      const needsPrimary = primaryCount === 0;
      
      // Insert new images
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        // For development, we'll just store the file name as a placeholder URL
        const placeholderUrl = `/uploads/${file.name}`;
        const sortOrder = maxSortOrder + i + 1;
        const isPrimary = (i === 0 && needsPrimary) || false;
        
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