"use server";

import { signUp } from "@/lib/auth-client";
import { z } from "zod";

// Same validation schema
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
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export async function registerUser(data: SignUpInput) {
  try {
    // Validate input again on server for safety
    const parsed = signUpSchema.parse(data);

    const response = await signUp.email({
      name: parsed.name,
      email: parsed.email,
      password: parsed.password,
    });

    if (!response) {
      throw new Error("Registration failed, please try again.");
    }

    return { success: true, message: "Account created successfully!" };
  } catch (error : unknown | Error) {
    console.error("SignUp Error:", error);

    // Prevent leaking raw errors from server 
    if (error === "ZodError") {
      return { success: false, message: "Invalid form input." };
    }

    return { success: false, message: "Something went wrong, please try again later." };
  }
}
