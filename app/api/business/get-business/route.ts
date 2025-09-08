import { db } from "@/db";
import { business } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// GET endpoint to fetch user's businesses
export async function GET() {
  try {
    // Get the current logged-in user from Better Auth
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const userBusinesses = await db.query.business.findMany({
      where: eq(business.ownerId, userId),
      orderBy: (business, { desc }) => [desc(business.createdAt)],
    });

    return NextResponse.json({ businesses: userBusinesses });
  } catch (error) {
    console.error("Business fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
