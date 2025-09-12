// app/api/product/[businessId]/edit/add-edit-product/[productId]/route.ts

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { foodCategories } from "@/lib/data/food-categories";

// Zod validation schema (same as add-product)
const CategorySchema = z.enum(
  foodCategories.map(cat => cat.id) as [string, ...string[]]
);

const SubcategorySchema = z.enum(
  foodCategories.flatMap(cat => cat.subcategories.map(sub => sub.id)) as [string, ...string[]]
);

const productApiSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  price: z.number().min(0).max(1000000),
  category: CategorySchema,
  subcategory: SubcategorySchema,
  isAvailable: z.boolean().default(true),
  ingredients: z.array(z.string()).optional(),
  dietaryInfo: z.array(z.string()).optional(),
  preparationTime: z.number().min(0).max(240).optional(),
});

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
      SELECT id, name, category, normalized_name FROM menu_item 
      WHERE id = ${productId} AND business_id = ${businessId}
    `);

    if (productCheck.rows.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    interface ExistingProduct {
      id: string;
      name: string;
      category: string;
      normalized_name: string;
    }
    const existingProduct = productCheck.rows[0] as unknown as ExistingProduct;

    // Parse form data
    const formData = await request.formData();
    
    // Extract form data
    const name = (formData.get("name") as string).trim();
    const description = (formData.get("description") as string)?.trim() || null;
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

    // Validate data
    const validatedData = productApiSchema.parse({
      name,
      description,
      price,
      category,
      subcategory,
      isAvailable,
      ingredients,
      dietaryInfo,
      preparationTime,
    });

    const normalizedName = validatedData.name.toLowerCase();
    const priceInCents = Math.round(validatedData.price * 100);

    // Check for duplicate product (excluding the current product)
    // Only check if name, category, or normalized_name changed
    if (existingProduct.name !== name || existingProduct.category !== category) {
      const duplicateCheck = await db.execute(sql`
        SELECT id, name FROM menu_item 
        WHERE business_id = ${businessId}
        AND category = ${validatedData.category}
        AND normalized_name = ${normalizedName}
        AND id != ${productId}
        LIMIT 1;
      `);

      if (duplicateCheck.rows.length > 0) {
        interface DuplicateProduct {
          id: string;
          name: string;
        }
        const duplicateProduct = duplicateCheck.rows[0] as unknown as DuplicateProduct;
        return NextResponse.json(
          {
            error: "Duplicate product",
            message: `A product with the name "${duplicateProduct.name}" already exists in this category.`,
            duplicate: true,
            existingProduct: duplicateProduct
          },
          { status: 409 }
        );
      }
    }

    // Update the main product information
    const updateResult = await db.execute(sql`
      UPDATE menu_item 
      SET 
        name = ${validatedData.name},
        normalized_name = ${normalizedName},
        description = ${description || null},
        price = ${priceInCents},
        category = ${validatedData.category},
        subcategory = ${validatedData.subcategory},
        is_available = ${validatedData.isAvailable},
        preparation_time = ${validatedData.preparationTime},
        ingredients = ${JSON.stringify(validatedData.ingredients)}::jsonb,
        dietary_info = ${JSON.stringify(validatedData.dietaryInfo)}::jsonb,
        updated_at = NOW()
      WHERE id = ${productId} AND business_id = ${businessId}
      RETURNING *;
    `);

    if (updateResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: 500 }
      );
    }

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
      
      // Check if we need to set a primary image (if all existing ones were deleted)
      const remainingImagesResult = await db.execute(sql`
        SELECT COUNT(*) as count FROM menu_item_image 
        WHERE menu_item_id = ${productId} AND is_primary = true
      `);
      
      const remainingPrimaryImages = parseInt(remainingImagesResult.rows[0]?.count as string) || 0;
      const needsPrimaryImage = remainingPrimaryImages === 0;
      
      // Insert new images
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        // For development, we'll just store the file name as a placeholder URL
        const placeholderUrl = `/uploads/${file.name}`;
        const sortOrder = maxSortOrder + i + 1;
        const isPrimary = needsPrimaryImage && i === 0;
        
        await db.execute(sql`
          INSERT INTO menu_item_image (
            id,
            menu_item_id, 
            url, 
            alt_text,
            sort_order, 
            is_primary
          )
          VALUES (
            ${crypto.randomUUID()},
            ${productId}, 
            ${placeholderUrl}, 
            ${`${validatedData.name} - Image ${i + 1}`},
            ${sortOrder}, 
            ${isPrimary}
          )
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

    interface UpdatedProduct {
      id: string;
      name: string;
      description: string | null;
      price: number;
      category: string;
      subcategory: string;
      is_available: boolean;
      preparation_time: number | null;
      ingredients: string[] | null;
      dietary_info: string[] | null;
      created_at: string;
      updated_at: string;
      business_id: string;
    }
    const updatedProduct = updatedProductResult.rows[0] as unknown as UpdatedProduct;

    // Fetch all images for the product
    const imagesResult = await db.execute(sql`
      SELECT url 
      FROM menu_item_image 
      WHERE menu_item_id = ${productId}
      ORDER BY is_primary DESC, sort_order ASC, created_at ASC
    `);

    const images = imagesResult.rows.map(row => (row as { url: string }).url);

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
      success: true,
      message: "Product updated successfully",
      product: productData
    });

  } catch (error) {
    console.error("Product update error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          message: "Please check your input fields",
          fieldErrors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: "Internal server error",
        message: "An unexpected error occurred. Please try again."
      },
      { status: 500 }
    );
  }
}