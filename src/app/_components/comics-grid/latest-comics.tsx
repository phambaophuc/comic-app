import { Clock, Star, TrendingUp } from 'lucide-react';

import Link from 'next/link';

import { Button, ComicCard } from '@/components';
import { ComicService } from '@/services';

export const revalidate = 600;

export async function LatestComics() {
  const comics = await ComicService.getLatest({ page: 1, limit: 10 });

  return (
    <>
      <section className="mb-8 space-y-6" aria-label="Filter">
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

      <section aria-label="Comics list">
        {comics?.data?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {comics.data.map((comic) => (
                <ComicCard key={comic.id} comic={comic} />
              ))}
            </div>

            {comics.meta?.totalPages > 1 && (
              <nav className="mt-12 flex justify-center">
                <Button asChild variant="outline">
                  <Link href="/truyen-tranh">Xem thêm</Link>
                </Button>
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Không tìm thấy truyện.</p>
          </div>
        )}
      </section>
    </>
  );
}
