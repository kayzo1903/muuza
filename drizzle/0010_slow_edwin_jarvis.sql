ALTER TABLE "menu" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "menu" CASCADE;--> statement-breakpoint
ALTER TABLE "menu_item" DROP CONSTRAINT "menu_item_menu_id_menu_id_fk";
--> statement-breakpoint
ALTER TABLE "audit_log" ALTER COLUMN "entity_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."audit_entity";--> statement-breakpoint
CREATE TYPE "public"."audit_entity" AS ENUM('user', 'business', 'menu_item', 'order', 'payment', 'review');--> statement-breakpoint
ALTER TABLE "audit_log" ALTER COLUMN "entity_type" SET DATA TYPE "public"."audit_entity" USING "entity_type"::"public"."audit_entity";--> statement-breakpoint
ALTER TABLE "menu_item" DROP COLUMN "menu_id";--> statement-breakpoint
ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_business_id_category_name_unique" UNIQUE("business_id","category","name");