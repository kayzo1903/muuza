import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://muuza.vercel.app"
    : "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signUp, useSession } = authClient;
