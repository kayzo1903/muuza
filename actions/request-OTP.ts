"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

// --- Send OTP ---
export async function sendVerificationOTP(
  userEmail: string,
  method: "email-verification" | "sign-in" | "forget-password"
) {
  try {
    const res = await auth.api.sendVerificationOTP({
      body: {
        email: userEmail,
        type: method,
      },
    });

    if (!res) {
      throw new Error("Failed to send OTP");
    }

    return { success: true };
  } catch (err) {
    
    if (err instanceof APIError) {
      return {
        success: false,
        error: err.message ,
      };
    }

    return {
      success: false,
      error:  "Something went wrong",
    };
  }
}

// --- Verify OTP ---

export async function verifyEmailOTP(userEmail: string, otp: string) {
  try {
    const res = await auth.api.verifyEmailOTP({
      body: {
        email: userEmail,
        otp,
      },
    });

    console.log("Verify OTP response:", res);

    if (res?.status === true) {
      return { success: true, token: res.token, user: res.user };
    }

    return {
      success: false,
      error: "Invalid or expired OTP",
    };
  } catch (err) {
    console.error("Verify OTP error:", err);

    if (err instanceof APIError) {
      return { success: false, error: err.message || "Invalid OTP. Please try again." };
    }

    return { success: false, error: "Something went wrong" };
  }
}

