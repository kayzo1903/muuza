// app/dashboard/help/page.tsx

"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function Help() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Help & Feedback</h1>

      {/* Feedback Form */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Your Name</Label>
            <Input placeholder="e.g. John Doe" />
          </div>

          <div>
            <Label>Type of Feedback</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suggestion">Suggestion</SelectItem>
                <SelectItem value="issue">Bug Report</SelectItem>
                <SelectItem value="question">General Question</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Message</Label>
            <Textarea placeholder="Share your thoughts with us..." />
          </div>

          <Button>Send Message</Button>
        </CardContent>
      </Card>

      {/* Real-Time Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need Quick Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">You can chat with us directly for urgent issues.</p>
          <Link href="https://wa.me/255700000000" target="_blank">
            <Button variant="outline">💬 WhatsApp Support</Button>
          </Link>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground">Q: How do I add a new product?</p>
            <p>A: Go to your dashboard, click &quot;Add Product&quot; and fill in the details.</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Q: Can I edit my store after publishing?</p>
            <p>A: Yes! Use the “My Store” page to make updates anytime.</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Q: How do I contact support?</p>
            <p>A: Use this form or reach us directly on WhatsApp.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
