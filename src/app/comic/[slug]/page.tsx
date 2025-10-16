import { BookOpen, Clock, Eye, Heart, Star } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { ChapterList, Container } from '@/components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cms } from '@/services';

interface ComicDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ComicDetailPage({ params }: ComicDetailPageProps) {
  const { slug } = await params;
  const comic = await cms.getBySlug(slug);

  return (
    <div>
      {/* Banner Section */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={comic.cover_url || '/placeholder.svg'}
          alt={comic.title}
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
                  alt={comic.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

              <div className="flex flex-wrap gap-2">
                {comic.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
                {comic.status === 'completed' && (
                  <Badge className="bg-accent text-accent-foreground">Completed</Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">5</span>
                  <span className="text-muted-foreground">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold text-foreground">
                    {(comic.views / 1000000).toFixed(1)}M
                  </span>
                  <span className="text-muted-foreground">Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold text-foreground">
                    {(10000 / 1000).toFixed(0)}K
                  </span>
                  <span className="text-muted-foreground">Favorites</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold text-foreground">{comic.chapters.length}</span>
                  <span className="text-muted-foreground">Chapters</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button size="lg" asChild className="rounded-full">
                  <Link href={`/comic/${comic.slug}/chapter/1`}>Start Reading</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full gap-2 bg-transparent">
                  <Heart className="h-5 w-5" />
                  Add to Favorites
                </Button>
              </div>

              <div className="pt-4">
                <h2 className="text-sm font-semibold text-muted-foreground mb-2">DESCRIPTION</h2>
                <p className="text-foreground leading-relaxed">{comic.description}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <Clock className="h-4 w-4" />
                <span>Last updated: {new Date(comic.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Chapters Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Chapters</h2>
              <span className="text-sm text-muted-foreground">
                {comic.chapters.length} chapters available
              </span>
            </div>
            <ChapterList chapters={comic.chapters} comicSlug={comic.slug} />
          </div>
        </div>
      </Container>
    </div>
  );
}
