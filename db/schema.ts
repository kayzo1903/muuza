import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  jsonb,
  integer,
  unique,
} from "drizzle-orm/pg-core";

/* ==============================================
   ENUMS
============================================== */

// Role enum
export const roleEnum = pgEnum("role", ["buyer", "seller"]);

// Business Type enum
export const businessTypeEnum = pgEnum("business_category_enum", [
  "restaurant",
  "chef",
]);

// Business Status enum
export const businessStatusEnum = pgEnum("business_status", [
  "open",
  "closed",
  "temporarily_closed",
  "coming_soon",
]);

// Audit enums
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
  "review_delete",
]);

export const auditEntityEnum = pgEnum("audit_entity", [
  "user",
  "business",
  "menu_item",
  "order",
  "payment",
  "review",
]);

/* ==============================================
   USERS TABLE
============================================== */
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone_number: text("phone_number"),
  address: text("address"),
  provider: text("provider"),
  role: roleEnum("role").default("buyer").notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ==============================================
   AUTH TABLES
============================================== */
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

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/* ==============================================
   BUSINESS TABLE
============================================== */
export const business = pgTable("business", {
  id: text("id").primaryKey(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  username: text("username").unique().notNull(), // @swahilichef

  businessType: businessTypeEnum("businessType").notNull(),

  tagline: text("tagline"),
  bio: text("bio"),
  location: text("location"),
  phone: text("phone"),

  // Customization
  logo: text("logo"),
  coverImage: text("cover_image"),

  // Business verification
  business_verification: boolean("business_verification")
    .default(false)
    .notNull(),

  // Cuisine tags
  cuisine: jsonb("cuisine").$type<string[]>(),

  // Analytics
  rating: integer("rating").default(0),
  reviewCount: integer("review_count").default(0),

  // Status
  status: businessStatusEnum("status").default("open").notNull(),
  isOpen: boolean("is_open").default(true),

  // Opening hours stored as JSON
  openingHours: jsonb("openingHours").$type<Record<string, string>>(),
  // Example: { "mon": "08:00-22:00", "tue": "08:00-22:00" }

  businessCategory: text(),
  subCategory: text(),
  countryCode: text(),

  temporaryClosureReason: text("temporary_closure_reason"),
  temporaryClosureEndDate: timestamp("temporary_closure_end_date"),

  // Online ordering settings
  acceptsOnlineOrders: boolean("accepts_online_orders").default(false),
  isDeliveryAvailable: boolean("is_delivery_available").default(false),
  isPickupAvailable: boolean("is_pickup_available").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ==============================================
   MENU ITEM TABLE (UPDATED - NO menuId)
============================================== */
export const menuItem = pgTable("menu_item", {
  id: text("id").primaryKey(),

  // REMOVED: menuId field - using categories instead
  // menuId: text("menu_id").references(() => menu.id, { onDelete: "cascade" }),

  businessId: text("business_id")
    .notNull()
    .references(() => business.id, { onDelete: "cascade" }),

  // Category system - primary organization method
  category: text("category").notNull(),
  subcategory: text("subcategory").notNull(),

  name: text("name").notNull(),
  description: text("description"),

  // Price in minor units (e.g., TZS cents)
  price: integer("price").notNull(),

  // Additional fields
  ingredients: jsonb("ingredients").$type<string[]>(),
  dietaryInfo: jsonb("dietary_info").$type<string[]>(),
  preparationTime: integer("preparation_time"),

  likes: integer("likes").default(0),
  comments: integer("comments").default(0),

  isAvailable: boolean("is_available").default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    // Case-sensitive unique constraint: business + category + name
    business_category_name_unique: unique()
      .on(table.businessId, table.category, table.name),
  }});

/* ==============================================
   MENU ITEM IMAGE TABLE
============================================== */
export const menuItemImage = pgTable("menu_item_image", {
  id: text("id").primaryKey(),
  menuItemId: text("menu_item_id")
    .notNull()
    .references(() => menuItem.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: text("alt_text"),
  isPrimary: boolean("is_primary").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ==============================================
   ORDER TABLES
============================================== */
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

/* ==============================================
   REVIEW & FAVORITES
============================================== */
export const review = pgTable("review", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id, { onDelete: "cascade" }),
  menuItemId: text("menu_item_id").references(() => menuItem.id, {
    onDelete: "cascade",
  }),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

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

export const favorite = pgTable("favorite", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  businessId: text("business_id").references(() => business.id, {
    onDelete: "cascade",
  }),
  menuItemId: text("menu_item_id").references(() => menuItem.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ==============================================
   NOTIFICATION & AUDIT LOG
============================================== */
export const notification = pgTable("notification", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // e.g., "order_update", "review_reply"
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditLog = pgTable("audit_log", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  action: auditActionEnum("action").notNull(),
  entityType: auditEntityEnum("entity_type"),
  entityId: text("entity_id"),
  details: jsonb("details").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ==============================================
   MESSAGES
============================================== */
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