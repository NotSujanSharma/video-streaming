CREATE OR REPLACE FUNCTION increment_video_views(video_id uuid)
    RETURNS void
    LANGUAGE plpgsql
    AS $$
    BEGIN
      UPDATE videos
      SET views = views + 1
      WHERE id = video_id;
    END;
    $$;
