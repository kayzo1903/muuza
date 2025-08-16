"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { forgetPassword } from "@/lib/auth-client"; // ✅ use the same auth-client like in second block

// 1️⃣ Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Key to store the countdown expiry in localStorage
const STORAGE_KEY = "forgot-password-expiry";

export default function ForgotPassword() {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // seconds

  // 2️⃣ Hook form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  // 3️⃣ On mount: check if countdown is already active
  useEffect(() => {
    const expiry = localStorage.getItem(STORAGE_KEY);
    if (expiry) {
      const diff = Math.floor((+expiry - Date.now()) / 1000);
      if (diff > 0) setTimeLeft(diff);
      else localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // 4️⃣ Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(STORAGE_KEY);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Format mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // 5️⃣ Form submit handler
  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (timeLeft > 0) return; // prevent spam

    setPending(true);
    try {
      await forgetPassword({
        email: data.email,
        redirectTo: "/auth/reset-password",
        fetchOptions: {
          onRequest: () => setPending(true),
          onResponse: () => setPending(false),
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success("Reset link sent to your email.");
            setSuccess(true);

            // Set expiry time (5 minutes from now)
            const expiry = Date.now() + 5 * 60 * 1000;
            localStorage.setItem(STORAGE_KEY, String(expiry));
            setTimeLeft(5 * 60);
          },
        },
      });
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300">
          Forgot Password
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-sm text-center pt-4">
          Enter your email and we’ll send you instructions to reset your password.
        </p>

        {/* Form or success message */}
        {!success ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
            {/* Email Input */}
            <div>
              <Input
                className="h-12 rounded-3xl pl-4"
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full rounded-3xl bg-[#00BF63]"
              disabled={pending || timeLeft > 0}
            >
              {pending
                ? "Sending..."
                : timeLeft > 0
                ? `Resend in ${formatTime(timeLeft)}`
                : "Send Reset Link"}
            </Button>
          </form>
        ) : (
          <p className="text-green-600 text-center text-sm pt-4">
            ✅ If this email is registered, a reset link has been sent.
          </p>
        )}

        {/* Back to Sign In */}
        <p className="text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <Link href="/auth/sign-in" className="text-green-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
