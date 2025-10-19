import { Clock } from 'lucide-react';

import Link from 'next/link';

import { formatDate } from '@/lib/dateUtils';
import { Chapter } from '@/types';

import { Button } from './ui/button';
import { Card } from './ui/card';

interface ChapterListProps {
  chapters: Chapter[];
  comicSlug: string;
}

export function ChapterList({ chapters, comicSlug }: ChapterListProps) {
  return (
    <div className="space-y-2">
      {chapters.map((chapter) => (
        <Link key={chapter.id} href={`/comic/${comicSlug}/${chapter.chapter_number}`}>
          <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer border-border">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-card-foreground line-clamp-1">
                  Chương {chapter.chapter_number}
                  {chapter.chapter_title &&
                    chapter.chapter_title !== `Chapter ${chapter.chapter_number}` &&
                    `: ${chapter.chapter_title}`}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(chapter.created_at)}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Đọc
              </Button>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
