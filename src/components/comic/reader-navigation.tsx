'use client';

import { useEffect } from 'react';

import { ChevronLeft, ChevronRight, Home, List } from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '../ui';

interface ReaderNavigationProps {
  comicSlug: string;
  comicTitle: string;
  chapterNumber: number;
  prevChapter?: number | null;
  nextChapter?: number | null;
}

export function ReaderNavigation({
  comicSlug,
  comicTitle,
  chapterNumber,
  prevChapter = null,
  nextChapter = null,
}: ReaderNavigationProps) {
  const router = useRouter();

  const hasPrevChapter = prevChapter !== null;
  const hasNextChapter = nextChapter !== null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          if (hasPrevChapter) {
            router.push(`/truyen-tranh/${comicSlug}/${prevChapter}`);
          }
          break;
        case 'ArrowRight':
          if (hasNextChapter) {
            router.push(`/truyen-tranh/${comicSlug}/${nextChapter}`);
          }
          break;
        case 'Home':
          router.push(`/truyen-tranh/${comicSlug}`);
          break;
        case 'Escape':
          router.push(`/truyen-tranh/${comicSlug}`);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [comicSlug, hasNextChapter, hasPrevChapter, nextChapter, prevChapter, router]);

  return (
    <div className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <Home className="h-5 w-5" />
                <span className="sr-only">Trang chủ</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/truyen-tranh/${comicSlug}`}>
                <List className="h-5 w-5" />
                <span className="sr-only">Danh sách chương</span>
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {/* Desktop: Hiển thị đầy đủ */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="max-w-[200px] truncate font-medium text-foreground">
                {comicTitle}
              </span>
              <div className="h-4 w-px bg-border" />
              <span className="text-muted-foreground whitespace-nowrap">
                Chương <span className="font-semibold text-foreground">{chapterNumber}</span>
              </span>
            </div>

            {/* Mobile: Chỉ hiển thị chapter */}
            <div className="sm:hidden text-muted-foreground whitespace-nowrap">
              Chương <span className="font-semibold text-foreground">{chapterNumber}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasNextChapter ? (
              <Button variant="ghost" size="sm" asChild className="gap-1">
                <Link href={`/truyen-tranh/${comicSlug}/${chapterNumber - 1}`}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Trước</span>
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" disabled className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Trước</span>
              </Button>
            )}

            {hasNextChapter ? (
              <Button variant="default" size="sm" asChild className="gap-1">
                <Link href={`/truyen-tranh/${comicSlug}/${chapterNumber + 1}`}>
                  <span className="hidden sm:inline">Sau</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button variant="default" size="sm" disabled className="gap-1">
                <span className="hidden sm:inline">Sau</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
