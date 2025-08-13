import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Truck, Users, ShoppingBag } from "lucide-react";

export default function GetStorePage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-yellow-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Open Your Store on Muuza Today 🚀
        </h1>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Join thousands of sellers reaching more customers and growing their
          business online.
        </p>
        <Link href="/get-store/register-business">
          <Button size="lg" className="bg-white text-green-700 font-semibold">
            Create My Store
          </Button>
        </Link>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Sell on Muuza?
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              icon: <Users className="text-green-600 w-10 h-10" />,
              title: "Reach More Customers",
              desc: "Your store will be visible to thousands of buyers every day.",
            },
            {
              icon: <Truck className="text-green-600 w-10 h-10" />,
              title: "Easy Deliveries",
              desc: "Integrated delivery options to get your products to customers fast.",
            },
            {
              icon: <ShoppingBag className="text-green-600 w-10 h-10" />,
              title: "Manage Easily",
              desc: "Track orders, update products, and control your store from anywhere.",
            },
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              step: "1",
              title: "Sign Up",
              desc: "Create your Muuza account and fill in store details.",
            },
            {
              step: "2",
              title: "Add Products",
              desc: "Upload products with images, descriptions, and prices.",
            },
            {
              step: "3",
              title: "Start Selling",
              desc: "Your store goes live and customers start ordering!",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow text-center"
            >
              <div className="text-4xl font-bold text-green-600 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-green-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Selling on Muuza?
        </h2>
        <p className="max-w-2xl mx-auto mb-6">
          It takes less than 5 minutes to set up your store.
        </p>
        <Link href="/get-store/register-business">
          <Button size="lg" className="bg-white text-green-700 font-semibold">
            Get Started Now
          </Button>
        </Link>
      </section>
    </main>
  );
}
