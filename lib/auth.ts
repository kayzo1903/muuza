import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";

import { sendEmailAction } from "@/actions/send-email.action";
import { sendResetLink } from "@/actions/send-reset-link.action";

import { emailOTP } from "better-auth/plugins";
import { myCustomEncryptor, myCustomDecryptor } from "@/actions/encryptor";
import { nextCookies } from "better-auth/next-js";

// ------------------------------------
// FINAL BETTER AUTH CONFIG
// ------------------------------------
export const auth = betterAuth({
  // ----------------------------
  // DATABASE SETUP
  // ----------------------------
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  trustedOrigins: [
    "http://localhost:3000",
    "https://muuza.vercel.app",
  ],

  // ----------------------------
  // SESSION CONFIGURATION
  // ----------------------------
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // cache session cookie for 5 mins
    },
  },

  // ----------------------------
  // EXTENDING USER SCHEMA
  // ----------------------------
  user: {
    additionalFields: {
      provider: {
        type: "string",
        required: false,
        defaultValue: "credentials", // default for manual signup
        input: false, // cannot be set directly by client
      },
      phone_number: {
        type: "string",
        required: false, // added later when upgrading to seller
      },
      address: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "buyer", // all new users are buyers by default
        input: false, // do not allow client to override
      },
    },
  },

  // ----------------------------
  // EMAIL + PASSWORD AUTH
  // ----------------------------
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetLink({
        to: user.email,
        subject: "Reset your password",
        meta: {
          description: "Click the link below to reset your password.",
          link: String(url),
        },
      });
    },
  },

  // ----------------------------
  // EMAIL VERIFICATION
  // ----------------------------
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60, // 1 hour
  },

  // ----------------------------
  // SOCIAL PROVIDERS
  // ----------------------------
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          provider: "google",
          name: profile.name,
          email: profile.email,
        };
      },
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      scope: ["email", "public_profile"],
      mapProfileToUser: (profile) => {
        return {
          provider: "facebook",
          name: profile.name,
          email: profile.email,
        };
      },
    },
  },

  // ----------------------------
  // ACCOUNT LINKING
  // ----------------------------
  account: {
    accountLinking: {
      trustedProviders: ["google", "facebook"],
    },
  },

  // ----------------------------
  // ADVANCED CONFIG
  // ----------------------------
  advanced: {
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === "production",
      domain: ".muuza.vercel.app",
    },
  },

  // ----------------------------
  // PLUGINS
  // ----------------------------
  plugins: [
    // EMAIL OTP VERIFICATION
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        await sendEmailAction({
          to: email,
          subject: `Your ${type} OTP`,
          meta: {
            description: "Use the code below to verify your account.",
            otp,
          },
        });
      },
      storeOTP: {
        encrypt: async (otp) => myCustomEncryptor(otp),
        decrypt: async (otp) => myCustomDecryptor(otp),
      },
    }),

    // CUSTOM SESSION PAYLOAD
    // customSession(async ({ user, session }) => {
    //   return {
    //     session: {
    //       expiresAt: session.expiresAt,
    //       token: session.token,
    //       userAgent: session.userAgent,
    //     },
    //     user: {
    //       id: user.id,
    //       name: user.name,
    //       email: user.email,
    //       image: user.image,
    //       createdAt: user.createdAt,
    //       updatedAt: user.updatedAt,
    //       provider: user.provider,
    //       phone: user.phone_number, // renamed for cleaner frontend
    //       address: user.address,
    //       role: user.role,
    //     },
    //   };
    // }),

    // NEXT.JS COOKIE HANDLING
    nextCookies(),
  ],
});

export type session = typeof auth.$Infer.Session;