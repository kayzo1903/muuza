import AccountSetting from "@/components/profile/profilesetting";
import { Metadata } from "next";
import { getSession } from "@/actions/getsession";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="w-full">
      {/* Pass session as prop */}
      <AccountSetting session={session} />
    </main>
  );
}
