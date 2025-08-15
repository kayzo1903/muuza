"use server";

import { signIn } from "@/lib/auth-client"; // or better-auth
import z from "zod";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

export type SignUpInput = z.infer<typeof signInSchema>;

export async function signInAction( data : SignUpInput) {
   const parsed = signInSchema.parse(data);
  
  try {
    const result = await signIn.email({
      email: parsed.email,
      password: parsed.password,
      rememberMe: parsed.remember,
    });

    if (result.error) {
      return { success: false, message: "Invalid credentials" };
    }

  } catch (error) {
    console.error("[signInAction]", error);
    return { success: false, message: "Something went wrong" };
  }
}
