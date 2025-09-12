export type DietaryOptionValue =
  | "halal"
  | "vegetarian"
  | "vegan"
  | "no-pork"
  | "no-beef"
  | "fish-only"
  | "spicy"
  | "mild"
  | "traditional-local"
  | "plant-based"
  | "no-dairy"
  | "low-sugar";

export const dietaryOptions: {
  value: DietaryOptionValue;
  label: string;
  description: string;
}[] = [
  {
    value: "halal",
    label: "Halal",
    description: "Prepared according to Islamic dietary laws",
  },
  {
    value: "vegetarian",
    label: "Vegetarian",
    description: "Contains no meat, chicken, or fish",
  },
  {
    value: "vegan",
    label: "Vegan",
    description: "Contains no animal products including milk and eggs",
  },
  {
    value: "no-pork",
    label: "No Pork",
    description: "Does not contain pork or pork products",
  },
  {
    value: "no-beef",
    label: "No Beef",
    description: "Does not contain beef or beef products",
  },
  {
    value: "fish-only",
    label: "Fish Only",
    description: "Contains fish or seafood only, no other meat",
  },
  {
    value: "spicy",
    label: "Spicy",
    description: "Prepared with hot peppers or strong spices",
  },
  {
    value: "mild",
    label: "Mild",
    description: "Very little or no chili used in preparation",
  },
  {
    value: "traditional-local",
    label: "Traditional Local",
    description: "Authentic East African preparation using local ingredients",
  },
  {
    value: "plant-based",
    label: "Plant-Based",
    description: "Primarily vegetables, grains, and legumes",
  },
  {
    value: "no-dairy",
    label: "No Dairy",
    description: "Contains no milk, cheese, or butter",
  },
  {
    value: "low-sugar",
    label: "Low Sugar",
    description: "Suitable for diabetics or low sugar diets",
  },
];