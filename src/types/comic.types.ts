export interface Comic {
  id: string;
  source_id: string;
  title: string;
  slug: string;
  description: string | null;
  author: string | null;
  cover_url: string | null;
  views: number;
  status: string;
  genres: string[];
  chapters: Chapter[];
  created_at: Date;
  updated_at: Date;
}

export interface Chapter {
  id: string;
  series_id: string;
  chapter_number: string;
  chapter_title: string | null;
  chapter_url: string;
  image_count: number;
  images: ChapterImage[];
  total_chapters: number;
  downloaded_at: Date | null;
  created_at: Date;
}

export interface ChapterImage {
  id: string;
  chapter_id: string;
  image_url: string;
  image_order: number;
  local_path: string | null;
  created_at: Date;
}

// Query Params
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedAPIResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
