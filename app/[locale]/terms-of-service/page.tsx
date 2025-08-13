import Footer from "@/components/Footer/footer";
import AuthHeader from "@/components/Headers/SimpleHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
export const metadata: Metadata = {

  title: "terms-of-service",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="w-full">
      <AuthHeader />
      <section className="container max-w-4xl mx-auto py-12 px-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Terms & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using Muuza (“we”, “our”, or “us”), you agree to
                comply with and be bound by these Terms & Conditions. If you do
                not agree, please discontinue use of our services.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
              <p>
                You must be at least 18 years old or have the consent of a
                parent or guardian to use our services. By using Muuza, you
                confirm that you meet this requirement.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-2">
                3. User Responsibilities
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  You agree to use the platform lawfully and respectfully.
                </li>
                <li>
                  You will not attempt to hack, exploit, or disrupt our
                  services.
                </li>
                <li>
                  You are responsible for the accuracy of information you
                  provide.
                </li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-2">
                4. Intellectual Property
              </h2>
              <p>
                All content, trademarks, and designs on Muuza are our property
                or licensed to us. You may not reproduce or distribute them
                without permission.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-2">
                5. Limitation of Liability
              </h2>
              <p>
                We are not responsible for any damages or losses resulting from
                your use of the platform, except as required by law.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-2">
                6. Changes to Terms
              </h2>
              <p>
                We may update these Terms & Conditions at any time. Changes will
                take effect upon posting, and continued use of the service means
                you accept the updated terms.
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
