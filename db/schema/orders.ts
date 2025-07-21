import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { businesses } from "./businesses";
import { menus } from "./menus";

export const orderStatus = pgEnum("orderStatus", [
  "pending",
  "received",
  "ready",
  "completed",
  "cancelled",
]);
// Orders table
export const orders = pgTable("order", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  businessId: text("businessId")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  menuId: text("menuId")
    .notNull()
    .references(() => menus.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  totalPrice: integer("totalPrice").notNull(),
  orderStatus: orderStatus().default("pending"),
  orderedAt: timestamp("orderedAt", { mode: "date" }).defaultNow(),
});
