"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Building2,
  User,
} from "lucide-react";
import Image from "next/image";

/* ---------------------------------------
   1. Business Category Options
--------------------------------------- */
const businessCategories = [
  {
    name: "Local",
    description: "Small scale businesses serving local communities",
    options: [
      "Street Food Vendor",
      "Food Cart",
      "Local Eatery",
      "Home Kitchen",
    ],
  },
  {
    name: "Regional",
    description: "Restaurants with multiple branches within a region",
    options: ["Casual Dining", "Family Restaurant", "Buffet", "Mid-size Chain"],
  },
  {
    name: "National",
    description: "Restaurants operating across the country",
    options: ["Fine Dining", "National Chain", "Franchise"],
  },
  {
    name: "International",
    description: "Restaurants with global presence",
    options: ["Global Chain", "High-End Franchise", "Luxury Dining"],
  },
];

/* ---------------------------------------
   2. Chef Category Options
--------------------------------------- */
const chefCategories = [
  {
    name: "Personal",
    description: "Independent chefs offering services to individuals or small groups",
    options: [
      "Private Chef",
      "Personal Chef",
      "Freelance Cook",
    ],
  },
  {
    name: "Event",
    description: "Chefs specializing in events and large gatherings",
    options: [
      "Catering",
      "Wedding Chef",
      "Corporate Event Chef",
    ],
  },
  {
    name: "Specialty",
    description: "Chefs with unique culinary expertise",
    options: [
      "Pastry Chef",
      "Grill Master",
      "Vegan Chef",
      "Sushi Chef",
    ],
  },
];

/* ---------------------------------------
   3. Zod Schema Definitions
--------------------------------------- */
const basicInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  tagline: z.string().min(5, "Tagline must be at least 5 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

const businessCategorySchema = z.object({
  businessCategory: z.string().min(1, "Please select a business category"),
  subCategory: z.string().min(1, "Please select a sub-category"),
});

const contactInfoSchema = z.object({
  location: z.string().min(5, "Please enter a valid address"),
  phone: z
    .string()
    .min(9, "Please enter a valid phone number")
    .regex(/^[0-9]{9,15}$/, "Please enter a valid phone number"),
  countryCode: z.string().min(1, "Please select a country code"),
  openingTime: z.string().optional(),
  closingTime: z.string().optional(),
});

const cuisineInfoSchema = z.object({
  cuisine: z
    .array(z.string())
    .min(1, "Please select at least one cuisine type"),
});

const mediaSchema = z.object({
  logo: z.instanceof(File).optional().nullable(),
});

const restaurantSchema = basicInfoSchema
  .merge(businessCategorySchema)
  .merge(contactInfoSchema)
  .merge(cuisineInfoSchema)
  .merge(mediaSchema);

type RestaurantFormData = z.infer<typeof restaurantSchema>;

/* ---------------------------------------
   4. Static Data
--------------------------------------- */
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

const countryCodes = [
  { code: "+255", country: "Tanzania", flag: "🇹🇿" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
];

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

/* ---------------------------------------
   5. Main Component
--------------------------------------- */
export default function SellerRegistration() {
  const [step, setStep] = useState(0); // Start with step 0 for registration type selection
  const [registrationType, setRegistrationType] = useState<"restaurant" | "chef" | null>(null);
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
      countryCode: "+255",
      ...formData,
    },
  });

  /* ----------------------------
     Watchers
  ---------------------------- */
  const currentCuisines = watch("cuisine", []) || [];
  const phoneValue = watch("phone");
  const countryCodeValue = watch("countryCode");
  const openingTimeValue = watch("openingTime");
  const closingTimeValue = watch("closingTime");
  const selectedBusinessCategory = watch("businessCategory");

  /* ----------------------------
     Functions
  ---------------------------- */
  const toggleCuisine = (cuisine: string) => {
    const updatedCuisines: string[] = currentCuisines.includes(cuisine)
      ? currentCuisines.filter((c) => c !== cuisine)
      : [...currentCuisines, cuisine];

    setValue("cuisine", updatedCuisines as string[], { shouldValidate: true });
  };

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

    if (step === 0) {
      if (!registrationType) return; // Can't proceed without selecting type
      isValid = true;
    } else if (step === 1) {
      isValid = await trigger(["name", "tagline", "bio"]);
    } else if (step === 2) {
      isValid = await trigger(["businessCategory", "subCategory"]);
    } else if (step === 3) {
      // For chefs, location is optional, so we need custom validation
      if (registrationType === "chef") {
        isValid = await trigger(["phone", "countryCode"]);
      } else {
        isValid = await trigger([
          "location",
          "phone",
          "countryCode",
          "openingTime",
          "closingTime",
        ]);
      }
    } else if (step === 4) {
      isValid = await trigger(["cuisine"]);
    } else if (step === 5) {
      isValid = true; // Logo optional
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
  };

  /* ---------------------------------------
     Submission Success Message
  --------------------------------------- */
  if (isSubmitted) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Card className="p-8 max-w-md w-full text-center shadow-lg dark:bg-gray-800">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 dark:text-white">
            Registration Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for registering your {registrationType}. We&apos;ll review your
            application and contact you within 24 hours.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setStep(0);
              setRegistrationType(null);
            }}
            className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
          >
            Submit Another Registration
          </Button>
        </Card>
      </div>
    );
  }

  /* ---------------------------------------
     Form Rendering
  --------------------------------------- */
  return (
    <div className="min-h-screen transition-colors duration-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Register Your {registrationType === "chef" ? "Chef Profile" : "Restaurant"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Join our platform and start reaching thousands of food lovers in
              East Africa
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex justify-between relative">
            {[0, 1, 2, 3, 4, 5, 6].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    stepNumber < step || completedSteps.includes(stepNumber)
                      ? "bg-yellow-500 border-yellow-500 text-white"
                      : stepNumber === step
                      ? "border-yellow-500 bg-green-500 dark:bg-green-800 text-gray-700 dark:text-yellow-400"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400"
                  }`}
                >
                  {stepNumber < step || completedSteps.includes(stepNumber) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    stepNumber === 0 ? "?" : stepNumber
                  )}
                </div>
                <div className="text-xs mt-2 text-center capitalize font-medium text-gray-700 dark:text-gray-300 max-w-16">
                  {stepNumber === 0 && "Type"}
                  {stepNumber === 1 && "Basic Info"}
                  {stepNumber === 2 && "Category"}
                  {stepNumber === 3 && "Contact"}
                  {stepNumber === 4 && "Cuisine"}
                  {stepNumber === 5 && "Logo"}
                  {stepNumber === 6 && "Review"}
                </div>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10">
              <div
                className="h-0.5 bg-yellow-500 transition-all duration-300"
                style={{ width: `${((step) / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 0: Registration Type Selection */}
          {step === 0 && (
            <Card className="mb-6 border-gray-200 dark:border-gray-700 shadow-md dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Choose Registration Type
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Are you registering as a Restaurant or a Chef?
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer text-center transition ${
                    registrationType === "restaurant"
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => setRegistrationType("restaurant")}
                >
                  <Building2 className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="text-lg font-bold">Restaurant</h3>
                  <p className="text-sm mt-1">For restaurants and food businesses</p>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer text-center transition ${
                    registrationType === "chef"
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => setRegistrationType("chef")}
                >
                  <User className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="text-lg font-bold">Chef</h3>
                  <p className="text-sm mt-1">For independent or event chefs</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card className="mb-6 border-gray-200 dark:border-gray-700 shadow-md dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Basic Information
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Tell us about your {registrationType === "chef" ? "chef profile" : "restaurant"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {registrationType === "chef" ? "Chef Name" : "Restaurant Name"} *
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder={registrationType === "chef" ? "e.g. Jamal Mwajuma" : "e.g. Swahili Bites"}
                    className={`mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.name ? "border-red-500 dark:border-red-400" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="tagline"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Tagline *
                  </Label>
                  <Input
                    id="tagline"
                    {...register("tagline")}
                    placeholder={registrationType === "chef" ? "e.g. Expert in Coastal Cuisine" : "e.g. Authentic Coastal Cuisine"}
                    className={`mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.tagline ? "border-red-500 dark:border-red-400" : ""
                    }`}
                  />
                  {errors.tagline && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {errors.tagline.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="bio"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Description *
                  </Label>
                  <Textarea
                    id="bio"
                    {...register("bio")}
                    placeholder={registrationType === "chef" ? "Tell us about your culinary expertise..." : "Tell us about your restaurant..."}
                    rows={4}
                    className={`mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.bio ? "border-red-500 dark:border-red-400" : ""
                    }`}
                  />
                  {errors.bio && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {errors.bio.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Business Category */}
          {step === 2 && (
            <Card className="mb-6 border-gray-200 dark:border-gray-700 shadow-md dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {registrationType === "chef" ? "Chef Category" : "Business Category"}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Choose the category that best describes your {registrationType === "chef" ? "chef services" : "restaurant"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Main Category */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300">
                    Main Category *
                  </Label>
                  <select
                    {...register("businessCategory")}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 mt-1"
                  >
                    <option value="">Select Category</option>
                    {(registrationType === "restaurant" ? businessCategories : chefCategories).map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.businessCategory && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {errors.businessCategory.message}
                    </p>
                  )}
                </div>

                {/* Sub Category */}
                {selectedBusinessCategory && (
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">
                      Sub-Category *
                    </Label>
                    <select
                      {...register("subCategory")}
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 mt-1"
                    >
                      <option value="">Select Sub-Category</option>
                      {(registrationType === "restaurant" ? businessCategories : chefCategories)
                        .find((cat) => cat.name === selectedBusinessCategory)
                        ?.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                    {errors.subCategory && (
                      <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                        {errors.subCategory.message}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <Card className="mb-6 border-gray-200 dark:border-gray-700 shadow-md dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  How can customers reach you?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {registrationType === "restaurant" && (
                  <div>
                    <Label
                      htmlFor="location"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address *
                    </Label>
                    <Input
                      id="location"
                      {...register("location")}
                      placeholder="e.g. Kunduchi, Dar es Salaam"
                      className={`mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                        errors.location
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }`}
                    />
                    {errors.location && (
                      <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <Label className="text-gray-700 dark:text-gray-300">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </Label>
                  <div className="flex space-x-2">
                    <select
                      {...register("countryCode")}
                      className="w-24 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    >
                      {countryCodes.map((code) => (
                        <option key={code.code} value={code.code}>
                          {code.flag} {code.code}
                        </option>
                      ))}
                    </select>
                    <Input
                      {...register("phone")}
                      placeholder="712345678"
                      className={`flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                        errors.phone ? "border-red-500 dark:border-red-400" : ""
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {registrationType === "restaurant" && (
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Opening Hours *
                    </Label>
                    <div className="flex space-x-2">
                      <select
                        {...register("openingTime")}
                        className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      >
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <select
                        {...register("closingTime")}
                        className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      >
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 4: Cuisine Selection */}
          {step === 4 && (
            <Card className="mb-6 border-gray-200 dark:border-gray-700 shadow-md dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  Cuisine Type
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Select all the cuisine types you {registrationType === "chef" ? "specialize in" : "offer"}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cuisineOptions.map((cuisine) => (
                  <div
                    key={cuisine}
                    className={`border rounded-lg p-3 cursor-pointer text-center transition-colors ${
                      currentCuisines.includes(cuisine)
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => toggleCuisine(cuisine)}
                  >
                    {cuisine}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Step 5: Logo Upload */}
          {step === 5 && (
            <Card className="mb-6 border-gray-200 dark:border-gray-700 shadow-md dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Upload {registrationType === "chef" ? "Profile Picture" : "Logo"}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Add your {registrationType === "chef" ? "profile picture" : "restaurant's logo"} (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  {logoPreview ? (
                    <div className="relative">
                      <Image
                        src={logoPreview}
                        alt="Logo Preview"
                        width={96}
                        height={96}
                        className="rounded-full object-cover border dark:border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        aria-label="Remove logo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600"
                      >
                        <Upload className="w-4 h-4" />
                        Upload {registrationType === "chef" ? "Profile Picture" : "Logo"}
                      </Button>
                      {errors.logo && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.logo.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 6: Review & Submit */}
          {step === 6 && (
            <Card className="mb-6 border-gray-200 dark:border-gray-700 shadow-md dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Review & Submit
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Confirm your details before submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-700 dark:text-gray-300">
                      {registrationType === "chef" ? "Chef Name" : "Restaurant Name"}:
                    </h3>
                    <p className="text-gray-900 dark:text-white">
                      {formData.name}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700 dark:text-gray-300">
                      Tagline:
                    </h3>
                    <p className="text-gray-900 dark:text-white">
                      {formData.tagline}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700 dark:text-gray-300">
                      Description:
                    </h3>
                    <p className="text-gray-900 dark:text-white">
                      {formData.bio}
                    </p>
                  </div>
                  {registrationType === "restaurant" && formData.location && (
                    <div>
                      <h3 className="font-bold text-gray-700 dark:text-gray-300">
                        Address:
                      </h3>
                      <p className="text-gray-900 dark:text-white">
                        {formData.location}
                      </p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-700 dark:text-gray-300">
                      Phone:
                    </h3>
                    <p className="text-gray-900 dark:text-white">
                      {countryCodeValue} {phoneValue}
                    </p>
                  </div>
                  {registrationType === "restaurant" && (
                    <div>
                      <h3 className="font-bold text-gray-700 dark:text-gray-300">
                        Opening Hours:
                      </h3>
                      <p className="text-gray-900 dark:text-white">
                        {openingTimeValue} - {closingTimeValue}
                      </p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-700 dark:text-gray-300">
                      Cuisine Types:
                    </h3>
                    <p className="text-gray-900 dark:text-white">
                      {currentCuisines.join(", ")}
                    </p>
                  </div>
                  {logoPreview && (
                    <div>
                      <h3 className="font-bold text-gray-700 dark:text-gray-300">
                        {registrationType === "chef" ? "Profile Picture" : "Logo"}:
                      </h3>
                      <div className="mt-2">
                        <Image
                          src={logoPreview}
                          alt={registrationType === "chef" ? "Profile Picture" : "Restaurant Logo"}
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            {step > 0 && (
              <Button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
            )}
            {step < 6 && (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 ml-auto"
                disabled={step === 0 && !registrationType}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
            {step === 6 && (
              <Button
                type="submit"
                className="ml-auto bg-green-500 hover:bg-green-600"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}