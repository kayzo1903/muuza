import Footer from "@/components/Footer/footer";
import AuthHeader from "@/components/Headers/SimpleHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "privacy-policy",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full">
      <AuthHeader />
      <section className="container max-w-4xl mx-auto py-12 px-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
              <p>
                This Privacy Policy describes how Muuza (“we”, “our”, or “us”)
                collects, uses, and protects your personal information when you
                use our services. By using Muuza, you agree to this policy.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-2">
                2. Information We Collect
              </h2>
              <p>
                We may collect personal details such as your name, email
                address, profile picture, and any other information you provide
                when using our platform.
              </p>
              <p>
                Additionally, we may collect technical information such as your
                IP address, browser type, and device information for analytics
                and security.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-2">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide and improve our services</li>
                <li>To personalize your experience</li>
                <li>
                  To communicate with you about updates, promotions, and offers
                </li>
                <li>To maintain security and prevent fraud</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-2">
                4. Sharing of Information
              </h2>
              <p>
                We do not sell or rent your personal data. We may share your
                information with trusted third-party service providers that help
                us operate the platform, subject to confidentiality agreements.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal
                information. Please contact us at{" "}
                <span className="font-medium">support@muuza.com</span>
                for any privacy-related requests.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-2">
                6. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of significant changes by posting the new policy on
                this page and updating the date below.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </main>
  );
}
