import { ChevronLeft, ChevronRight } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { ReaderNavigation } from '@/components';
import { Button } from '@/components/ui/button';
import { cms } from '@/services';

interface ReaderPageProps {
  params: Promise<{
    slug: string;
    cn: string;
  }>;
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { slug, cn } = await params;
  const chapter = await cms.getByChapter(slug, cn);

  const chapterNumber = parseInt(chapter.chapter_number);

  return (
    <div className="min-h-screen bg-background">
      <ReaderNavigation
        comicSlug={slug}
        chapterNumber={chapterNumber}
        totalChapters={chapter.total_chapters}
      />

      {/* Reader Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <Link
            href={`/comic/${slug}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {chapter.chapter_title}
          </Link>
          <h1 className="text-2xl font-bold mt-2 text-foreground">
            Chapter {chapter.chapter_number}
            {chapter.chapter_title &&
              chapter.chapter_title !== `Chapter ${chapter.chapter_number}` &&
              `: ${chapter.chapter_title}`}
          </h1>
        </div>

        {/* Comic Pages */}
        <div className="space-y-0">
          {chapter.images &&
            chapter.images.map((img, index) => (
              <div key={index} className="relative w-full">
                <Image
                  src={'/manga_storage/' + img.local_path || '/placeholder.svg'}
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
          {chapterNumber > 0 ? (
            <Button variant="outline" size="lg" asChild className="gap-2 bg-transparent">
              <Link href={`/comic/${slug}/chapter/${chapterNumber - 1}`}>
                <ChevronLeft className="h-5 w-5" />
                Previous Chapter
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="lg" disabled className="gap-2 bg-transparent">
              <ChevronLeft className="h-5 w-5" />
              Previous Chapter
            </Button>
          )}

          <Button variant="outline" size="lg" asChild>
            <Link href={`/comic/${slug}`}>Chapter List</Link>
          </Button>

          {chapterNumber < chapter.total_chapters ? (
            <Button size="lg" asChild className="gap-2">
              <Link href={`/comic/${slug}/chapter/${chapterNumber + 1}`}>
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
