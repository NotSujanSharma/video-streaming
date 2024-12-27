export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  is_admin: boolean;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
}
