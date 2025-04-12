"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function Auth() {
  const t = useTranslations("AuthPage");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex items-center justify-center bg-background px-4 mt-28">
      <Card className="w-full max-w-md shadow-lg border border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            {t("title")}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pt-2">
          <Button
            variant="outline"
            className="flex items-center gap-4 justify-start h-14 text-base font-medium border-gray-300"
            disabled={!agreed}
            // onClick={() => signIn("google")}
          >
            <FcGoogle className="text-xl" />
            {t("google")}
          </Button>

          <Button
            variant="default"
            className="flex items-center gap-4 justify-start h-14 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!agreed}
            // onClick={() => signIn("facebook")}
          >
            <FaFacebook className="text-xl" />
            {t("facebook")}
          </Button>

          <Button
            variant="default"
            className="flex items-center gap-4 justify-start h-14 text-base font-medium bg-black hover:bg-zinc-900 text-white"
            disabled={!agreed}
            // onClick={() => signIn("apple")}
          >
            <FaApple className="text-xl" />
            {t("apple")}
          </Button>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="accent-primary"
            />
            <label htmlFor="agree">
              {t("agreement")}{" "}
              <Link href="/terms" className="underline">
                {t("terms")}
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="underline">
                {t("privacy")}
              </Link>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
