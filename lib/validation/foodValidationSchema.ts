import { z } from "zod";
import { foodCategories } from "../data/food-categories";

export const CategorySchema = z.enum(
  foodCategories.map(cat => cat.id) as [string, ...string[]]
);

export const SubcategorySchema = z.enum(
  foodCategories.flatMap(cat => cat.subcategories.map(sub => sub.id)) as [string, ...string[]]
);

export const ProductFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be a positive number"),
  category: CategorySchema,
  subcategory: SubcategorySchema,
  description: z.string().optional(),
  isAvailable: z.boolean().default(true),
});

export type ProductFormInput = z.infer<typeof ProductFormSchema>;
