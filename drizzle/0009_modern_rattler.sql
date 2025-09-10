ALTER TABLE "menu_item" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_item" ADD COLUMN "subcategory" text NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_item" ADD COLUMN "ingredients" jsonb;--> statement-breakpoint
ALTER TABLE "menu_item" ADD COLUMN "dietary_info" jsonb;--> statement-breakpoint
ALTER TABLE "menu_item" ADD COLUMN "preparation_time" integer;