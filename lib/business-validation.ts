import z from "zod";

// Validation schema that matches your form and database
// Update your businessRegistrationSchema
export const businessRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  businessType: z.enum(["restaurant", "chef"]),
  tagline: z
    .string()
    .min(5, "Tagline must be at least 5 characters")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .min(5, "Please enter a valid address")
    .optional()
    .or(z.literal("")),
  phone: z.string().min(9, "Please enter a valid phone number"),
  logo: z.string().url().optional().nullable(),
  cuisine: z
    .array(z.string())
    .min(1, "Please select at least one cuisine type"),
  
  // Add the new fields
  businessCategory: z.string().optional(),
  subCategory: z.string().optional(),
  countryCode: z.string().optional(),
  openingTime: z.string().optional(),
  closingTime: z.string().optional(),
  openingHours: z.record(z.string()).optional(),
});