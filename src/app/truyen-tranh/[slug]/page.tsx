import { BookOpen, Clock, Eye, Heart, Star } from 'lucide-react';

import { Metadata } from 'next';

import Image from 'next/image';
import Link from 'next/link';

import { ChapterList, Container, FavoriteButton } from '@/components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/dateUtils';
import { cms } from '@/services';

interface ComicDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ComicDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const comic = await cms.getBySlug(slug);

  return {
    title: comic.title,
    description: comic.description ? comic.description.substring(0, 160) : '',
    openGraph: {
      title: comic.title,
      description: comic.description ?? '',
      images: comic.cover_url ? [comic.cover_url] : [],
    },
  };
}

export default async function ComicDetailPage({ params }: ComicDetailPageProps) {
  const { slug } = await params;
  const comic = await cms.getBySlug(slug);

  return (
    <>
      {/* Banner Section */}
      <div itemScope className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={comic.cover_url || '/placeholder.svg'}
          alt={`${comic.title} - Truyện ${comic.genres.join(', ')}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <Container>
        <div className="relative -mt-32 md:-mt-40 pb-12">
          {/* Comic Info Card */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Cover Image */}
            <div className="flex-shrink-0">
              <div className="relative w-48 md:w-56 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-4 border-background">
                <Image
                  src={comic.cover_url || '/placeholder.svg'}
                  alt={`Ảnh bìa ${comic.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance text-foreground">
                  {comic.title}
                </h1>
                <p className="text-lg text-muted-foreground">by {comic.author}</p>
              </div>

              <div className="flex flex-wrap gap-2" itemProp="genre">
                {comic.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
                {comic.status === 'completed' && (
                  <Badge className="bg-accent text-accent-foreground">Hoàn thành</Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2" itemProp="aggregateRating">
                  <Star className="h-5 w-5 fill-accent text-accent" aria-hidden="true" />
                  <span className="font-semibold text-foreground" itemProp="ratingValue">
                    5
                  </span>
                  <span className="text-muted-foreground">Đánh giá</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <span className="font-semibold text-foreground">
                    {(comic.views / 1000000).toFixed(1)}M
                  </span>
                  <span className="text-muted-foreground">Lượt xem</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <span className="font-semibold text-foreground">
                    {(10000 / 1000).toFixed(0)}K
                  </span>
                  <span className="text-muted-foreground">Yêu thích</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <span className="font-semibold text-foreground" itemProp="numberOfPages">
                    {comic.chapters.length}
                  </span>
                  <span className="text-muted-foreground">Chương</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button size="lg" asChild className="rounded-full">
                  <Link
                    href={`/truyen-tranh/${comic.slug}/${1}`}
                    aria-label={`Start reading ${comic.title} from chapter 1`}
                  >
                    Đọc ngay
                  </Link>
                </Button>
                <FavoriteButton comic={comic} />
              </div>

              <div className="pt-4">
                <h2 className="text-sm font-semibold text-muted-foreground mb-2">MÔ TẢ</h2>
                <p className="text-foreground leading-relaxed" itemProp="description">
                  {comic.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>Cập nhật gần nhất: {formatDate(comic.updated_at)}</span>
              </div>
            </div>
          </div>

          {/* Chapters Section */}
          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Danh sách chương</h2>
              <span className="text-sm text-muted-foreground">
                {comic.chapters.length} chương có sẵn
              </span>
            </div>
            <ChapterList chapters={comic.chapters} comicSlug={comic.slug} />
          </section>
        </div>
      </Container>
    </>
  );
}
