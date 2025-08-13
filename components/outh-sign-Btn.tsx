"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { JSX, useState } from "react";
import { toast } from "sonner";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa"; // You can also use FaXTwitter if you have it in your icon set

type SocialProvider = "google" | "facebook" | "twitter";

interface SocialAuthButtonProps {
  provider: SocialProvider;
  callbackURL?: string;
  errorCallbackURL?: string;
  size?: string; // Tailwind size classes (optional)
}

const providerConfig: Record<
  SocialProvider,
  { icon: JSX.Element; colorClass?: string }
> = {
  google: { icon: <FcGoogle className="scale-150" /> },
  facebook: { icon: <FaFacebook className="scale-150 text-blue-600" /> },
};

export default function SocialAuthButton({
  provider,
  callbackURL = "/shop",
  errorCallbackURL = "/auth/sign-in",
  size = "w-14 h-14",
}: SocialAuthButtonProps) {
  const [pending, setPending] = useState(false);

  const handleSignIn = async () => {
    await signIn.social({
      provider,
      callbackURL,
      errorCallbackURL,
      fetchOptions: {
        onRequest: () => setPending(true),
        onResponse: () => setPending(false),
        onError: (ctx) => {
          setPending(false);
          toast.error(ctx.error.message || "Login failed", {
            description: "Please try again.",
          });
        },
      },
    });
  };

  return (
    <Button
      variant="outline"
      className={`rounded-full ${size}`}
      onClick={handleSignIn}
      disabled={pending}
    >
      {providerConfig[provider]?.icon}
    </Button>
  );
}
