interface BaseType {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface Comic extends BaseType {
  source_id: string;
  title: string;
  slug: string;
  description: string | null;
  author: string | null;
  cover_url: string | null;
  views: number;
  status: string;
  genres: string[];
  last_update: string | null;
}

export interface Chapter extends Omit<BaseType, 'updated_at'> {
  id: string;
  series_id: string;
  chapter_number: number;
  chapter_title: string | null;
  chapter_url: string;
  image_count: number;
  total_chapters?: number;
  downloaded_at: Date | null;
  is_deleted: boolean;
}

export interface ChapterImage extends Omit<BaseType, 'updated_at'> {
  chapter_id: string;
  image_url: string;
  image_order: number;
  local_path: string;
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

export interface APIResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}
