"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { resetPassword } from "@/lib/auth-client";
import { useRouter } from "@/i18n/routing";

// 1️⃣ Zod schema for strong password validation
const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface ResetPasswordFormProps {
  token: string;
}

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export default function NewPasswordSetting({ token }: ResetPasswordFormProps) {
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    setPending(true);

    await resetPassword({
      newPassword: data.password,
      token,
      fetchOptions: {
        onRequest: () => {
          setPending(true);
        },
        onResponse: () => {
          setPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          setSuccess(true);
          toast.success("Password reset successfully.");
          setTimeout(() => router.push("/auth/login"), 2000);
        },
      },
    });
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300">
          Set New Password
        </h1>

        {!success ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
            {/* Password */}
            <div className="relative">
              <Input
                className="h-12 rounded-3xl pl-4 pr-10"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Input
                className="h-12 rounded-3xl pl-4 pr-10"
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full rounded-3xl bg-[#00BF63]"
              disabled={pending}
            >
              {pending ? "Updating..." : "Update Password"}
            </Button>
          </form>
        ) : (
          <p className="text-green-600 text-center text-xl font-medium pt-4">
            ✅ Password updated successfully! Redirecting to sign in...
          </p>
        )}
      </div>
    </div>
  );
}
