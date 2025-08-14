import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { MailCheck } from "lucide-react";

export default function EmailSucessVerificationPage() {
  return (
    <section>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <MailCheck className="text-[#00BF63]" size={36} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Congratulations your email has been verified!
          </h1>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Your email has been successfully verified. You can now log in to
            your account and start using our services.
          </p>

          {/* Back to login */}
          <Button className="w-full rounded-full bg-[#00BF63] hover:bg-[#00a857] text-white font-medium">
            <Link href="/auth/sign-in">Return to logIn page</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
