"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Send,
  Star,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  HelpCircle,
  Clock,
  Mail,
  Phone,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

export default function Feedback() {
  const [rating, setRating] = useState<number>(0);
  const [feedbackType, setFeedbackType] = useState<string>("suggestion");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [recommend, setRecommend] = useState("yes");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      feedbackType,
      rating,
      recommend,
    };

    console.log("Submitted Feedback:", data);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Section */}
          <div className="text-center mb-8">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Thank You for Your Feedback!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Your feedback helps us make Muuza even better.
            </p>
          </div>

          <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-0">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our team will review your submission and use it to improve our
                platform. Thank you for helping us grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl">
                    Return Home
                  </Button>
                </Link>
                <Link href="/support">
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl"
                  >
                    Contact Support
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Clock className="h-10 w-10 text-yellow-500 mx-auto" />,
                title: "Response Time",
                desc: "We usually respond within 2-3 business days.",
              },
              {
                icon: <Mail className="h-10 w-10 text-green-500 mx-auto" />,
                title: "Email Updates",
                desc: "You may receive updates about your feedback and upcoming features.",
              },
              {
                icon: <HelpCircle className="h-10 w-10 text-blue-500 mx-auto" />,
                title: "Need Immediate Help?",
                desc: (
                  <>
                    Visit our{" "}
                    <Link
                      href="/support"
                      className="text-yellow-500 hover:underline"
                    >
                      support center
                    </Link>{" "}
                    for urgent issues.
                  </>
                ),
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md text-center p-6"
              >
                <div className="mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
            <MessageSquare className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Share Your Feedback
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Help us improve by sharing your thoughts and suggestions
          </p>
        </div>

        {/* Feedback Form */}
        <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-0">
          <CardHeader>
            <CardTitle>Tell Us What You Think</CardTitle>
            <CardDescription>
              Your feedback helps us improve Muuza for everyone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Feedback Type */}
              <div className="space-y-2">
                <Label>Type of Feedback</Label>
                <Select value={feedbackType} onValueChange={setFeedbackType}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Choose type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="praise">Praise</SelectItem>
                    <SelectItem value="question">Question</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>How would you rate your experience?</Label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 transition ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 hover:text-yellow-400"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {rating === 0 ? "Select rating" : `${rating}/5 stars`}
                  </span>
                </div>
              </div>

              {/* Name and Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name (Optional)</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Feedback Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Your Feedback</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Share your suggestions, concerns, or praise..."
                  rows={5}
                  required
                  className="resize-none rounded-xl"
                />
              </div>

              {/* Recommend Section */}
              <div className="space-y-2">
                <Label>Would you recommend Muuza?</Label>
                <RadioGroup
                  value={recommend}
                  onValueChange={setRecommend}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="recommend-yes" />
                    <Label
                      htmlFor="recommend-yes"
                      className="flex items-center cursor-pointer"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1 text-green-500" /> Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="recommend-no" />
                    <Label
                      htmlFor="recommend-no"
                      className="flex items-center cursor-pointer"
                    >
                      <ThumbsDown className="h-4 w-4 mr-1 text-red-500" /> No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 rounded-xl"
                size="lg"
              >
                Send Feedback
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Other Ways to Reach Us
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ),
                  title: "Email Support",
                  detail: "support@muuza.com",
                  sub: "Typically responds within 24 hours",
                },
                {
                  icon: (
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  ),
                  title: "Phone Support",
                  detail: "+255 712 345 678",
                  sub: "Mon-Fri, 8am-6pm EAT",
                },
              ].map(({ icon, title, detail, sub }, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800">
                      {icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{detail}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What Happens Next?
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "We Review Your Feedback",
                  desc: "Our team carefully reviews every submission.",
                  color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600",
                },
                {
                  step: 2,
                  title: "We Prioritize",
                  desc: "Common requests are prioritized for development.",
                  color: "bg-green-100 dark:bg-green-900/30 text-green-600",
                },
                {
                  step: 3,
                  title: "We Implement Changes",
                  desc: "Your feedback shapes Muuza's roadmap.",
                  color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
                },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="flex">
                  <div className="flex-shrink-0">
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-full ${color}`}
                    >
                      {step}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
