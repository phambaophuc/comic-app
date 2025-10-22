'use client';

import { useEffect } from 'react';

import { RecentComic } from '@/types';
import { ChapterWithImagesAndComic } from '@/types/chapter.types';

interface Props {
  chapter: ChapterWithImagesAndComic;
}

export default function RecentTracker({ chapter }: Props) {
  useEffect(() => {
    if (!chapter || !chapter.series) return;

    const recentKey = 'recentlyReadComics';
    const stored = JSON.parse(localStorage.getItem(recentKey) || '[]') as RecentComic[];

    const filtered = stored.filter((item: RecentComic) => item.slug !== chapter.series.slug);

    const newItem: RecentComic = {
      ...chapter.series,
      lastChapter: chapter.chapter_number,
      lastReadAt: new Date().toISOString(),
    };

    localStorage.setItem(recentKey, JSON.stringify([newItem, ...filtered]));
  }, [chapter]);

  return null;
}
