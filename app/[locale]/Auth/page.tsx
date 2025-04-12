import Auth from "@/components/Auth/Register";
import AuthHeader from "@/components/Header/AuthHeader";

export default function AuthPage() {
  return (
    <main className="w-full h-screen">
      <AuthHeader />
      <Auth />
    </main>
  );
}
