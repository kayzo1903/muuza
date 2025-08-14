import EmailVerification from "@/components/email-verification/verify-email";
import { redirect } from "next/navigation";


interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function EmailVerificationPage({ searchParams }: PageProps) {
     const error = (await searchParams).error;

  if (!error) redirect("/shop");

    return (
        <section className="w-full">
          <EmailVerification />
        </section>
    )
}