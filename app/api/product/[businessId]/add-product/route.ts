// app/api/product/[businessId]/add-product/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { nanoid } from "nanoid";
import { sql } from "drizzle-orm";
import { foodCategories } from "@/lib/data/food-categories";

// Zod validation schema
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

export async function POST(
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
    const businessResult = await db.execute(
      sql`
        SELECT id FROM business
        WHERE id = ${businessId} AND owner_id = ${session.user.id}
        LIMIT 1;
      `
    );
    const business = businessResult.rows[0];

    if (!business) {
      return NextResponse.json(
        { error: "Business not found or access denied" },
        { status: 404 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const name = (formData.get("name") as string).trim();
    const description = (formData.get("description") as string)?.trim() || null;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string;
    const isAvailable = formData.get("isAvailable") === "true";
    const preparationTime = formData.get("preparationTime")
      ? parseInt(formData.get("preparationTime") as string)
      : null;

    // Parse JSON arrays
    const ingredients = formData.get("ingredients")
      ? JSON.parse(formData.get("ingredients") as string)
      : [];
    const dietaryInfo = formData.get("dietaryInfo")
      ? JSON.parse(formData.get("dietaryInfo") as string)
      : [];

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
    const priceInMinorUnits = Math.round(validatedData.price * 100);
    const productId = nanoid();

    // --- RAW SQL Insert with Duplicate Handling ---
    const result = await db.execute(
      sql`
        INSERT INTO menu_item (
          id,
          business_id,
          category,
          subcategory,
          name,
          normalized_name,
          description,
          price,
          ingredients,
          dietary_info,
          preparation_time,
          is_available
        )
        VALUES (
          ${productId},
          ${businessId},
          ${validatedData.category},
          ${validatedData.subcategory},
          ${validatedData.name},
          ${normalizedName},
          ${validatedData.description},
          ${priceInMinorUnits},
          ${JSON.stringify(validatedData.ingredients)},
          ${JSON.stringify(validatedData.dietaryInfo)},
          ${validatedData.preparationTime},
          ${validatedData.isAvailable}
        )
        ON CONFLICT (business_id, category, normalized_name) 
        DO NOTHING
        RETURNING *;
      `
    );

    // If nothing was inserted, it means duplicate
    if (!result || !result.rows || result.rows.length === 0) {
      return NextResponse.json(
        {
          error: "A product with this name already exists in this category.",
          duplicate: true,
        },
        { status: 409 }
      );
    }

    // --- Handle Image Uploads ---
    const imageFiles = formData.getAll("images") as File[];
    const uploadedImages = [];

    if (imageFiles.length > 0) {
      const uploadsDir = join(process.cwd(), "public/uploads", businessId, productId);
      await mkdir(uploadsDir, { recursive: true });

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        if (file instanceof File) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          const fileExtension = file.name.split(".").pop();
          const fileName = `${nanoid()}.${fileExtension}`;
          const filePath = join(uploadsDir, fileName);

          await writeFile(filePath, buffer);

          const imageUrl = `/uploads/${businessId}/${productId}/${fileName}`;

          await db.execute(
            sql`
              INSERT INTO menu_item_image (
                id,
                menu_item_id,
                url,
                alt_text,
                is_primary,
                sort_order
              )
              VALUES (
                ${nanoid()},
                ${productId},
                ${imageUrl},
                ${`${validatedData.name} - Image ${i + 1}`},
                ${i === 0},
                ${i}
              );
            `
          );

          uploadedImages.push({ url: imageUrl, isPrimary: i === 0 });
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        product: result.rows[0],
        images: uploadedImages,
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          fieldErrors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
