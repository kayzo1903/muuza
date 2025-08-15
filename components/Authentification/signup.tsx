"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import SocialAuthButton from "../outh-sign-Btn";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";

import { z } from "zod";
import { registerUser } from "@/actions/sign-up.action";
import { setEmailCookie } from "@/actions/cookies";
import { sendVerificationOTP } from "@/actions/request-OTP";

// Reuse schema for client-side validation
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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setPending(true);
      toast("Creating your account...", { description: "Please wait..." });

      const res = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res?.success) {
        await setEmailCookie(data.email);
        await sendVerificationOTP(data.email , "email-verification")
        router.push("/auth/email-verification"); // Redirect to sign-in page after successful registration
      } else {
        setError(res?.message || "something went wrong");
      }
    } catch {
      toast.error("Unexpected error. Please try again.");
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
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <p className="text-gray-500 dark:text-gray-200 text-sm text-center pt-2">
          Fill in your details to register and start using our services
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {/* Name */}
          <Input
            {...register("name")}
            placeholder="Your Name"
            className="h-12 rounded-3xl pl-4"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          {/* Email */}
          <Input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="h-12 rounded-3xl pl-4"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-12 rounded-3xl pl-4"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <Controller
              name="agreeTerms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="agreeTerms"
                  checked={field.value}
                  onCheckedChange={(c) => field.onChange(Boolean(c))}
                />
              )}
            />
            <Label htmlFor="agreeTerms" className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="text-green-600 hover:underline">
                terms
              </Link>
            </Label>
          </div>
          {errors.agreeTerms && (
            <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>
          )}

          <Button
            type="submit"
            disabled={pending}
            className="w-full rounded-3xl bg-[#00BF63]"
          >
            {pending ? "Creating..." : "Sign Up"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social logins */}
        <div className="flex gap-4 justify-center">
          <SocialAuthButton provider="google" />
          <SocialAuthButton provider="facebook" />
        </div>

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
