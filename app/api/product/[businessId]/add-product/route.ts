// app/api/product/[businessId]/add-product/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { menuItem, menuItemImage } from "@/db/schema";
import { nanoid } from "nanoid";
import { foodCategories } from "@/lib/data/food-categories";

// Create enum schemas from categories
const CategorySchema = z.enum(
  foodCategories.map(cat => cat.id) as [string, ...string[]]
);

const SubcategorySchema = z.enum(
  foodCategories.flatMap(cat => cat.subcategories.map(sub => sub.id)) as [string, ...string[]]
);

// Simplified validation schema (no menuId)
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

    // Parse form data
    const formData = await request.formData();

    // Extract text fields
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string;
    const isAvailable = formData.get("isAvailable") === "true";
    const preparationTime = formData.get("preparationTime")
      ? parseInt(formData.get("preparationTime") as string)
      : undefined;

    // Parse JSON arrays
    const ingredients = formData.get("ingredients")
      ? JSON.parse(formData.get("ingredients") as string)
      : [];

    const dietaryInfo = formData.get("dietaryInfo")
      ? JSON.parse(formData.get("dietaryInfo") as string)
      : [];

    // Validate the data
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

    // Convert price to minor units (cents)
    const priceInMinorUnits = Math.round(validatedData.price * 100);

    // Create menu item in database (NO menuId)
    const [newMenuItem] = await db
      .insert(menuItem)
      .values({
        id: nanoid(),
        businessId,
        category: validatedData.category,
        subcategory: validatedData.subcategory,
        name: validatedData.name,
        description: validatedData.description,
        price: priceInMinorUnits,
        ingredients: validatedData.ingredients,
        dietaryInfo: validatedData.dietaryInfo,
        preparationTime: validatedData.preparationTime,
        isAvailable: validatedData.isAvailable,
      })
      .returning();

    // Handle image uploads (unchanged)
    const imageFiles = formData.getAll("images") as File[];
    const uploadedImages = [];

    if (imageFiles.length > 0) {
      const uploadsDir = join(
        process.cwd(),
        "public/uploads",
        businessId,
        newMenuItem.id
      );
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

          const imageUrl = `/uploads/${businessId}/${newMenuItem.id}/${fileName}`;

          const [imageRecord] = await db
            .insert(menuItemImage)
            .values({
              id: nanoid(),
              menuItemId: newMenuItem.id,
              url: imageUrl,
              altText: `${validatedData.name} - Image ${i + 1}`,
              isPrimary: i === 0,
              sortOrder: i,
            })
            .returning();

          uploadedImages.push(imageRecord);
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        menuItem: newMenuItem,
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