// app/api/product/[businessId]/edit/add-edit-product/[productId]/route.ts

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { foodCategories } from "@/lib/data/food-categories";

// ===== ZOD SCHEMAS =====
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

// ===== MAIN PUT HANDLER =====
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ businessId: string; productId: string }> }
) {
  const { businessId, productId } = await params;

  try {
    // 1. AUTHENTICATION
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. VERIFY BUSINESS OWNERSHIP
    const businessCheck = await db.execute(sql`
      SELECT id FROM business 
      WHERE id = ${businessId} AND owner_id = ${session.user.id}
      LIMIT 1
    `);

    if (businessCheck.rows.length === 0) {
      return NextResponse.json(
        { error: "Business not found or unauthorized" },
        { status: 404 }
      );
    }

    // 3. VERIFY PRODUCT EXISTS
    const productCheck = await db.execute(sql`
      SELECT id, name, category FROM menu_item 
      WHERE id = ${productId} AND business_id = ${businessId}
      LIMIT 1
    `);

    if (productCheck.rows.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const existingProduct = productCheck.rows[0] as {
      id: string;
      name: string;
      category: string;
    };

    // 4. EXTRACT FORM DATA
    const formData = await request.formData();
    const name = (formData.get("name") as string).trim();
    const description = (formData.get("description") as string)?.trim() || null;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string;
    const isAvailable = formData.get("isAvailable") === "true";
    const preparationTime = parseInt(formData.get("preparationTime") as string) || 0;

    const ingredients = JSON.parse(formData.get("ingredients") as string || "[]");
    const dietaryInfo = JSON.parse(formData.get("dietaryInfo") as string || "[]");
    const imagesToDelete = JSON.parse(formData.get("imagesToDelete") as string || "[]");
    const imageFiles = formData.getAll("images") as File[];

    // 5. VALIDATE INPUT
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

    // 6. DUPLICATE NAME CHECK (only if name or category changed)
    if (existingProduct.name !== validatedData.name || existingProduct.category !== validatedData.category) {
      const duplicateCheck = await db.execute(sql`
        SELECT id, name FROM menu_item
        WHERE business_id = ${businessId}
          AND category = ${validatedData.category}
          AND LOWER(name) = ${normalizedName}
          AND id != ${productId}
        LIMIT 1
      `);

      if (duplicateCheck.rows.length > 0) {
        const duplicateProduct = duplicateCheck.rows[0] as { id: string; name: string };
        return NextResponse.json(
          {
            error: "Duplicate product name",
            message: `Another product with the name "${duplicateProduct.name}" already exists in this category.`,
          },
          { status: 409 }
        );
      }
    }

    // 7. UPDATE PRODUCT INFO
    const updateResult = await db.execute(sql`
      UPDATE menu_item
      SET
        name = ${validatedData.name},
        normalized_name = ${normalizedName},
        description = ${description},
        price = ${priceInCents},
        category = ${validatedData.category},
        subcategory = ${validatedData.subcategory},
        is_available = ${validatedData.isAvailable},
        preparation_time = ${validatedData.preparationTime},
        ingredients = ${JSON.stringify(validatedData.ingredients)}::jsonb,
        dietary_info = ${JSON.stringify(validatedData.dietaryInfo)}::jsonb,
        updated_at = NOW()
      WHERE id = ${productId} AND business_id = ${businessId}
      RETURNING *
    `);

    if (updateResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: 500 }
      );
    }

    // 8. HANDLE IMAGE DELETION
    if (imagesToDelete.length > 0) {
      await db.execute(sql`
        DELETE FROM menu_item_image
        WHERE menu_item_id = ${productId}
          AND url = ANY(${imagesToDelete})
      `);
    }

    // 9. HANDLE NEW IMAGE UPLOADS
    if (imageFiles.length > 0) {
      const maxSortOrderResult = await db.execute(sql`
        SELECT COALESCE(MAX(sort_order), 0) AS max_sort_order
        FROM menu_item_image
        WHERE menu_item_id = ${productId}
      `);

      const maxSortOrder = Number(maxSortOrderResult.rows[0]?.max_sort_order || 0);

      const primaryImageCountResult = await db.execute(sql`
        SELECT COUNT(*)::int AS count
        FROM menu_item_image
        WHERE menu_item_id = ${productId} AND is_primary = true
      `);

      const needsPrimaryImage = Number(primaryImageCountResult.rows[0]?.count || 0) === 0;

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const placeholderUrl = `/uploads/${file.name}`;
        const sortOrder = maxSortOrder + i + 1;

        await db.execute(sql`
          INSERT INTO menu_item_image (
            id, menu_item_id, url, alt_text, sort_order, is_primary
          )
          VALUES (
            ${crypto.randomUUID()},
            ${productId},
            ${placeholderUrl},
            ${`${validatedData.name} - Image ${i + 1}`},
            ${sortOrder},
            ${needsPrimaryImage && i === 0}
          )
        `);
      }
    }

    // 10. FETCH UPDATED PRODUCT WITH IMAGES
    const productResult = await db.execute(sql`
      SELECT
        id, name, description, price, category, subcategory,
        is_available, preparation_time, ingredients, dietary_info,
        created_at, updated_at, business_id
      FROM menu_item
      WHERE id = ${productId}
    `);

    const imagesResult = await db.execute(sql`
      SELECT url
      FROM menu_item_image
      WHERE menu_item_id = ${productId}
      ORDER BY is_primary DESC, sort_order ASC, created_at ASC
    `);

    const updatedProduct = productResult.rows[0] as {
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
    };

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product: {
        ...updatedProduct,
        price: updatedProduct.price / 100,
        ingredients: updatedProduct.ingredients || [],
        dietaryInfo: updatedProduct.dietary_info || [],
        images: imagesResult.rows.map(row => (row as { url: string }).url),
      },
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
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
