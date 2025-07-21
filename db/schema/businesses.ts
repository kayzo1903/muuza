import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";

// enums
export const bussinessStatus = pgEnum("verificationStatus", [
  "verified",
  "not-verified",
]);

export const banStatus = pgEnum("banStatus", [
  "none",
  "warned",
  "partial_ban",
  "banned",
]);


// Businesses table
export const businesses = pgTable("business", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ownerId: text("ownerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").unique().notNull(),
  address: text("address").notNull(),
  bio: text("bio"),
  phoneNumber: text("phoneNumber").notNull(),
  category: text("category"),
  operationHours: text("operationHours"),
  verificationStatus: bussinessStatus().default("not-verified"),
  verified: timestamp("verified", { mode: "date" }),
  socialMediaLinks: text("socialMediaLinks"),
  images: text("images"),
  videos: text("videos"),
  banStatus: banStatus().default("none"),
});
