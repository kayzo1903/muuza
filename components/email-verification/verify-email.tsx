"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MailCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function EmailVerification() {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds

  // Countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = async () => {
    try {
      setLoading(true);
      // Simulate API call (replace with actual resend logic)
      await new Promise((res) => setTimeout(res, 2000));
      toast.success("Verification email sent again!");
      setTimer(120); // restart countdown
    } catch {
      toast.error("Failed to resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(1, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <MailCheck className="text-[#00BF63]" size={36} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Verify your email
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          We’ve sent a verification link to your email.  
          Please check your inbox and click the link to activate your account.
        </p>

        {/* Resend Button */}
        <Button
          className="w-full rounded-full bg-[#00BF63] hover:bg-[#00a857] text-white font-medium"
          onClick={handleResend}
          disabled={loading || timer > 0}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Resending...
            </>
          ) : timer > 0 ? (
            `Resend available in ${formatTime(timer)}`
          ) : (
            "Resend verification email"
          )}
        </Button>

        {/* Back to login */}
        <div className="pt-4">
          <p className="text-sm text-gray-500">
            Already verified?{" "}
            <Link
              href="/auth/login"
              className="text-[#00BF63] font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
