CREATE OR REPLACE FUNCTION search_videos(search_term IN TEXT)
    RETURNS TABLE (
      id uuid,
      title text,
      description text,
      thumbnail_url text,
      video_url text,
      category text,
      created_at timestamptz,
      updated_at timestamptz
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN QUERY
      SELECT
        videos.id,
        videos.title,
        videos.description,
        videos.thumbnail_url,
        videos.video_url,
        videos.category,
        videos.created_at,
        videos.updated_at
      FROM videos
      WHERE 
        similarity(videos.title, search_term) > 0.3 OR
        similarity(videos.description, search_term) > 0.3 OR
        videos.title ILIKE '%' || search_term || '%' OR
        videos.description ILIKE '%' || search_term || '%'
      ORDER BY (
        similarity(videos.title, search_term) * 2 +
        similarity(videos.description, search_term)
      ) DESC;
    END;
    $$;