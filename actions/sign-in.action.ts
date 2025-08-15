"use server";

import { z } from "zod";
import { sendVerificationOTP } from "./request-OTP";
import { setEmailCookie } from "./cookies";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

export type SignInInput = z.infer<typeof signInSchema>;

export async function signInAction(data: SignInInput) {
  const parsed = signInSchema.parse(data);

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email: parsed.email,
        password: parsed.password,
      },
    });
    return {
      success: true,
      message: "You have sucessfull sign-in",
      error: null,
    };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? err.body.code : "UNKNOWN";
      switch (errCode) {
        case "EMAIL_NOT_VERIFIED":
          await setEmailCookie(parsed.email);
          await sendVerificationOTP(parsed.email, "email-verification");
          redirect("/auth/email-verification");
        default:
          return { success: false, message: err.message };
      }
    }

    return { success: false, message: "Internal Server Error" };
  }
}
