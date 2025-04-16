import Auth from "@/components/Auth/Register";
import AuthHeader from "@/components/Headers/SimpleHeader";
import { Metadata } from "next";
import { auth } from "@/auth"; // assuming you use auth.js
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Auth",
};

export default async function AuthPage() {
  const session = await auth();

  if (session) {
    redirect("/shop"); // or wherever you want to send logged-in users
  }

  return (
    <main className="w-full h-screen">
      <AuthHeader />
      <Auth />
    </main>
  );
}
