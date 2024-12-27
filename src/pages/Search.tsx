import React from 'react';
    import { useSearchParams } from 'react-router-dom';
    import { VideoCard } from '../components/VideoCard';
    import { supabase } from '../lib/supabase';
    import type { Video } from '../types';

    export function Search() {
      const [searchParams] = useSearchParams();
      const query = searchParams.get('q') || '';
      const [videos, setVideos] = React.useState<Video[]>([]);
      const [loading, setLoading] = React.useState(true);

      React.useEffect(() => {
        async function searchVideos() {
          if (!query.trim()) {
            setVideos([]);
            setLoading(false);
            return;
          }

          const { data, error } = await supabase.rpc('search_videos', {
            search_term: query,
          });

          if (!error && data) {
            setVideos(data);
          }
          setLoading(false);
        }

        searchVideos();
      }, [query]);

      if (loading) {
        return (
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
          </div>
        );
      }
      return (
        <div className="min-h-screen bg-gray-900 pt-20">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold text-white">
              Search Results for "{query}"
            </h1>
            {videos.length === 0 ? (
              <p className="text-gray-400">No videos found matching your search.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
