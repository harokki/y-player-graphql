
alter table "public"."setting" rename column "playlist_id" to "video_id";

alter table "public"."setting" drop constraint "setting_video_id_fkey",
          add constraint "setting_video_id_fkey"
          foreign key ("video_id")
          references "public"."playlist"
          ("id")
          on update restrict
          on delete restrict;

DROP TABLE "public"."setting";

DROP TABLE "public"."playlist";
