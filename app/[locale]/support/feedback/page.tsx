import Feedback from "@/components/feedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "feedback",
};

export default function FeedbackPage() {
  return (
    <main className="w-full">
      <Feedback />
    </main>
  );
}
