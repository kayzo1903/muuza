import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://muuza.vercel.app"
    : "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
  plugins: [emailOTPClient()],
  trustedOrigins: ["http://localhost:3000", "https://muuza.vercel.app"],
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, useSession, signOut , forgetPassword , resetPassword} = authClient;
