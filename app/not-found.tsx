// app/not-found.tsx
import { Button } from "@/components/ui/button";
import {  ArrowLeft, HomeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo/muuzalogo.png" // Replace with your logo path
            alt="App Logo"
            width={180}
            height={120}
            className="mx-auto"
          />
        </div>

        {/* 404 Message */}
        <h1 className="text-9xl font-bold text-green-500 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="javascript:history.back()" className="block">
            <Button className="w-full bg-gray-700 text-white hover:bg-gray-800 py-3 text-lg">
              <ArrowLeft className="inline-block mr-2" /> Go Back
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button className="w-full bg-gray-700 text-white hover:bg-gray-800 py-3 text-lg">
              <HomeIcon className="inline-block mr-2" /> Go Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
