"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"; 
import { toast } from "sonner";
import { sendVerificationOTP, verifyEmailOTP } from "@/actions/request-OTP";
import { redirect } from "next/navigation";


interface EmailVerificationProps {
  email: string ;
}

export default function EmailVerification({ email }: EmailVerificationProps) {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isResending, setIsResending] = useState(false);

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

const handleVerify = async () => {
    const res = await verifyEmailOTP( email , otp);
    if (res.success) {
      toast.success("Your sucessfull verify your email");
      redirect("/shop")
    } else {
      toast.error(res.error);
    }
  };

  const handleSend = async () => {
    setIsResending(true)
    const res = await sendVerificationOTP(email, "email-verification");
    if (res.success) {
      toast.success("OTP sent ✅");
      setIsResending(false)
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 ">
      <div className="w-full max-w-md flex flex-col justify-center items-center shadow-lg rounded-2xl p-6 space-y-6 text-center bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-[#00BF63]">Verify Your Email</h1>
        <p className="text-gray-600">
          Enter the 6-digit code we sent to your email: <span className="font-semibold">{email}</span>
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
          onClick={handleVerify}
          className="w-full bg-[#00BF63] hover:bg-[#009e52] text-white rounded-2xl py-2"
        >
          Verify
        </Button>

        {/* Countdown & Resend */}
        <div className="text-sm text-gray-500">
          {timeLeft > 0 ? (
            <p>Resend available in <span className="font-semibold">{timeLeft}s</span></p>
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
