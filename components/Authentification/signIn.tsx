"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import SocialAuthButton from "../outh-sign-Btn";

// 1️⃣ Zod schema
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  // 3️⃣ Submit handler
  const onSubmit = async (data: SignInFormData) => {
    setPending(true);
    try {
      // await signIn("credentials", {
      //   email: data.email,
      //   password: data.password,
      // });
      console.log(data);
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
          Log In
        </h1>

        <p className="text-gray-400 dark:text-gray-200 text-sm text-center pt-4">
          Enter you email and password to securely access your account and
          manage your services
        </p>

        {/* Form */}
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
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Input
                className="h-12 rounded-3xl pl-4"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" {...register("remember")} />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </Label>
            </div>
            <Link
              href="/recover-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full rounded-3xl bg-[#00BF63]"
            disabled={pending}
          >
            {pending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social logins */}
        <div className="flex gap-4 justify-center items-center">
          <SocialAuthButton provider="google" />
          <SocialAuthButton provider="facebook" />
          <SocialAuthButton provider="apple" />
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-green-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
