
DROP TRIGGER IF EXISTS "set_public_setting_updated_at" ON "public"."setting";
ALTER TABLE "public"."setting" DROP COLUMN "updated_at";

ALTER TABLE "public"."setting" DROP COLUMN "created_at";
