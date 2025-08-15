// app/auth/email-verification/page.tsx
import { getEmailCookie } from "@/actions/cookies";
import EmailVerification from "@/components/email-verification/verify-email";

export default async function EmailVerificationPage() {
  const email = await getEmailCookie(); // get email from cookies
  return (
    <section className="w-full">
      <EmailVerification email={email as string} />
    </section>
  );
}
