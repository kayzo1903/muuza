// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   ArrowLeft,
//   ArrowRight,
//   CheckCircle2,
//   MapPin,
//   Building2,
//   Phone,
//   Upload,
//   Store,
//   ShieldCheck,
// } from "lucide-react";
// // If you use next-auth, uncomment:
// // import { useSession } from "next-auth/react";

// // -----------------------------
// // Step Schemas
// // -----------------------------
// const phoneRegex = /^\+?[1-9]\d{7,14}$/; // basic E.164 validation

// const Step1Schema = z.object({
//   phone: z
//     .string()
//     .regex(phoneRegex, "Enter a valid phone number with country code (e.g. +255712345678)"),
//   otp: z.string().min(6, "Enter the 6‑digit code").max(6, "Enter the 6‑digit code"),
// });

// const Step2Schema = z.object({
//   businessName: z.string().min(2, "Business name is required"),
//   businessType: z.enum(["individual", "company"], {
//     required_error: "Select a business type",
//   }),
//   category: z.enum([
//     "traditional-dishes",
//     "baked-goods",
//     "drinks",
//     "snacks",
//     "fresh-produce",
//     "catering",
//   ], { required_error: "Select a category" }),
//   tin: z.string().optional(),
// });

// const Step3Schema = z.object({
//   addressStreet: z.string().min(2, "Street is required"),
//   addressCity: z.string().min(2, "City is required"),
//   addressRegion: z.string().min(2, "Region is required"),
//   addressPostal: z.string().optional(),
//   addressLandmark: z.string().optional(),
//   fulfillmentPickup: z.boolean().default(true),
//   fulfillmentDelivery: z.boolean().default(true),
//   deliveryRadiusKm: z
//     .preprocess((v) => (v === "" || v === null ? undefined : Number(v)), z.number().min(1).max(100).optional()),
// });

// const Step4Schema = z.object({
//   storeDescription: z.string().min(20, "Tell customers what makes your food special (min 20 chars)"),
//   storeLogoUrl: z.string().url("Provide a valid image URL").optional(),
// });

// const TermsSchema = z.object({ acceptedTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }) });

// // -----------------------------
// // Types
// // -----------------------------
// export type CreateStorePayload = {
//   phone: string;
//   businessName: string;
//   businessType: "individual" | "company";
//   category: string;
//   tin?: string;
//   address: {
//     street: string;
//     city: string;
//     region: string;
//     postalCode?: string;
//     landmark?: string;
//   };
//   fulfillment: {
//     pickup: boolean;
//     delivery: boolean;
//     deliveryRadiusKm?: number;
//   };
//   branding: {
//     description: string;
//     logoUrl?: string;
//   };
// };

// // -----------------------------
// // Helper Components
// // -----------------------------
// function StepBadge({ index, active, done, label }: { index: number; active: boolean; done: boolean; label: string }) {
//   return (
//     <div className="flex items-center gap-2">
//       <div
//         className={
//           "h-7 w-7 rounded-full grid place-items-center text-sm font-semibold border " +
//           (done
//             ? "bg-green-500 text-white border-green-500"
//             : active
//             ? "bg-yellow-500 text-white border-yellow-500"
//             : "bg-gray-100 dark:bg-gray-800 text-gray-500 border-gray-300 dark:border-gray-700")
//         }
//       >
//         {done ? <CheckCircle2 className="h-4 w-4" /> : index}
//       </div>
//       <span className={active ? "font-medium" : "text-muted-foreground"}>{label}</span>
//     </div>
//   );
// }

// function NavButtons({ onBack, onNext, nextDisabled, isLast }: { onBack?: () => void; onNext?: () => void; nextDisabled?: boolean; isLast?: boolean }) {
//   return (
//     <div className="flex items-center justify-between pt-4">
//       <Button variant="outline" onClick={onBack} disabled={!onBack}>
//         <ArrowLeft className="mr-2 h-4 w-4" /> Back
//       </Button>
//       <Button onClick={onNext} disabled={!!nextDisabled}>
//         {isLast ? "Submit for Review" : "Next"}
//         <ArrowRight className="ml-2 h-4 w-4" />
//       </Button>
//     </div>
//   );
// }

// // -----------------------------
// // Page Component
// // -----------------------------
// export default function CreateStorePage() {
//   const router = useRouter();
//   // const { data: session, status } = useSession();
//   // Demo: mock buyer info; replace with session.user
//   const buyer = { name: "Asha M.", email: "asha@example.com", phone: "" };

//   const [step, setStep] = useState(1);
//   const [sending, setSending] = useState(false);
//   const [verifying, setVerifying] = useState(false);
//   const [phoneVerified, setPhoneVerified] = useState(false);
//   const [logoPreview, setLogoPreview] = useState<string | undefined>(undefined);

//   // ------------- Step 1: Phone + OTP -------------
//   const step1 = useForm<z.infer<typeof Step1Schema>>({
//     resolver: zodResolver(Step1Schema),
//     defaultValues: { phone: buyer.phone || "", otp: "" },
//     mode: "onChange",
//   });

//   const sendOtp = async () => {
//     const phone = step1.getValues("phone");
//     const result = z.string().regex(phoneRegex).safeParse(phone);
//     if (!result.success) {
//       step1.trigger("phone");
//       return;
//     }
//     try {
//       setSending(true);
//       // TODO: call your backend: await fetch("/api/otp/send", { method: "POST", body: JSON.stringify({ phone }) })
//       await new Promise((r) => setTimeout(r, 800));
//     } finally {
//       setSending(false);
//     }
//   };

//   const verifyOtp = async () => {
//     const valid = await step1.trigger();
//     if (!valid) return;
//     try {
//       setVerifying(true);
//       // TODO: call your backend to verify
//       await new Promise((r) => setTimeout(r, 800));
//       setPhoneVerified(true);
//     } finally {
//       setVerifying(false);
//     }
//   };

//   // ------------- Step 2: Business Basics -------------
//   const step2 = useForm<z.infer<typeof Step2Schema>>({
//     resolver: zodResolver(Step2Schema),
//     defaultValues: { businessType: "individual" },
//     mode: "onChange",
//   });

//   // ------------- Step 3: Location & Fulfillment -------------
//   const step3 = useForm<z.infer<typeof Step3Schema>>({
//     resolver: zodResolver(Step3Schema),
//     defaultValues: { fulfillmentPickup: true, fulfillmentDelivery: true },
//     mode: "onChange",
//   });

//   // ------------- Step 4: Branding -------------
//   const step4 = useForm<z.infer<typeof Step4Schema>>({
//     resolver: zodResolver(Step4Schema),
//     mode: "onChange",
//   });

//   const [acceptedTerms, setAcceptedTerms] = useState(false);

//   const canGoNext = useMemo(() => {
//     if (step === 1) return phoneVerified; // lock step 1 until phone verified
//     if (step === 2) return step2.formState.isValid;
//     if (step === 3) return step3.formState.isValid;
//     if (step === 4) return step4.formState.isValid;
//     return false;
//   }, [step, phoneVerified, step2.formState.isValid, step3.formState.isValid, step4.formState.isValid]);

//   useEffect(() => {
//     // Optional: if not logged in, redirect to sign-in
//     // if (status === "unauthenticated") router.push("/auth/signin");
//   }, []);

//   const handleSubmitAll = async () => {
//     const terms = TermsSchema.safeParse({ acceptedTerms });
//     if (!terms.success) {
//       alert(terms.error.errors[0].message);
//       return;
//     }

//     const p1 = Step1Schema.parse(step1.getValues());
//     const p2 = Step2Schema.parse(step2.getValues());
//     const p3 = Step3Schema.parse(step3.getValues());
//     const p4 = Step4Schema.parse(step4.getValues());

//     const payload: CreateStorePayload = {
//       phone: p1.phone,
//       businessName: p2.businessName,
//       businessType: p2.businessType,
//       category: p2.category,
//       tin: p2.tin || undefined,
//       address: {
//         street: p3.addressStreet,
//         city: p3.addressCity,
//         region: p3.addressRegion,
//         postalCode: p3.addressPostal || undefined,
//         landmark: p3.addressLandmark || undefined,
//       },
//       fulfillment: {
//         pickup: p3.fulfillmentPickup,
//         delivery: p3.fulfillmentDelivery,
//         deliveryRadiusKm: p3.deliveryRadiusKm,
//       },
//       branding: {
//         description: p4.storeDescription,
//         logoUrl: p4.storeLogoUrl,
//       },
//     };

//     // TODO: send to backend
//     // const res = await fetch("/api/seller/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
//     // if (!res.ok) { /* handle error */ }

//     router.push("/dashboard/store/pending");
//   };

//   return (
//     <div className="p-6 pt-24 lg:pt-8 max-w-3xl mx-auto space-y-6">
//       <div className="flex items-center gap-3">
//         <Store className="h-6 w-6 text-yellow-600" />
//         <h1 className="text-2xl font-bold">Create Your Store</h1>
//       </div>
//       <p className="text-muted-foreground">You're signed in as a buyer. Complete these steps to become a seller.</p>

//       {/* Stepper */}
//       <Card className="border-0 shadow-none">
//         <CardContent className="p-4">
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//             <StepBadge index={1} active={step === 1} done={step > 1} label="Verify phone" />
//             <StepBadge index={2} active={step === 2} done={step > 2} label="Business basics" />
//             <StepBadge index={3} active={step === 3} done={step > 3} label="Location & delivery" />
//             <StepBadge index={4} active={step === 4} done={step > 4} label="Branding" />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Panels */}
//       {step === 1 && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5 text-green-600" /> Verify your phone</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <p className="text-sm text-muted-foreground">We require a verified phone number for order coordination and safety.</p>
//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone number (with country code)</Label>
//               <Input id="phone" placeholder="e.g. +255712345678" {...step1.register("phone")} />
//               {step1.formState.errors.phone && (
//                 <p className="text-sm text-red-500">{step1.formState.errors.phone.message}</p>
//               )}
//             </div>
//             <div className="flex items-center gap-2">
//               <Button type="button" variant="outline" onClick={sendOtp} disabled={sending}>
//                 Send Code
//               </Button>
//               <span className="text-xs text-muted-foreground">We'll text you a 6‑digit OTP.</span>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="otp">Enter 6‑digit code</Label>
//               <Input id="otp" maxLength={6} placeholder="••••••" {...step1.register("otp")} />
//               {step1.formState.errors.otp && (
//                 <p className="text-sm text-red-500">{step1.formState.errors.otp.message}</p>
//               )}
//             </div>
//             <div className="flex items-center gap-2">
//               <Button type="button" onClick={verifyOtp} disabled={verifying}>
//                 Verify
//               </Button>
//               {phoneVerified && (
//                 <span className="text-green-600 text-sm flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Verified</span>
//               )}
//             </div>
//             <NavButtons onNext={() => setStep(2)} nextDisabled={!phoneVerified} />
//           </CardContent>
//         </Card>
//       )}

//       {step === 2 && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-yellow-600" /> Business basics</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label>Business name</Label>
//               <Input placeholder="e.g. Asha Homemade Bites" {...step2.register("businessName")} />
//               {step2.formState.errors.businessName && (
//                 <p className="text-sm text-red-500">{step2.formState.errors.businessName.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label>Business type</Label>
//               <Select onValueChange={(v) => step2.setValue("businessType", v as any, { shouldValidate: true })}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="individual">Individual</SelectItem>
//                   <SelectItem value="company">Company</SelectItem>
//                 </SelectContent>
//               </Select>
//               {step2.formState.errors.businessType && (
//                 <p className="text-sm text-red-500">{step2.formState.errors.businessType.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label>What do you sell?</Label>
//               <Select onValueChange={(v) => step2.setValue("category", v as any, { shouldValidate: true })}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Choose a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="traditional-dishes">Traditional dishes</SelectItem>
//                   <SelectItem value="baked-goods">Baked goods</SelectItem>
//                   <SelectItem value="drinks">Drinks</SelectItem>
//                   <SelectItem value="snacks">Snacks</SelectItem>
//                   <SelectItem value="fresh-produce">Fresh produce</SelectItem>
//                   <SelectItem value="catering">Catering</SelectItem>
//                 </SelectContent>
//               </Select>
//               {step2.formState.errors.category && (
//                 <p className="text-sm text-red-500">{step2.formState.errors.category.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label>TIN (optional)</Label>
//               <Input placeholder="Tax ID (if registered)" {...step2.register("tin")} />
//             </div>

//             <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} nextDisabled={!step2.formState.isValid} />
//           </CardContent>
//         </Card>
//       )}

//       {step === 3 && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-green-600" /> Location & fulfillment</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Street</Label>
//                 <Input placeholder="Mwai Kibaki Rd" {...step3.register("addressStreet")} />
//                 {step3.formState.errors.addressStreet && (
//                   <p className="text-sm text-red-500">{step3.formState.errors.addressStreet.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label>City</Label>
//                 <Input placeholder="Dar es Salaam" {...step3.register("addressCity")} />
//                 {step3.formState.errors.addressCity && (
//                   <p className="text-sm text-red-500">{step3.formState.errors.addressCity.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label>Region</Label>
//                 <Input placeholder="Kinondoni" {...step3.register("addressRegion")} />
//                 {step3.formState.errors.addressRegion && (
//                   <p className="text-sm text-red-500">{step3.formState.errors.addressRegion.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label>Postal code (optional)</Label>
//                 <Input placeholder="14112" {...step3.register("addressPostal")} />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Landmark / directions (optional)</Label>
//               <Input placeholder="Opposite Mwenge Bus Stand" {...step3.register("addressLandmark")} />
//             </div>

//             <Separator />

//             <div className="grid sm:grid-cols-2 gap-4">
//               <div className="flex items-center gap-2">
//                 <input type="checkbox" id="pickup" className="h-4 w-4" defaultChecked onChange={(e) => step3.setValue("fulfillmentPickup", e.target.checked, { shouldValidate: true })} />
//                 <Label htmlFor="pickup">Customers can pick up</Label>
//               </div>
//               <div className="flex items-center gap-2">
//                 <input type="checkbox" id="delivery" className="h-4 w-4" defaultChecked onChange={(e) => step3.setValue("fulfillmentDelivery", e.target.checked, { shouldValidate: true })} />
//                 <Label htmlFor="delivery">You offer delivery</Label>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Delivery radius (km)</Label>
//               <Input type="number" min={1} max={100} placeholder="5" onChange={(e) => step3.setValue("deliveryRadiusKm", e.target.value === "" ? undefined : Number(e.target.value), { shouldValidate: true })} />
//             </div>

//             <NavButtons onBack={() => setStep(2)} onNext={() => setStep(4)} nextDisabled={!step3.formState.isValid} />
//           </CardContent>
//         </Card>
//       )}

//       {step === 4 && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2"><Upload className="h-5 w-5 text-yellow-600" /> Branding</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label>Store description</Label>
//               <Textarea rows={4} placeholder="Tell customers about your food, origins, and what makes it special" {...step4.register("storeDescription")} />
//               {step4.formState.errors.storeDescription && (
//                 <p className="text-sm text-red-500">{step4.formState.errors.storeDescription.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label>Logo image URL (temporary)</Label>
//               <Input placeholder="https://..." {...step4.register("storeLogoUrl")} onChange={(e) => {
//                 step4.register("storeLogoUrl").onChange(e);
//                 setLogoPreview(e.target.value || undefined);
//               }} />
//               {logoPreview && (
//                 <img src={logoPreview} alt="Logo preview" className="h-16 w-16 rounded-full border mt-2 object-cover" />
//               )}
//             </div>

//             <Separator />
//             <div className="flex items-center gap-2">
//               <input id="terms" type="checkbox" className="h-4 w-4" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
//               <Label htmlFor="terms" className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-600" /> I agree to the seller terms & food safety guidelines</Label>
//             </div>

//             <NavButtons onBack={() => setStep(3)} onNext={handleSubmitAll} nextDisabled={!step4.formState.isValid || !acceptedTerms} isLast />
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }
