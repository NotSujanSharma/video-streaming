import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { supabase } from '../lib/supabase';
import type { Video } from '../types';

export function Watch() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = React.useState<Video | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchVideo() {
      if (!id) return;

      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setVideo(data);
      }
      setLoading(false);
    }

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-white">Video not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="aspect-video w-full">
          <ReactPlayer
            url={video.video_url}
            width="100%"
            height="100%"
            controls
            playing
          />
        </div>
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-white">{video.title}</h1>
          <p className="mt-2 text-gray-400">{video.description}</p>
          <div className="mt-4">
            <span className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
              {video.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
