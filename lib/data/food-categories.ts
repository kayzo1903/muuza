// src/lib/categories.ts

export const foodCategories = [
  // 🌍 EAST AFRICAN CORE
  {
    id: "swahili",
    label: "Swahili Cuisine",
    description: "Traditional East African coastal dishes",
    core: true,
    subcategories: [
      { id: "pilau", label: "Pilau" },
      { id: "biryani", label: "Biryani" },
      { id: "ugali-fish", label: "Ugali & Fish" },
      { id: "chapati-beans", label: "Chapati & Beans" },
      { id: "mandazi", label: "Mandazi & Snacks" },
      { id: "mishkaki", label: "Mishkaki (Skewered Meat)" },
      { id: "samosas", label: "Samosas" },
      { id: "coconut-beans", label: "Coconut Beans" },
    ],
  },
  {
    id: "african-specialties",
    label: "African Specialties",
    description: "Popular African dishes from different regions",
    core: true,
    subcategories: [
      { id: "jollof-rice", label: "Jollof Rice (West Africa)" },
      { id: "fufu-soup", label: "Fufu & Soup" },
      { id: "injera-wat", label: "Injera & Wat (Ethiopian)" },
      { id: "sadza-meat", label: "Sadza & Meat (Southern Africa)" },
      { id: "suya", label: "Suya (Grilled Meat)" },
      { id: "tagine", label: "Tagine (North Africa)" },
    ],
  },
  {
    id: "street-food",
    label: "Street Food",
    description: "Quick and affordable popular local snacks",
    core: true,
    subcategories: [
      { id: "chips-mayai", label: "Chips Mayai" },
      { id: "grilled-maize", label: "Grilled Maize" },
      { id: "fried-cassava", label: "Fried Cassava" },
      { id: "roasted-peanuts", label: "Roasted Peanuts" },
      { id: "puff-puff", label: "Puff Puff (West African Snack)" },
      { id: "bhajia", label: "Bhajia" },
      { id: "samosas", label: "Samosas" },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast & Brunch",
    description: "Morning meals and light bites",
    core: true,
    subcategories: [
      { id: "chapati-eggs", label: "Chapati & Eggs" },
      { id: "uji", label: "Uji (Porridge)" },
      { id: "tea-coffee", label: "Tea & Coffee" },
      { id: "bread-butter", label: "Bread & Butter" },
      { id: "pancakes", label: "Pancakes" },
      { id: "omelettes", label: "Omelettes" },
    ],
  },
  {
    id: "grilled-bbq",
    label: "Grilled & BBQ",
    description: "Smoky grilled meats and seafood",
    core: true,
    subcategories: [
      { id: "nyama-choma", label: "Nyama Choma" },
      { id: "grilled-chicken", label: "Grilled Chicken" },
      { id: "grilled-fish", label: "Grilled Fish" },
      { id: "braai", label: "Braai (Southern African BBQ)" },
      { id: "kebabs", label: "Kebabs" },
    ],
  },

  // 🍔 INTERNATIONAL CORE
  {
    id: "international",
    label: "International Cuisine",
    description: "Familiar dishes for tourists and expats",
    core: false,
    subcategories: [
      { id: "pizza", label: "Pizza" },
      { id: "pasta", label: "Pasta" },
      { id: "burgers", label: "Burgers & Sandwiches" },
      { id: "sushi", label: "Sushi" },
      { id: "stir-fry", label: "Stir Fry" },
      { id: "curry", label: "Curry" },
      { id: "tacos", label: "Tacos & Burritos" },
      { id: "mediterranean", label: "Mediterranean Dishes" },
    ],
  },
  {
    id: "indian-middle-eastern",
    label: "Indian & Middle Eastern",
    description: "Popular diaspora cuisines",
    core: false,
    subcategories: [
      { id: "shawarma", label: "Shawarma" },
      { id: "kebabs", label: "Kebabs" },
      { id: "curries", label: "Curries" },
      { id: "naan", label: "Naan & Flatbreads" },
      { id: "hummus", label: "Hummus & Dips" },
    ],
  },

  // 🥗 SPECIAL DIETS
  {
    id: "healthy-options",
    label: "Healthy Options",
    description: "Nutritious and balanced meals",
    core: false,
    subcategories: [
      { id: "salads", label: "Salads" },
      { id: "smoothie-bowls", label: "Smoothie Bowls" },
      { id: "vegetarian", label: "Vegetarian" },
      { id: "vegan", label: "Vegan" },
      { id: "gluten-free", label: "Gluten-Free" },
    ],
  },

  // 🍹 DRINKS & DESSERTS
  {
    id: "beverages",
    label: "Beverages",
    description: "Drinks and refreshments",
    core: true,
    subcategories: [
      { id: "chai", label: "Chai (Tea)" },
      { id: "coffee", label: "Coffee" },
      { id: "fresh-juice", label: "Fresh Juice" },
      { id: "smoothies", label: "Smoothies" },
      { id: "soft-drinks", label: "Soda & Soft Drinks" },
      { id: "traditional-drinks", label: "Traditional Drinks" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts & Sweets",
    description: "Cakes, sweets, and other treats",
    core: false,
    subcategories: [
      { id: "cakes", label: "Cakes" },
      { id: "cookies", label: "Cookies" },
      { id: "ice-cream", label: "Ice Cream" },
      { id: "pastries", label: "Pastries" },
      { id: "african-sweets", label: "Traditional African Sweets" },
    ],
  },

  // 👶 KIDS
  {
    id: "kids-menu",
    label: "Kids Menu",
    description: "Child-friendly meals",
    core: false,
    subcategories: [
      { id: "mini-burgers", label: "Mini Burgers" },
      { id: "chicken-nuggets", label: "Chicken Nuggets" },
      { id: "pasta-kids", label: "Kids Pasta" },
    ],
  },
] as const;

// Helper types
export type CategoryId = typeof foodCategories[number]["id"];
export type SubcategoryId = typeof foodCategories[number]["subcategories"][number]["id"];
