import NewPasswordSetting from "@/components/Authentification/passwordreset";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}


export default async function Resetpassword({ searchParams }: PageProps) {

    const token = (await searchParams).token;
     if (!token) redirect("/auth/sign-in");

  return (
    <div className="w-full pt-8 pb-48">
      <NewPasswordSetting token={token}/>
    </div>
  )
}