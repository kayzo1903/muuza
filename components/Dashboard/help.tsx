// app/support/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-yellow-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">We’re Here to Help 🤝</h1>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Have a question or need assistance? Our support team is ready to help
          you get the most out of Muuza.
        </p>
        <a href="#contact-form">
          <Button
            size="lg"
            className="bg-white text-green-700 font-semibold hover:bg-gray-200"
          >
            Contact Support
          </Button>
        </a>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              q: "How do I create my store?",
              a: "Go to the Get Store page, click 'Create My Store', and fill out your business details.",
            },
            {
              q: "How can I reset my password?",
              a: "Click 'Forgot Password' on the login page, and follow the instructions sent to your email.",
            },
            {
              q: "How do I contact customer support?",
              a: "You can use the form below or reach us via email and phone.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <HelpCircle className="text-green-600 w-6 h-6" /> {faq.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact-form"
        className="py-16 px-6 bg-white dark:bg-gray-800"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Send Us a Message
        </h2>
        <div className="max-w-3xl mx-auto">
          <form className="space-y-6">
            <Input placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
            <Textarea placeholder="How can we help you?" rows={5} required />
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Submit
            </Button>
          </form>

          {/* Contact Info */}
          <div className="mt-12 text-center space-y-4">
            <p className="flex justify-center items-center gap-2 text-gray-700 dark:text-gray-300">
              <Mail className="w-5 h-5 text-green-600" /> support@muuza.com
            </p>
            <p className="flex justify-center items-center gap-2 text-gray-700 dark:text-gray-300">
              <Phone className="w-5 h-5 text-green-600" /> +255 712 345 678
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-green-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Need More Assistance?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Our support team is available 24/7 to help you with your store.
        </p>
        <Link href="/getstore">
          <Button size="lg" className="bg-white text-green-700 font-semibold">
            Open My Store
          </Button>
        </Link>
      </section>
    </main>
  );
}
