import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { sendEmailAction } from "@/actions/send-email.action";
import { emailOTP } from "better-auth/plugins";
import { myCustomDecryptor, myCustomEncryptor } from "@/actions/encryptor";
import { nextCookies } from "better-auth/next-js";
import { sendResetLink } from "@/actions/send-reset-link.action";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  trustedOrigins: ["http://localhost:3000", "https://muuza.vercel.app"],
  session: {
    expiresIn: 30 * 24 * 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // require email verification for sign up
    sendResetPassword: async ({ user, url }) => {
      await sendResetLink({
        to: user.email,
        subject: "Reset your password",
        meta: {
          description: "Please click the link below to reset your password.",
          link: String(url),
        },
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60, // 1hr
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      scope: ["email", "public_profile"], // make sure email is here
    },
  },
  account: {
    accountLinking: {
      trustedProviders: ["google", "facebook"],
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === "production",
      domain: ".muuza.vercel.app",
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        sendEmailAction({
          to: email,
          subject: `Your ${type} OTP`,
          meta: {
            description: `use the code below to verify your account.`,
            otp,
          },
        });
      },
      storeOTP: {
        encrypt: async (otp) => {
          return myCustomEncryptor(otp);
        },
        decrypt: async (otp) => {
          return myCustomDecryptor(otp);
        },
      },
    }),
    nextCookies(),
  ],
});
