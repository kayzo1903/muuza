"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  CheckCircle,
  MapPin,
  Clock,
  Phone,
  Utensils,
  X,
} from "lucide-react";

// Zod schemas for each step
const basicInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  tagline: z.string().min(5, "Tagline must be at least 5 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

const contactInfoSchema = z.object({
  location: z.string().min(5, "Please enter a valid address"),
  phone: z
    .string()
    .min(9, "Please enter a valid phone number")
    .regex(/^[0-9]{9,15}$/, "Please enter a valid phone number"),
  countryCode: z.string().min(1, "Please select a country code"),
  openingTime: z.string().min(1, "Please select opening time"),
  closingTime: z.string().min(1, "Please select closing time"),
});

// Cuisine schema fix
const cuisineInfoSchema = z.object({
  cuisine: z
    .array(z.string())
    .min(1, "Please select at least one cuisine type"),
});

// Logo schema fix
const mediaSchema = z.object({
  logo: z.instanceof(File).optional().nullable(),
});

// Combined schema
const restaurantSchema = basicInfoSchema
  .merge(contactInfoSchema)
  .merge(cuisineInfoSchema)
  .merge(mediaSchema);

type RestaurantFormData = z.infer<typeof restaurantSchema>;

const cuisineOptions = [
  "Swahili",
  "Seafood",
  "Grilled",
  "African",
  "Indian",
  "Chinese",
  "Italian",
  "Fast Food",
  "Vegetarian",
  "Desserts",
  "Breakfast",
  "Barbecue",
];

// Country codes with flags
const countryCodes = [
  { code: "+255", country: "Tanzania", flag: "🇹🇿" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
];

// Generate time options for select
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      times.push(timeString);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

export default function SellerRegistration() {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<Partial<RestaurantFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    setError,
  } = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      openingTime: "08:00",
      closingTime: "22:00",
      countryCode: "+255", // Default to Tanzania
      ...formData,
    },
  });

  const currentCuisines = watch("cuisine", []) || [];
  const phoneValue = watch("phone");
  const countryCodeValue = watch("countryCode");
  const openingTimeValue = watch("openingTime");
  const closingTimeValue = watch("closingTime");

  // Toggle cuisine fix
  const toggleCuisine = (cuisine: string) => {
    const updatedCuisines: string[] = currentCuisines.includes(cuisine)
      ? currentCuisines.filter((c) => c !== cuisine)
      : [...currentCuisines, cuisine];

    setValue("cuisine", updatedCuisines as string[], { shouldValidate: true });
  };

  // Logo upload fix
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("logo", { message: "Please upload an image file" });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError("logo", { message: "File size must be less than 2MB" });
        return;
      }

      setValue("logo", file ?? null, { shouldValidate: true });

      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setValue("logo", undefined);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const nextStep = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await trigger(["name", "tagline", "bio"]);
    } else if (step === 2) {
      isValid = await trigger([
        "location",
        "phone",
        "countryCode",
        "openingTime",
        "closingTime",
      ]);
    } else if (step === 3) {
      isValid = await trigger(["cuisine"]);
    } else if (step === 4) {
      // Logo is optional, so we don't need to validate it
      isValid = true;
    }

    if (isValid) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step]);
      }
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: RestaurantFormData) => {
    console.log("Form submitted:", data);
    setFormData(data);
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering your restaurant. We&apos;ll review your
            application and contact you within 24 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="w-full">
            Submit Another Restaurant
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Register Your Restaurant</h1>
        <p className="text-gray-600 mb-8">
          Join our platform and start reaching thousands of food lovers in East
          Africa
        </p>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stepNumber < step || completedSteps.includes(stepNumber)
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {stepNumber < step || completedSteps.includes(stepNumber) ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  stepNumber
                )}
              </div>
              <div className="text-xs mt-2 text-center capitalize">
                {stepNumber === 1 && "Basic Info"}
                {stepNumber === 2 && "Contact"}
                {stepNumber === 3 && "Cuisine"}
                {stepNumber === 4 && "Logo"}
                {stepNumber === 5 && "Review"}
              </div>
            </div>
          ))}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <div
              className="h-0.5 bg-yellow-500 transition-all duration-300"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Restaurant Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="e.g. Swahili Bites"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="tagline">Tagline *</Label>
                  <Input
                    id="tagline"
                    {...register("tagline")}
                    placeholder="e.g. Authentic Coastal Cuisine"
                    className={errors.tagline ? "border-red-500" : ""}
                  />
                  {errors.tagline && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.tagline.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bio">Description *</Label>
                  <Textarea
                    id="bio"
                    {...register("bio")}
                    placeholder="Tell us about your restaurant..."
                    rows={4}
                    className={errors.bio ? "border-red-500" : ""}
                  />
                  {errors.bio && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bio.message}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Address *
                  </Label>
                  <Input
                    id="location"
                    {...register("location")}
                    placeholder="e.g. Kunduchi, Dar es Salaam"
                    className={errors.location ? "border-red-500" : ""}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </Label>
                  <div className="flex gap-2">
                    <div className="w-1/3">
                      <select
                        {...register("countryCode")}
                        className="w-full p-2 border rounded-md focus:ring-yellow-500 focus:border-yellow-500 h-10"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-2/3">
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="712345678"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Your number: {countryCodeValue} {phoneValue || "XXXXXXX"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="openingTime">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Opening Time *
                    </Label>
                    <select
                      id="openingTime"
                      {...register("openingTime")}
                      className="w-full p-2 border rounded-md focus:ring-yellow-500 focus:border-yellow-500 h-10"
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.openingTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.openingTime.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="closingTime">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Closing Time *
                    </Label>
                    <select
                      id="closingTime"
                      {...register("closingTime")}
                      className="w-full p-2 border rounded-md focus:ring-yellow-500 focus:border-yellow-500 h-10"
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.closingTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.closingTime.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Opening Hours:</strong> {openingTimeValue} -{" "}
                    {closingTimeValue}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Cuisine Type */}
          {step === 3 && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">
                <Utensils className="w-5 h-5 inline mr-2" />
                Cuisine Types *
              </h2>
              <div>
                <Label>Select the cuisine types you serve</Label>
                {errors.cuisine && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cuisine.message}
                  </p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  {cuisineOptions.map((cuisine) => (
                    <div
                      key={cuisine}
                      onClick={() => toggleCuisine(cuisine)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        currentCuisines.includes(cuisine)
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-200 hover:border-yellow-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                            currentCuisines.includes(cuisine)
                              ? "bg-yellow-500 border-yellow-500"
                              : "border-gray-300"
                          }`}
                        >
                          {currentCuisines.includes(cuisine) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span>{cuisine}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Step 4: Logo Upload */}
          {step === 4 && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Restaurant Logo</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="logo">Upload Logo (Optional)</Label>
                  <p className="text-sm text-gray-500 mb-4">
                    Add your restaurant logo. You can add a cover image later in
                    your dashboard.
                  </p>

                  <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />

                  {logoPreview ? (
                    <div className="mt-4">
                      <div className="relative inline-block">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="logo"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload logo
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG up to 2MB
                      </p>
                    </label>
                  )}

                  {errors.logo && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.logo.message}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">
                Review Your Information
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">
                    Basic Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold">{watch("name")}</p>
                    <p className="text-gray-600">{watch("tagline")}</p>
                    <p className="mt-2 text-sm">{watch("bio")}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">
                    Contact Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {watch("location")}
                    </p>
                    <p className="flex items-center gap-2 mt-2">
                      <Phone className="w-4 h-4" />
                      {countryCodeValue} {watch("phone")}
                    </p>
                    <p className="flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4" />
                      {watch("openingTime")} - {watch("closingTime")}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">
                    Cuisine Types
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {watch("cuisine")?.map((cuisine) => (
                      <span
                        key={cuisine}
                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Logo</h3>
                  <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-32 h-32 object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">
                        No logo uploaded (you can add one later)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {step < 5 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Submit Registration
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
