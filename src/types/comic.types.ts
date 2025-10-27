import { Chapter, Comic, PaginationParams } from './base.types';

export interface ComicWithChapters extends Comic {
  chapters: Chapter[];
}

export interface RecentComic extends Comic {
  lastChapter?: number;
  lastReadAt?: string;
}

export interface FindAllParams extends PaginationParams {
  genres?: string[];
}
