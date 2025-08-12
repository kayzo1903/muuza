"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 1️⃣ Zod schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setPending(true);
    try {
      console.log(data);
      // await sendPasswordResetEmail(data.email)
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300">
          Forgot Password
        </h1>

        <p className="text-gray-400 dark:text-gray-200 text-sm text-center pt-4">
          Enter your email and we’ll send you instructions to reset your password.
        </p>

        {!success ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
            {/* Email */}
            <div>
              <Input
                className="h-12 rounded-3xl pl-4"
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full rounded-3xl bg-[#00BF63]"
              disabled={pending}
            >
              {pending ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        ) : (
          <p className="text-green-600 text-center text-sm pt-4">
            ✅ If this email is registered, a reset link has been sent.
          </p>
        )}

        {/* Back to sign in */}
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
