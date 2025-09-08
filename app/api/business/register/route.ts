// /api/business/register/route.ts
import { NextResponse } from "next/server";
import { business, user } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { businessRegistrationSchema } from "@/lib/business-validation";

export async function POST(req: Request) {
  try {
    // 1. Get the current logged-in user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // 2. Parse and validate incoming request body
    const json = await req.json();
    const parsed = businessRegistrationSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.format(), // Structured, user-friendly validation errors
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 3. Generate base username
    const baseUsername = data.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9_-]/g, "");

    // Ensure the username is unique by appending a number if needed
    let finalUsername = baseUsername;
    let counter = 1;
    while (
      await db.query.business.findFirst({
        where: eq(business.username, finalUsername),
      })
    ) {
      finalUsername = `${baseUsername}-${counter++}`;
    }

    // 4. Check if user already has a business with the same name
    const duplicateBusiness = await db.query.business.findFirst({
      where: and(eq(business.ownerId, userId), eq(business.name, data.name)),
    });

    if (duplicateBusiness) {
      return NextResponse.json(
        { error: "You already have a business with this name." },
        { status: 400 }
      );
    }

    // 5. Update user role to 'seller' ONLY if it's not already 'seller'
    const currentUser = await db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    let updatedUser = currentUser;
    if (currentUser.role !== "seller") {
      const [updated] = await db
        .update(user)
        .set({ role: "seller" })
        .where(eq(user.id, userId))
        .returning();

      if (!updated) {
        return NextResponse.json(
          { error: "Failed to update user role" },
          { status: 500 }
        );
      }

      updatedUser = updated;
    }

    // 6. Create new business
    const [newBusiness] = await db
      .insert(business)
      .values({
        id: nanoid(),
        ownerId: userId,
        name: data.name,
        username: finalUsername,
        businessType: data.businessType,
        tagline: data.tagline || null,
        bio: data.bio || null,
        location: data.location || null,
        phone: data.phone,
        logo: data.logo || null,
        cuisine: data.cuisine,
        openingHours: data.openingHours || {},
        businessCategory: data.businessCategory || null,
        subCategory: data.subCategory || null,
        countryCode: data.countryCode || null,
      })
      .returning();

    if (!newBusiness) {
      // Optional rollback: revert user role to buyer if business creation fails
      if (currentUser.role !== "seller") {
        await db
          .update(user)
          .set({ role: "buyer" })
          .where(eq(user.id, userId));
      }

      return NextResponse.json(
        { error: "Failed to create business" },
        { status: 500 }
      );
    }

    // 7. Success response
    return NextResponse.json(
      {
        message: "Business registered successfully and user role updated",
        business: newBusiness,
        user: updatedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    // Add more specific error handling
    if (error instanceof Error) {
      console.error("Error details:", error.message  );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
