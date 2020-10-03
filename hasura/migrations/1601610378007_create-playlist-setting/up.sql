
CREATE TABLE "public"."playlist"("id" UUID NOT NULL DEFAULT gen_random_uuid(), "video_id" text NOT NULL, "title" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("video_id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_playlist_updated_at"
BEFORE UPDATE ON "public"."playlist"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_playlist_updated_at" ON "public"."playlist" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."setting"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "video_id" uuid NOT NULL, "description" text, "start" integer NOT NULL DEFAULT 0, "end" integer NOT NULL DEFAULT 0, "loop" boolean NOT NULL DEFAULT false, PRIMARY KEY ("id") , FOREIGN KEY ("video_id") REFERENCES "public"."playlist"("id") ON UPDATE restrict ON DELETE restrict);

alter table "public"."setting" drop constraint "setting_video_id_fkey",
             add constraint "setting_video_id_fkey"
             foreign key ("video_id")
             references "public"."playlist"
             ("id") on update restrict on delete restrict;

alter table "public"."setting" rename column "video_id" to "playlist_id";
