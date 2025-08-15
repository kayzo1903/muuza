"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { z } from "zod";

const signUpSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export async function registerUser(data: SignUpInput) {
  try {
    // Validate before hitting the API
    const parsed = signUpSchema.parse(data);

    // Better Auth always returns an object with { data, error }
    await auth.api.signUpEmail({
      body: {
        name: parsed.name,
        email: parsed.email,
        password: parsed.password,
      },
    });

    return {
      success: true,
      message:
        "You have sucessfully register your account , please verify your Email",
    };
  } catch (err) {

    if (err instanceof APIError) {
      const errCode = err.body ? err.body.code : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return {
            success: false,
            message: "User is Already exists , please sign-in",
          };
        default:
          return { success: false, message: err.message };
      }
    }
  }
}