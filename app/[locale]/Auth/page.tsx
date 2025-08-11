import AuthHeader from "@/components/Headers/SimpleHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default async function AuthPage() {

  return (
    <main className="w-full h-screen">
      <AuthHeader />
    </main>
  );
}
