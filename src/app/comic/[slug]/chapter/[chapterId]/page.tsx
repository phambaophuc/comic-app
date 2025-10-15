import { ChevronLeft, ChevronRight } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ReaderNavigation } from '@/components';
import { Button } from '@/components/ui/button';
import {
  getChapterById,
  getChaptersByComicId,
  getComicBySlug
} from '@/lib/data/comics';

interface ReaderPageProps {
  params: Promise<{
    slug: string;
    chapterId: string;
  }>;
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { slug, chapterId } = await params;
  const comic = getComicBySlug(slug);

  if (!comic) {
    notFound();
  }

  const chapters = getChaptersByComicId(comic.id);
  const chapter = getChapterById(comic.id, chapterId);

  if (!chapter) {
    notFound();
  }

  // Find prev and next chapters
  const currentIndex = chapters.findIndex((ch) => ch.id === chapterId);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : undefined;
  const nextChapter =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : undefined;

  return (
    <div className="min-h-screen bg-background">
      <ReaderNavigation
        comicSlug={slug}
        prevChapterId={prevChapter?.id}
        nextChapterId={nextChapter?.id}
        chapterNumber={chapter.chapterNumber}
        totalChapters={comic.totalChapters}
      />

      {/* Reader Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <Link
            href={`/comic/${slug}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {comic.title}
          </Link>
          <h1 className="text-2xl font-bold mt-2 text-foreground">
            Chapter {chapter.chapterNumber}
            {chapter.title &&
              chapter.title !== `Chapter ${chapter.chapterNumber}` &&
              `: ${chapter.title}`}
          </h1>
        </div>

        {/* Comic Pages */}
        <div className="space-y-0">
          {chapter.pages.map((page, index) => (
            <div key={index} className="relative w-full">
              <Image
                src={page || '/placeholder.svg'}
                alt={`Page ${index + 1}`}
                width={800}
                height={1400}
                className="w-full h-auto"
                priority={index < 3}
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4 pb-8">
          {prevChapter ? (
            <Button
              variant="outline"
              size="lg"
              asChild
              className="gap-2 bg-transparent"
            >
              <Link href={`/comic/${slug}/chapter/${prevChapter.id}`}>
                <ChevronLeft className="h-5 w-5" />
                Previous Chapter
              </Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="lg"
              disabled
              className="gap-2 bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous Chapter
            </Button>
          )}

          <Button variant="outline" size="lg" asChild>
            <Link href={`/comic/${slug}`}>Chapter List</Link>
          </Button>

          {nextChapter ? (
            <Button size="lg" asChild className="gap-2">
              <Link href={`/comic/${slug}/chapter/${nextChapter.id}`}>
                Next Chapter
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button size="lg" disabled className="gap-2">
              Next Chapter
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
