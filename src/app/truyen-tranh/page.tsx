'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { CategoryFilter, Container, LoadingOverlay, LoadingSkeleton } from '@/components';
import { useComics } from '@/hooks';

import { ComicsEmptyState, ComicsGrid, ComicsPagination, ComicsSortButtons } from './_components';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState<'trending' | 'latest' | 'rating'>('trending');
  const [isLoading, setIsLoading] = useState(false);

  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentGenres = searchParams.getAll('genres');

  const getSelectedCategoriesFromUrl = (genres: string[]) => {
    if (genres.length === 0) return ['all'];
    return genres;
  };

  const {
    data: series,
    isLoading: isQueryLoading,
    isFetching,
  } = useComics({
    page: currentPage,
    limit: 20,
    genres: currentGenres.length > 0 ? currentGenres : undefined,
  });

  const showLoading = isQueryLoading || isLoading || isFetching;

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (categories: string[]) => {
    setIsLoading(true);
    const newSearchParams = new URLSearchParams();

    newSearchParams.set('page', '1');
    categories.forEach((category) => {
      newSearchParams.append('genres', category);
    });

    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  const handleSortChange = (sort: 'trending' | 'latest' | 'rating') => {
    setSortBy(sort);
  };

  const handleShowAllComics = () => {
    handleCategoryChange([]);
  };

  useEffect(() => {
    if (series) {
      setIsLoading(false);
    }
  }, [series]);

  return (
    <Container className="py-8">
      {/* Filters Section */}
      <section className="mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-foreground">Truyện mới nhất</h2>
          <ComicsSortButtons sortBy={sortBy} onSortChange={handleSortChange} />
        </div>

        <CategoryFilter
          onCategoryChange={handleCategoryChange}
          selectedCategories={getSelectedCategoriesFromUrl(currentGenres)}
        />
      </section>

      {/* Comics Grid */}
      <section aria-label="Comics list">
        {showLoading ? (
          <LoadingSkeleton />
        ) : series?.data && series.data.length > 0 ? (
          <>
            <ComicsGrid comics={series.data} />

            {series.meta && (
              <ComicsPagination
                currentPage={currentPage}
                totalPages={series.meta.totalPages}
                isLoading={showLoading}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <ComicsEmptyState onShowAll={handleShowAllComics} isLoading={showLoading} />
        )}

        {showLoading && <LoadingOverlay />}
      </section>
    </Container>
  );
}
