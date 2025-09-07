import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";

// Role enum
export const roleEnum = pgEnum("role", ["buyer", "seller"]);

// USERS TABLE
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone_number: text("phone_number"), // consistent snake_case
  address: text("address"),
  provider: text("provider"),

  role: roleEnum("role").default("buyer").notNull(),

  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// SESSION TABLE
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

// ACCOUNT TABLE
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"), // hashed password for credentials

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// VERIFICATION TABLE
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// BUSINESS TABLE
export const business = pgTable("business", {
  id: text("id").primaryKey(),

  // Owner of the business
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  username: text("username").unique().notNull(), // @swahilichef

  businessType: text("business_type").notNull(), 
  // Values: "restaurant", "chef"

  tagline: text("tagline"),
  bio: text("bio"),
  location: text("location"),
  phone: text("phone"),

  // Customization
  logo: text("logo"),
  coverImage: text("cover_image"),

  // Cuisine tags
  cuisine: jsonb("cuisine").$type<string[]>(),

  // Analytics
  rating: integer("rating").default(0),
  reviewCount: integer("review_count").default(0),

  // Business status
  isOpen: boolean("is_open").default(true),

  // Opening hours stored as JSON
  openingHours: jsonb("opening_hours").$type<Record<string, string>>(), 
  // Example: { "mon": "08:00-22:00", "tue": "08:00-22:00" }

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// MENU TABLE (ADDED THIS MISSING TABLE)
export const menu = pgTable("menu", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// MENU ITEM TABLE
export const menuItem = pgTable("menu_item", {
  id: text("id").primaryKey(),

  menuId: text("menu_id")
    .notNull()
    .references(() => menu.id, { onDelete: "cascade" }),

  businessId: text("business_id")
    .notNull()
    .references(() => business.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  description: text("description"),

  price: integer("price").notNull(), // stored in minor units (e.g., TZS cents)

  likes: integer("likes").default(0),
  comments: integer("comments").default(0),

  isAvailable: boolean("is_available").default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// MENU ITEM IMAGE TABLE
export const menuItemImage = pgTable("menu_item_image", {
  id: text("id").primaryKey(),

  menuItemId: text("menu_item_id")
    .notNull()
    .references(() => menuItem.id, { onDelete: "cascade" }),

  url: text("url").notNull(), // Cloud storage or CDN link

  altText: text("alt_text"), // Accessibility and SEO

  isPrimary: boolean("is_primary").default(false), 
  // True = main display image

  sortOrder: integer("sort_order").default(0), 
  // For ordering gallery images

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Additional tables you might want to consider:

// ORDER TABLE
export const order = pgTable("order", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id, { onDelete: "cascade" }),
  status: text("status").default("pending"), // pending, confirmed, preparing, ready, completed, cancelled
  totalAmount: integer("total_amount").notNull(),
  deliveryAddress: text("delivery_address"),
  specialInstructions: text("special_instructions"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ORDER ITEM TABLE
export const orderItem = pgTable("order_item", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => order.id, { onDelete: "cascade" }),
  menuItemId: text("menu_item_id")
    .notNull()
    .references(() => menuItem.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(), // Price at time of order
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// REVIEW TABLE
export const review = pgTable("review", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id, { onDelete: "cascade" }),
  menuItemId: text("menu_item_id")
    .references(() => menuItem.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// REVIEW REPLY TABLE
export const reviewReply = pgTable("review_reply", {
  id: text("id").primaryKey(),

  reviewId: text("review_id")
    .notNull()
    .references(() => review.id, { onDelete: "cascade" }),

  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  replyText: text("reply_text").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


//FAVORITES TABLE
export const favorite = pgTable("favorite", {
  id: text("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  businessId: text("business_id").references(() => business.id, { onDelete: "cascade" }),
  menuItemId: text("menu_item_id").references(() => menuItem.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
// The favorites table allows users to favorite either entire businesses or specific menu items.

// NOTIFICATION TABLE
export const notification = pgTable("notification", {
  id: text("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  type: text("type").notNull(), 
  // Example: "order_update", "review_reply", "new_review"

  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//AUDIT LOG TABLE
// Define enums for better type safety
export const auditActionEnum = pgEnum("audit_action", [
  "user_login",
  "user_logout",
  "user_register",
  "user_update",
  "business_create",
  "business_update",
  "business_delete",
  "menu_item_create", 
  "menu_item_update",
  "menu_item_delete",
  "order_create",
  "order_update",
  "order_cancel",
  "payment_process",
  "review_create",
  "review_update",
  "review_delete"
]);

export const auditEntityEnum = pgEnum("audit_entity", [
  "user",
  "business",
  "menu",
  "menu_item",
  "order",
  "payment",
  "review"
]);

// AUDIT LOG TABLE with enums
export const auditLog = pgTable("audit_log", {
  id: text("id").primaryKey(),

  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  
  action: auditActionEnum("action").notNull(),

  entityType: auditEntityEnum("entity_type"),

  entityId: text("entity_id"),

  details: jsonb("details").$type<Record<string, unknown>>(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//MESSAGE TABLE
export const message = pgTable("message", {
  id: text("id").primaryKey(),

  senderId: text("sender_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  receiverId: text("receiver_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  orderId: text("order_id").references(() => order.id, { onDelete: "cascade" }),

  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
