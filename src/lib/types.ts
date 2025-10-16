export interface Comic {
  id: string;
  slug: string;
  title: string;
  author: string;
  cover_url: string;
  bannerImage: string;
  description: string;
  genres: string[];
  rating: number;
  status: 'ongoing' | 'completed';
  totalChapters: number;
  views: number;
  favorites: number;
  lastUpdated: string;
}

export interface Chapter {
  id: string;
  comicId: string;
  chapterNumber: number;
  title: string;
  pages: string[];
  publishedAt: string;
}

export interface UserLibrary {
  favorites: string[];
  recentlyRead: {
    comicId: string;
    chapterId: string;
    lastReadAt: string;
  }[];
}
