import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Truck, Users, ShoppingBag, Star, ArrowRight, CheckCircle, BarChart3, Shield, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "create store",
};

export default function GetStorePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with background image */}
      <section 
        className="relative bg-gradient-to-br from-emerald-900/80 via-emerald-800/80 to-teal-700/80 text-white py-20 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/Hero/background01.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-black"></div>
        
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">Trusted by 10,000+ sellers</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Launch Your Online Store <br className="hidden md:block" /> in Minutes
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl mb-8 text-emerald-100">
            Join fastest-growing marketplace. Everything you need to start, run, and grow your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/profile/get-store/register-business" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-gray-100 font-semibold text-base py-6 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                Start Selling Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10 py-6 px-8 rounded-xl">
              Watch Demo
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
                <span>No monthly fees</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
                <span>Free onboarding</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
                <span>Commission-only</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We provide all the tools and support to help your business thrive online
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Users className="w-12 h-12 text-emerald-600" />,
                title: "Reach Millions of Customers",
                desc: "Get immediate access to our growing community of active shoppers across Kenya.",
                features: ["Targeted visibility", "Customer reviews", "Marketing tools"]
              },
              {
                icon: <Truck className="w-12 h-12 text-emerald-600" />,
                title: "Seamless Delivery Solutions",
                desc: "Integrated logistics partners to deliver your products quickly and reliably.",
                features: ["Nationwide coverage", "Delivery tracking", "Affordable rates"]
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-emerald-600" />,
                title: "Powerful Business Insights",
                desc: "Understand your customers and optimize your sales with detailed analytics.",
                features: ["Sales reports", "Customer analytics", "Performance metrics"]
              },
              {
                icon: <ShoppingBag className="w-12 h-12 text-emerald-600" />,
                title: "Easy Store Management",
                desc: "Intuitive tools to manage inventory, orders, and payments all in one place.",
                features: ["Inventory management", "Order tracking", "Secure payments"]
              },
              {
                icon: <Shield className="w-12 h-12 text-emerald-600" />,
                title: "Secure Transactions",
                desc: "Buyer and seller protection with our secure payment system.",
                features: ["Safe transactions", "Timely payments", "Dispute resolution"]
              },
              {
                icon: <Star className="w-12 h-12 text-emerald-600" />,
                title: "Seller Support",
                desc: "Dedicated support team to help you succeed at every step of your journey.",
                features: ["1-on-1 guidance", "Seller community", "Resources & training"]
              }
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl w-max">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {benefit.desc}
                </p>
                <ul className="space-y-2">
                  {benefit.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Start Selling in 3 Simple Steps</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our streamlined process gets your store up and running quickly
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {[
              {
                step: "01",
                title: "Create Your Seller Account",
                desc: "Sign up with your email and basic business information. Verification takes less than 24 hours.",
                icon: <User className="w-8 h-8" />,
                color: "bg-blue-500"
              },
              {
                step: "02",
                title: "Set Up Your Store",
                desc: "Customize your storefront, add your products, and set up payment and shipping options.",
                icon: <ShoppingBag className="w-8 h-8" />,
                color: "bg-emerald-500"
              },
              {
                step: "03",
                title: "Start Selling",
                desc: "Go live and start receiving orders. Our team will guide you through your first sales.",
                icon: <BarChart3 className="w-8 h-8" />,
                color: "bg-amber-500"
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col group hover:shadow-xl transition-all duration-300"
              >
                <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6`}>
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {item.desc}
                </p>
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className={`w-10 h-1 ${item.color} rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/get-store/register-business">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 px-8 rounded-xl text-base">
                Begin Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories from Our Sellers</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Hear from entrepreneurs who have grown their businesses with Muuza
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  &quot;Since joining Muuza, my sales have increased by 200%. The platform is easy to use and their seller support is exceptional.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Sarah Kimani</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fashion Store Owner</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section with background image */}
      <section 
        className="py-20 px-6 text-white relative"
        style={{
          backgroundImage: "url('/Hero/background01.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-black"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-emerald-100">
            Join thousands of successful sellers on  most trusted marketplace
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile/get-store/register-business">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 font-semibold py-6 px-8 rounded-xl">
                Create Your Store Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 py-6 px-8 rounded-xl">
              Contact Sales Team
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-10 text-sm text-emerald-100">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
              <span>First 30 days commission-free</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
              <span>Dedicated account manager</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}