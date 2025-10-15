'use client';

import { useEffect } from 'react';

import { ChevronLeft, ChevronRight, Home, List } from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface ReaderNavigationProps {
  comicSlug: string;
  prevChapterId?: string;
  nextChapterId?: string;
  chapterNumber: number;
  totalChapters: number;
}

export function ReaderNavigation({
  comicSlug,
  prevChapterId,
  nextChapterId,
  chapterNumber,
  totalChapters
}: ReaderNavigationProps) {
  const router = useRouter();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevChapterId) {
        router.push(`/comic/${comicSlug}/chapter/${prevChapterId}`);
      } else if (e.key === 'ArrowRight' && nextChapterId) {
        router.push(`/comic/${comicSlug}/chapter/${nextChapterId}`);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [comicSlug, prevChapterId, nextChapterId, router]);

  return (
    <div className="sticky top-16 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/comic/${comicSlug}`}>
                <List className="h-5 w-5" />
                <span className="sr-only">Chapter List</span>
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Chapter</span>
            <span className="font-semibold text-foreground">
              {chapterNumber} / {totalChapters}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {prevChapterId ? (
              <Button variant="ghost" size="sm" asChild className="gap-1">
                <Link href={`/comic/${comicSlug}/chapter/${prevChapterId}`}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Prev</span>
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" disabled className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Prev</span>
              </Button>
            )}

            {nextChapterId ? (
              <Button variant="default" size="sm" asChild className="gap-1">
                <Link href={`/comic/${comicSlug}/chapter/${nextChapterId}`}>
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button variant="default" size="sm" disabled className="gap-1">
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
