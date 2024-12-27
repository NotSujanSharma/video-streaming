/*
  # Seed videos table with sample data

  1. Data Population
    - Adds 20 sample videos across different categories
    - Categories: Movies, TV Shows, Documentaries, Music
    - Uses real video URLs from public sources
*/

INSERT INTO videos (title, description, thumbnail_url, video_url, category) VALUES
-- Movies
('The Great Gatsby', 'A visually stunning adaptation of F. Scott Fitzgerald''s classic novel', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2069', 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'Movies'),
('Inception', 'A mind-bending thriller about dreams within dreams', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2025', 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'Movies'),
('Interstellar', 'An epic space adventure about humanity''s future', 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=2013', 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'Movies'),
('The Matrix', 'A groundbreaking sci-fi action film', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2070', 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'Movies'),

-- TV Shows
('Breaking Bad', 'A high school chemistry teacher turned drug kingpin', 'https://images.unsplash.com/photo-1495100793874-7f94aecae1fb?auto=format&fit=crop&q=80&w=2068', 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 'TV Shows'),
('Stranger Things', 'Supernatural events unfold in a small town', 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=2070', 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', 'TV Shows'),
('The Crown', 'The story of Queen Elizabeth II''s reign', 'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?auto=format&fit=crop&q=80&w=2070', 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', 'TV Shows'),
('Game of Thrones', 'Epic fantasy series based on George R.R. Martin''s novels', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&q=80&w=2069', 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', 'TV Shows'),

-- Documentaries
('Planet Earth', 'Stunning exploration of nature''s wonders', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072', 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', 'Documentaries'),
('The Social Dilemma', 'Impact of social media on society', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2074', 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', 'Documentaries'),
('Chef''s Table', 'Profiles of world-renowned chefs', 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=2080', 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4', 'Documentaries'),
('Our Planet', 'David Attenborough explores Earth''s biodiversity', 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=2074', 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', 'Documentaries'),

-- Music
('Queen Live Aid', 'Historic concert performance at Wembley Stadium', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=2070', 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', 'Music'),
('The Beatles Documentary', 'The story of the legendary band', 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&q=80&w=1974', 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'Music'),
('Jazz Masters', 'Collection of iconic jazz performances', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=80&w=2070', 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'Music'),
('Classical Concerts', 'World''s finest orchestral performances', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=2070', 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'Music');
