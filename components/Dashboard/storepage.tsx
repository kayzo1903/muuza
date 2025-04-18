// app/dashboard/store/page.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function MyStorePage() {
  const [storeInfo, setStoreInfo] = useState({
    name: "",
    bio: "",
    description: "",
    isOpen: true,
    status: "active",
    specialOffer: "",
    openingHours: "",
    themeColor: "",
    phone: "",
    location: "",
    mapUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setStoreInfo((prev) => ({ ...prev, isOpen: checked }));
  };

  const handleSubmit = () => {
    console.log("Submitting store info:", storeInfo);
    // TODO: submit to backend
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Customize Your Store</h1>

      <Card>
        <CardHeader>
          <CardTitle>Store Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Store Name</Label>
            <Input
              name="name"
              value={storeInfo.name}
              onChange={handleChange}
              placeholder="e.g. Mama John's Kitchen"
            />
          </div>

          <div>
            <Label>Short Bio</Label>
            <Input
              name="bio"
              value={storeInfo.bio}
              onChange={handleChange}
              placeholder="e.g. Home of the best biryani"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={storeInfo.description}
              onChange={handleChange}
              placeholder="Tell your customers about your store..."
            />
          </div>

          <div>
            <Label>Special Offer (Optional)</Label>
            <Input
              name="specialOffer"
              value={storeInfo.specialOffer}
              onChange={handleChange}
              placeholder="e.g. 10% off on Fridays"
            />
          </div>

          <div>
            <Label>Opening Hours</Label>
            <Input
              name="openingHours"
              value={storeInfo.openingHours}
              onChange={handleChange}
              placeholder="e.g. Mon–Sat: 9am–9pm"
            />
          </div>

          <div>
            <Label>Theme Color (Optional)</Label>
            <Input
              name="themeColor"
              value={storeInfo.themeColor}
              onChange={handleChange}
              placeholder="e.g. #FF6347"
              type="color"
              className="w-16 h-10 p-1"
            />
          </div>

          <div className="flex items-center gap-4">
            <Label>Store Open?</Label>
            <Switch checked={storeInfo.isOpen} onCheckedChange={handleSwitchChange} />
          </div>

          <Separator />

          <div>
            <Label>Phone Number</Label>
            <Input
              name="phone"
              value={storeInfo.phone}
              onChange={handleChange}
              placeholder="e.g. +255 712 345 678"
            />
          </div>

          <div>
            <Label>Store Location</Label>
            <Input
              name="location"
              value={storeInfo.location}
              onChange={handleChange}
              placeholder="e.g. Kariakoo, Dar es Salaam"
            />
          </div>

          <div>
            <Label>Google Map Embed URL (Optional)</Label>
            <Input
              name="mapUrl"
              value={storeInfo.mapUrl}
              onChange={handleChange}
              placeholder="Paste Google Maps embed link here"
            />
          </div>

          {storeInfo.mapUrl && (
            <div className="rounded-md overflow-hidden">
              <iframe
                src={storeInfo.mapUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          )}

          <div>
            <Label>Profile Picture / Logo</Label>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" /> Upload Logo
            </Button>
          </div>

          <Button onClick={handleSubmit} className="mt-4">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
