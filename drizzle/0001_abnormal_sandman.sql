ALTER TABLE "user" ADD COLUMN "provider" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_buyer" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_seller" boolean NOT NULL;