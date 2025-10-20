'use client';

import { useEffect } from 'react';

import { Chapter, RecentComic } from '@/types';

interface Props {
  chapter: Chapter;
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
