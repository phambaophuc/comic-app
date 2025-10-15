import { Clock } from 'lucide-react';

import Link from 'next/link';

import { Chapter } from '@/lib/types';

import { Button } from './ui/button';
import { Card } from './ui/card';

interface ChapterListProps {
  chapters: Chapter[];
  comicSlug: string;
}

export function ChapterList({ chapters, comicSlug }: ChapterListProps) {
  // Sort chapters in reverse order (latest first)
  const sortedChapters = [...chapters].sort(
    (a, b) => b.chapterNumber - a.chapterNumber
  );

  return (
    <div className="space-y-2">
      {sortedChapters.map((chapter) => (
        <Link
          key={chapter.id}
          href={`/comic/${comicSlug}/chapter/${chapter.id}`}
        >
          <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer border-border">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-card-foreground line-clamp-1">
                  Chương {chapter.chapterNumber}
                  {chapter.title &&
                    chapter.title !== `Chapter ${chapter.chapterNumber}` &&
                    `: ${chapter.title}`}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    {new Date(chapter.publishedAt).toLocaleDateString()}
                  </span>
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
