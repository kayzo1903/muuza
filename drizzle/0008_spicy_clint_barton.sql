CREATE TYPE "public"."business_status" AS ENUM('open', 'closed', 'temporarily_closed', 'coming_soon');--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "status" "business_status" DEFAULT 'open' NOT NULL;--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "temporary_closure_reason" text;--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "temporary_closure_end_date" timestamp;--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "accepts_online_orders" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "is_delivery_available" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "is_pickup_available" boolean DEFAULT false;