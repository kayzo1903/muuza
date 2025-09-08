CREATE TYPE "public"."business_category_enum" AS ENUM('restaurant', 'chef');--> statement-breakpoint
ALTER TABLE "business" ALTER COLUMN "business_type" SET DATA TYPE "public"."business_category_enum" USING "business_type"::"public"."business_category_enum";--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "business_verification" boolean DEFAULT false NOT NULL;