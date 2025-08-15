"use server";

import { auth } from "@/lib/auth";

// --- Send OTP ---
export async function sendVerificationOTP(
  userEmail: string ,
  method: "email-verification" | "sign-in" | "forget-password"
) {
  try {
    const res = await auth.api.sendVerificationOTP({
      body: {
        email: userEmail,
        type: method,
      },
    });

    // handle based on response structure
    if (!res) {
      throw new Error("Failed to send OTP");
    }

    return { success: true, token: res.success, };
  } catch (err) {
    if (err === "MAX_ATTEMPTS_EXCEEDED") {
      return { success: false, error: "Maximum OTP attempts exceeded. Please try again later." };
    }
    return { success: false, error:  "Something went wrong" };
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

    if (!res.status) {
      throw new Error("Invalid or expired OTP");
    }

    return { success: true, token: res.token, user: res.user };
  } catch (err) {
    if (err === "MAX_ATTEMPTS_EXCEEDED") {
      return { success: false, error: "Maximum OTP attempts exceeded. Please try again later." };
    }
    return { success: false, error: "Something went wrong" };
  }
}
