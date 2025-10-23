import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Metadata } from 'next';

import Image from 'next/image';
import Link from 'next/link';

import { Button, ReaderNavigation } from '@/components';
import { cts } from '@/services';

import RecentTracker from './RecentTracker';

interface ReaderPageProps {
  params: Promise<{
    slug: string;
    cn: string;
  }>;
}

export async function generateMetadata({ params }: ReaderPageProps): Promise<Metadata> {
  const { slug, cn } = await params;
  const chapter = await cts.getByChapterNumber(slug, cn);

  return {
    title: `${chapter.series.title} - ${chapter.chapter_title}`,
    description: `Đọc ${chapter.series.title} ${chapter.chapter_title} online.`,
    openGraph: {
      title: `${chapter.series.title} - ${chapter.chapter_title}`,
      description: `Đọc ${chapter.chapter_title}`,
      images: chapter.images?.[0]?.local_path ? [chapter.images[0].local_path] : [],
    },
  };
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { slug, cn } = await params;
  const chapter = await cts.getByChapterNumber(slug, cn);

  const isFirstChapter = chapter.chapter_number <= 1;
  const isLastChapter = chapter.chapter_number >= chapter.total_chapters;

  return (
    <div className="min-h-screen bg-background">
      <RecentTracker chapter={chapter} />

      <ReaderNavigation
        comicSlug={slug}
        chapterNumber={chapter.chapter_number}
        totalChapters={chapter.total_chapters}
      />

      {/* Reader Content */}
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6 text-center">
          <Link
            href={`/truyen-tranh/${slug}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {chapter.series.title}
          </Link>
          <h1 className="text-2xl font-bold mt-2 text-foreground">{chapter.chapter_title}</h1>
        </div>

        {/* Comic Pages */}
        <div className="space-y-0">
          {chapter.images &&
            chapter.images.map((img, index) => (
              <div key={index} className="relative w-full">
                <Image
                  src={img.local_path || '/placeholder.svg'}
                  alt={`Trang ${index + 1}`}
                  width={800}
                  height={1400}
                  className="w-full h-auto"
                  priority
                  loading="eager"
                  unoptimized
                />
              </div>
            ))}
        </div>

        {/* Bottom Navigation */}
        <nav
          className="mt-8 flex items-center justify-center gap-4 pb-8"
          aria-label="Chapter navigation"
        >
          <Button
            variant="outline"
            size="lg"
            asChild={!isFirstChapter}
            className="gap-2 bg-transparent"
            disabled={isFirstChapter}
          >
            {!isFirstChapter ? (
              <Link href={`/truyen-tranh/${slug}/${chapter.chapter_number - 1}`}>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                Trước
              </Link>
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                Trước
              </>
            )}
          </Button>

          <Button size="lg" asChild={!isLastChapter} className="gap-2" disabled={isLastChapter}>
            {!isLastChapter ? (
              <Link href={`/truyen-tranh/${slug}/${chapter.chapter_number + 1}`}>
                Sau
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            ) : (
              <>
                Sau
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </>
            )}
          </Button>
        </nav>
      </div>
    </div>
  );
}
