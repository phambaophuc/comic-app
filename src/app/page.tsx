'use client';

import { useMemo, useState } from 'react';

import { Clock, Star, TrendingUp } from 'lucide-react';

import { CategoryFilter, ComicCard, Container, FeaturedComics } from '@/components';
import { Button } from '@/components/ui/button';
import { useComics } from '@/hooks';
import { comics } from '@/lib/data/comics';

export default function HomePage() {
  const [sortBy, setSortBy] = useState<'trending' | 'latest' | 'rating'>('trending');

  const { data: series } = useComics({ page: 1, limit: 10 });

  const featuredComics = useMemo(() => {
    return [...comics].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }, []);

  return (
    <div className="py-8">
      <Container>
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 p-8 md:p-12">
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">
                Khám phá truyện tranh yêu thích tiếp theo của bạn
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Khám phá hàng nghìn câu chuyện hấp dẫn thuộc mọi thể loại. Bắt đầu hành trình đọc
                truyện của bạn ngay hôm nay.
              </p>
              <Button size="lg" className="rounded-full">
                Khám phá ngay
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Comics Section */}
        <FeaturedComics title="Truyện nổi bật" comics={featuredComics} />

        {/* Filters Section */}
        <section className="mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">Danh sách truyện</h2>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'trending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('trending')}
                className="gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Thịnh hành
              </Button>
              <Button
                variant={sortBy === 'latest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('latest')}
                className="gap-2"
              >
                <Clock className="h-4 w-4" />
                Mới nhất
              </Button>
              <Button
                variant={sortBy === 'rating' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('rating')}
                className="gap-2"
              >
                <Star className="h-4 w-4" />
                Đánh giá cao
              </Button>
            </div>
          </div>

          <CategoryFilter onCategoryChange={() => {}} />
        </section>

        {/* Comics Grid */}
        <section>
          {series?.data && series?.data.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {series.data.map((comic) => (
                <ComicCard key={comic.id} comic={comic} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Không tìm thấy truyện trong thể loại này.</p>
            </div>
          )}
        </section>

        {/* Pagination Placeholder */}
        <section className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Trước
            </Button>
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Sau</Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
