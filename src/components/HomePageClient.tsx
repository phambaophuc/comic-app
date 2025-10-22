'use client';

import { useState } from 'react';

import { Clock, Star, TrendingUp } from 'lucide-react';

import { useRouter, useSearchParams } from 'next/navigation';

import { CategoryFilter, ComicCard } from '@/components';
import { Button } from '@/components/ui/button';
import { useComics } from '@/hooks';
import { Comic } from '@/types';

export function HomePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState<'trending' | 'latest' | 'rating'>('trending');

  const currentPage = parseInt(searchParams.get('page') || '1');
  const { data: series } = useComics({ page: currentPage, limit: 20 });

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  return (
    <>
      {/* Filters Section */}
      <section className="mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-foreground">Danh sách truyện</h2>
          <div className="flex gap-2" aria-label="Sort comics">
            <Button
              variant={sortBy === 'trending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('trending')}
              className="gap-2"
            >
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              Thịnh hành
            </Button>
            <Button
              variant={sortBy === 'latest' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('latest')}
              className="gap-2"
            >
              <Clock className="h-4 w-4" aria-hidden="true" />
              Mới nhất
            </Button>
            <Button
              variant={sortBy === 'rating' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('rating')}
              className="gap-2"
            >
              <Star className="h-4 w-4" aria-hidden="true" />
              Đánh giá cao
            </Button>
          </div>
        </div>

        <CategoryFilter onCategoryChange={() => {}} />
      </section>

      {/* Comics Grid */}
      <section aria-label="Comics list">
        {series?.data && series.data.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {series.data.map((comic: Comic) => (
                <ComicCard key={comic.id} comic={comic} />
              ))}
            </div>

            {/* Pagination */}
            {series.meta && series.meta.totalPages > 1 && (
              <nav className="mt-12 flex justify-center" aria-label="Pagination">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    Trước
                  </Button>

                  {Array.from({ length: series.meta.totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= series.meta.totalPages}
                  >
                    Sau
                  </Button>
                </div>
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Không tìm thấy truyện trong thể loại này.</p>
          </div>
        )}
      </section>
    </>
  );
}
