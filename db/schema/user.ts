import { text, pgTable, pgEnum, timestamp } from "drizzle-orm/pg-core";

// Enums
export const rolesEnum = pgEnum("roles", ["buyer", "seller", "admin"]);
export const banStatus = pgEnum("banStatus", [
  "none",
  "warned",
  "partial_ban",
  "banned",
]);

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  image: text("image"),

  role: rolesEnum().default("buyer"),
  banStatus: banStatus().default("none"),

  emailVerified: timestamp("email_verified", { mode: "date" }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
