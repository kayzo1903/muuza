import { z } from "zod";

/**
 * Dietary options available for products.
 * These match exactly with what you have in your UI and database.
 */
const dietaryEnum = z.enum([
  "vegetarian",
  "vegan",
  "gluten-free",
  "dairy-free",
  "spicy",
  "halal",
  "kosher",
  "traditional-african",
  "plant-based",
  "nut-free",
  "seafood-free",
  "low-carb",
]);

/**
 * Validation schema for the product form
 */
export const productFormSchema = z.object({
  // Product name - required
  name: z.string().min(1, "Product name is required").max(100),

  // Optional description, max 500 chars
  description: z.string().max(500).optional(),

  // Price must be positive, stored in cents later
  price: z
    .number()
    .min(0, "Price must be at least 0")
    .max(1000000, "Price is too high"),

  // Menu is required because every product belongs to a menu
  menuId: z.string().min(1, "Please select a menu"),

  // Product availability toggle
  isAvailable: z.boolean(),

  // Optional product images - max 5 files
  images: z
    .array(z.instanceof(File))
    .max(5, "You can upload up to 5 images")
    .optional(),

  // Optional category
  category: z.string().optional(),

  // Preparation time in minutes (0–240)
  preparationTime: z.number().min(0).max(240).optional(),

  // List of ingredients
  ingredients: z.array(z.string()).optional(),

  // Dietary information tags
  dietaryInfo: z.array(dietaryEnum).optional(),
});

/**
 * TypeScript type inference for form data
 */
export type ProductFormData = z.infer<typeof productFormSchema>;

/**
 * Final payload type for API submission
 * (after converting to the database format)
 */
export type ProductFormInput = Omit<ProductFormData, "businessId">;

