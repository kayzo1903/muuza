CREATE TYPE "public"."banStatus" AS ENUM('none', 'warned', 'partial_ban', 'banned');--> statement-breakpoint
CREATE TYPE "public"."verificationStatus" AS ENUM('verified', 'not-verified');--> statement-breakpoint
CREATE TYPE "public"."orderStatus" AS ENUM('pending', 'received', 'ready', 'completed', 'cancelled');--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "verificationStatus" "verificationStatus" DEFAULT 'not-verified';--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "banStatus" "banStatus" DEFAULT 'none';