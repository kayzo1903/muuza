// app/dashboard/account/page.tsx

"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Upload } from "lucide-react";

export default function MyAccount() {
  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    email: "user@example.com", // from OAuth provider, read-only
    profilePic: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile:", profile);
    // TODO: send data to backend
  };

  return (
    <div className="p-6 space-y-6 pt-24 lg:pt-8">
      <h1 className="text-2xl font-bold">Manage Account</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="e.g. +255 712 345 678"
            />
          </div>

          <div>
            <Label>Email (read-only)</Label>
            <Input
              value={profile.email}
              disabled
            />
          </div>

          <div>
            <Label>Upload Profile Picture</Label>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" /> Upload
            </Button>
          </div>

          <Button onClick={handleSave} className="mt-4">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Address</Label>
            <Input
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Street, City, Region"
            />
          </div>
          <Button onClick={handleSave} className="mt-2">Save Address</Button>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-4">
        <Button variant="destructive">Logout</Button>
        {/* Optionally add delete account button here */}
      </div>
    </div>
  );
}
