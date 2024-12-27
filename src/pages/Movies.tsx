import React from 'react';
    import { VideoCard } from '../components/VideoCard';
    import { supabase } from '../lib/supabase';
    import type { Video } from '../types';

    type SortOption = 'created_at' | 'title' | 'views';

    export function Movies() {
      const [videos, setVideos] = React.useState<Video[]>([]);
      const [loading, setLoading] = React.useState(true);
      const [sortBy, setSortBy] = React.useState<SortOption>('created_at');

      React.useEffect(() => {
        async function fetchMovies() {
          const { data, error } = await supabase
            .from('videos')
            .select('*')
            .eq('category', 'Movies')
            .order(sortBy, { ascending: false });

          if (!error && data) {
            setVideos(data);
          }
          setLoading(false);
        }

        fetchMovies();
      }, [sortBy]);

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
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white">Movies</h1>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-md bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="created_at">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="views">Sort by Views</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      );
    }
