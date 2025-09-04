// app/support/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Mail, Phone, MessageSquare, ArrowRight, Clock, Search } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-gradient-to-br from-emerald-900/80 via-emerald-800/80 to-teal-700/80 text-white py-20 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/Hero/support-cta-bg.jpg')",
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
            <MessageSquare className="w-4 h-4 mr-2" />
            <span className="text-sm">24/7 Support Available</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            How Can We Help You Today?
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl mb-8 text-emerald-100">
            Get answers to your questions and solutions to your problems with our dedicated support team.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search for help articles..." 
                className="pl-12 pr-4 py-6 rounded-2xl border-none shadow-lg"
              />
            </div>
          </div>
          
          <a href="#contact-form">
            <Button
              size="lg"
              className="bg-white text-emerald-700 font-semibold hover:bg-gray-100 py-6 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              Contact Support
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Quick answers to common questions
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                q: "How do I create my store?",
                a: "Go to the Get Store page, click 'Create My Store', and fill out your business details.",
                icon: <HelpCircle className="w-6 h-6 text-emerald-600" />
              },
              {
                q: "How can I reset my password?",
                a: "Click 'Forgot Password' on the login page, and follow the instructions sent to your email.",
                icon: <HelpCircle className="w-6 h-6 text-emerald-600" />
              },
              {
                q: "What are the seller fees?",
                a: "We charge a small commission on sales. There are no monthly fees or hidden charges.",
                icon: <HelpCircle className="w-6 h-6 text-emerald-600" />
              },
              {
                q: "How do I manage my inventory?",
                a: "Use your seller dashboard to add, edit, and track your products with our intuitive tools.",
                icon: <HelpCircle className="w-6 h-6 text-emerald-600" />
              },
              {
                q: "How do payments work?",
                a: "We process payments securely and transfer earnings to your account regularly.",
                icon: <HelpCircle className="w-6 h-6 text-emerald-600" />
              },
              {
                q: "How can I contact customer support?",
                a: "You can use the form below or reach us via email and phone during business hours.",
                icon: <HelpCircle className="w-6 h-6 text-emerald-600" />
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    {faq.icon}
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-emerald-600 transition-colors">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact-form"
        className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-3xl font-bold text-center mb-2">
              Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
              Fill out the form below and we&apos;ll get back to you as soon as possible
            </p>
            
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <Input id="subject" placeholder="What is this regarding?" required />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="How can we help you?" 
                  rows={5} 
                  required 
                  className="resize-none"
                />
              </div>
              
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl font-semibold text-base"
                size="lg"
              >
                Send Message
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-300">support@muuza.com</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Typically replies within 24 hours</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-600 dark:text-gray-300">+255 712 345 678</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-1" /> Mon-Fri, 8am-6pm EAT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer with Background Image */}
      <section 
        className="relative py-20 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/Hero/support-cta-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-emerald-900/80"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-white">Still Need Help?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-emerald-100">
            Our dedicated support team is here to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-store">
              <Button size="lg" className="bg-white text-emerald-700 font-semibold hover:bg-gray-100 py-6 px-8 rounded-xl">
                Open My Store
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 py-6 px-8 rounded-xl"
            >
              Visit Help Center
            </Button>
          </div>
          
          {/* Additional Support Options */}
          <div className="mt-12 pt-8 border-t border-emerald-400/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-emerald-100">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <p className="font-medium">Live Chat</p>
                <p className="text-sm">Available 24/7</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm">response within 24h</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="font-medium">Phone Support</p>
                <p className="text-sm">Mon-Fri, 8am-6pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}