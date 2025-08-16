"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { sendVerificationOTP, verifyEmailOTP } from "@/actions/request-OTP";
import { clearEmailCookie } from "@/actions/cookies";

interface EmailVerificationProps {
  email: string;
}

export default function EmailVerification({ email }: EmailVerificationProps) {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [pending, setPending] = useState(false);

  const router = useRouter();

  // Load expiry time from localStorage on mount
  useEffect(() => {
    const storedExpiry = localStorage.getItem("otpExpiry");
    if (storedExpiry) {
      const diff = Math.floor((+storedExpiry - Date.now()) / 1000);
      if (diff > 0) setTimeLeft(diff);
    }
  }, []);

  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("otpExpiry");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleVerify = async () => {
    setPending(true);
    const res = await verifyEmailOTP(email, otp);

    if (res.success) {
      toast.success("Your email was successfully verified ✅");
      setOtp("");
      localStorage.removeItem("otpExpiry");
      clearEmailCookie();

      // ✅ Always redirect to shop after signup verification
      router.push("/shop");
    } else {
      toast.error(res.error);
    }
    setPending(false);
  };

  const handleSend = async () => {
    if (timeLeft > 0) return;
    setIsResending(true);

    const res = await sendVerificationOTP(email, "email-verification");

    if (res.success) {
      setOtp("");
      toast.success("OTP sent to your email");
      const expiryTime = Date.now() + 120 * 1000;
      localStorage.setItem("otpExpiry", expiryTime.toString());
      setTimeLeft(120);
    } else {
      toast.error(res.error);
    }
    setIsResending(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8">
      <div className="w-full max-w-md flex flex-col justify-center items-center shadow-lg rounded-2xl p-6 space-y-6 text-center bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-[#00BF63]">Verify Your Email</h1>
        <p className="text-gray-600">
          Enter the 6-digit code we sent to:{" "}
          <span className="font-semibold">{email}</span>
        </p>

        {/* OTP Input */}
        <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
          <InputOTPGroup className="gap-2 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-10 h-12 text-lg border rounded-lg focus:ring-2 focus:ring-[#00BF63]"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {/* Verify Button */}
        <Button
          disabled={pending}
          onClick={handleVerify}
          className="w-full bg-[#00BF63] hover:bg-[#009e52] text-white rounded-2xl py-2"
        >
          {pending ? "Verifying..." : "Verify"}
        </Button>

        {/* Countdown & Resend */}
        <div className="text-sm text-gray-500">
          {timeLeft > 0 ? (
            <p>
              Resend available in{" "}
              <span className="font-semibold">{timeLeft}s</span>
            </p>
          ) : (
            <Button
              onClick={handleSend}
              disabled={isResending}
              variant="outline"
              className="mt-2 rounded-2xl"
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
