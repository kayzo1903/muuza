import Help from "@/components/help";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "help",
};

export default function HelpPage() {
  return (
    <main className="w-full">
      <Help />
    </main>
  );
}
