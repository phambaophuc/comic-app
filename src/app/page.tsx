import { Clock, Star, TrendingUp } from 'lucide-react';

import Link from 'next/link';

import { ComicCard, Container, FeaturedComics } from '@/components';
import { Button } from '@/components/ui/button';
import { cms } from '@/services';

export default async function HomePage() {
  const [comics, hotcomics] = await Promise.all([
    cms.getAll({ page: 1, limit: 20 }),
    cms.getHotComics(8),
  ]);
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
        <FeaturedComics title="Truyện nổi bật" comics={hotcomics} />

        {/* Filters Section */}
        <section className="mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">Danh sách truyện</h2>
            <div className="flex gap-2" aria-label="Sort comics">
              <Button variant="default" size="sm" className="gap-2" aria-label="Sort by latest">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Mới nhất
              </Button>
              <Button variant="outline" size="sm" className="gap-2" aria-label="Sort by trending">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                Thịnh hành
              </Button>
              <Button variant="outline" size="sm" className="gap-2" aria-label="Sort by rating">
                <Star className="h-4 w-4" aria-hidden="true" />
                Đánh giá cao
              </Button>
            </div>
          </div>
        </section>

        {/* Comics Grid */}
        <section aria-label="Comics list">
          {comics?.data && comics?.data.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {comics.data.map((comic) => (
                  <ComicCard key={comic.id} comic={comic} />
                ))}
              </div>

              {/* Pagination - chỉ hiển thị khi có nhiều trang */}
              {comics.meta && comics.meta.totalPages > 1 && (
                <nav className="mt-12 flex justify-center" aria-label="View more">
                  <Button asChild variant="outline">
                    <Link href={`/truyen-tranh`} aria-label="Comics">
                      Xem thêm
                    </Link>
                  </Button>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Không tìm thấy truyện trong thể loại này.</p>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
