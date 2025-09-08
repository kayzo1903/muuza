ALTER TABLE "business" ADD COLUMN "businessType" "business_category_enum" NOT NULL;--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "openingHours" jsonb;--> statement-breakpoint
ALTER TABLE "business" DROP COLUMN "business_type";--> statement-breakpoint
ALTER TABLE "business" DROP COLUMN "opening_hours";