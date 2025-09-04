import { createAuthClient } from "better-auth/react";
import {
  emailOTPClient,
  customSessionClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://muuza.vercel.app"
    : "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    emailOTPClient(),
    inferAdditionalFields<typeof auth>(),
    customSessionClient<typeof auth>(),
  ],

  trustedOrigins: ["http://localhost:3000", "https://muuza.vercel.app"],
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  signIn,
  signUp,
  useSession,
  signOut,
  forgetPassword,
  resetPassword,
} = authClient;

export type Session = typeof authClient.$Infer.Session