"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { z } from "zod";

// ✅ Define schema
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: passwordSchema,
});

export async function changePasswordAction(formData: FormData) {
  // ✅ Collect form values
  const data = {
    currentPassword: String(formData.get("currentPassword")),
    newPassword: String(formData.get("newPassword")),
  };

  // ✅ Validate with Zod
  const parsed = changePasswordSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }; // Return first error
  }

  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: parsed.data, // ✅ Pass only validated data
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal Server Error" };
  }
}
