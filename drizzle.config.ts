import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL!,
  },
});
