import { Chapter, Comic } from './base.types';

export interface ComicWithChapters extends Comic {
  chapters: Chapter[];
}

export interface RecentComic extends Comic {
  lastChapter?: number;
  lastReadAt?: string;
}
