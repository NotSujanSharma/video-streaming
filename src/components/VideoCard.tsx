import React from 'react';
    import { Play } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import ReactPlayer from 'react-player';
    import { supabase } from '../lib/supabase';
    import type { Video } from '../types';

    interface VideoCardProps {
      video: Video;
    }

    export function VideoCard({ video }: VideoCardProps) {
      const [isHovered, setIsHovered] = React.useState(false);
      const [showPlayButton, setShowPlayButton] = React.useState(true);
      const [playTimeout, setPlayTimeout] = React.useState<NodeJS.Timeout | null>(null);
      const videoRef = React.useRef<HTMLDivElement>(null);
      const isMounted = React.useRef(true);

      React.useEffect(() => {
        return () => {
          isMounted.current = false;
          if (playTimeout) {
            clearTimeout(playTimeout);
          }
        };
      }, [playTimeout]);

      const handleMouseEnter = () => {
        setIsHovered(true);
        setShowPlayButton(false);
        const timeout = setTimeout(() => {
          if (isMounted.current && videoRef.current) {
            const videoElement = videoRef.current.querySelector('video');
            if (videoElement) {
              videoElement.play();
            }
          }
        }, 2000);
        setPlayTimeout(timeout);
      };

      const handleMouseLeave = () => {
        setIsHovered(false);
        setShowPlayButton(true);
        if (playTimeout) {
          clearTimeout(playTimeout);
          setPlayTimeout(null);
        }
        if (videoRef.current) {
          const videoElement = videoRef.current.querySelector('video');
          if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
          }
        }
      };

      const handleCardClick = async () => {
        await supabase.rpc('increment_video_views', { video_id: video.id });
      };

      return (
        <Link to={`/watch/${video.id}`} className="group relative" onClick={handleCardClick}>
          <div
            ref={videoRef}
            className="aspect-video w-full overflow-hidden rounded-lg bg-gray-900"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isHovered ? (
              <ReactPlayer
                url={video.video_url}
                width="100%"
                height="100%"
                playing={true}
                muted
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      showinfo: 0,
                      rel: 0,
                      modestbranding: 1,
                    },
                  },
                }}
              />
            ) : (
              <img
                src={video.thumbnail_url}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
            {showPlayButton && (
              <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-60">
                <Play className="text-white opacity-0 transform scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
              </div>
            )}
          </div>
          <h3 className="mt-2 text-lg font-medium text-white">{video.title}</h3>
          <p className="text-sm text-gray-400">{video.category}</p>
        </Link>
      );
    }
