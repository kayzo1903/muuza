import Auth from "@/components/Auth/Register";
import AuthHeader from "@/components/Headers/AuthHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
};

export default function AuthPage() {
  return (
    <main className="w-full h-screen">
      <AuthHeader />
      <Auth />
    </main>
  );
}
