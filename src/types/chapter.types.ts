import { Chapter, ChapterImage, Comic } from './base.types';

export interface ChapterWithImagesAndComic extends Chapter {
  images: ChapterImage[];
  series: Comic;
}

export interface GetChapterResponse extends ChapterWithImagesAndComic {
  total_chapters: number;
}
