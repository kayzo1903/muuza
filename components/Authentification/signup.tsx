"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import SocialAuthButton from "../outh-sign-Btn";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { log } from "console";

// ✅ 1. Zod schema
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
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setPending(true);
      await signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onRequest: () => {
            setPending(true);
            toast("Creating your account...", {
              description: "Please wait while we set up your account.",
              duration: 5000,
            });
          },
          onResponse: () => {
            setPending(false);
            toast.success(`Congratulations! You have successfully registered. Please check your
          email for the verification link.!`);
          },
          onError: () => {
            toast.error("Failed to create account. Please try again.");
          },
          onSuccess: () => {
            router.push("/");
          },
        }
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg space-y-6 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300">
          Create Account
        </h1>

        <p className="text-gray-500 dark:text-gray-200 text-sm text-center pt-2">
          Fill in your details to register and start using our services
        </p>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {/* Name */}
          <div>
            <Input
              className="h-12 rounded-3xl pl-4"
              id="name"
              type="text"
              placeholder="Your Name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

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

          {/* ✅ Agree to terms - fixed Controller */}
          <div className="flex items-center space-x-2">
            <Controller
              name="agreeTerms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="agreeTerms"
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(Boolean(checked))
                  }
                />
              )}
            />
            <Label htmlFor="agreeTerms" className="text-sm text-gray-600">
              I agree to the{" "}
              <Link href="/terms" className="text-green-600 hover:underline">
                terms and conditions
              </Link>
            </Label>
          </div>
          {errors.agreeTerms && (
            <p className="text-sm text-red-500 mt-1">
              {errors.agreeTerms.message}
            </p>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full rounded-3xl bg-[#00BF63]"
            disabled={pending}
          >
            {pending ? "Creating account..." : "Sign Up"}
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
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-green-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
