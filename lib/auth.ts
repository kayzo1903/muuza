import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { sendEmailAction } from "@/actions/send-email.action";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  trustedOrigins: ["http://localhost:3000", "https://muuza.vercel.app"],
  session: {
    expiresIn: 60 * 1, // session expires in 1 minute
    updateAge: 60 * 0.5, // session is updated every 30 seconds
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // require email verification for sign up
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true ,
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
    }),
  ],
});
