"use server";

import { cookies } from "next/headers";

export async function setEmailCookie(email: string) {
  (await cookies()).set("pending_email", email, {
    httpOnly: true, // cannot be accessed by JS
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // expires in 1 day
  });
}

export async function getEmailCookie() {
  return (await cookies()).get("pending_email")?.value ;
}

export async function clearEmailCookie() {
  (await cookies()).delete("pending_email");
}
