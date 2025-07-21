import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { businesses } from "./businesses";

// Menus table
export const menus = pgTable("menu", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  businessId: text("businessId")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  images: text("images"),
  description: text("description"),
  price: integer("price").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});
