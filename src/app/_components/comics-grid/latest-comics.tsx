import Link from 'next/link';

import { Button, ComicCard } from '@/components';
import { ComicService } from '@/services';

export async function LatestComics() {
  const comics = await ComicService.getComics({ page: 1, limit: 6 }, 600);
  return (
    <>
      <section className="mb-8 space-y-6" aria-label="Filter">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-foreground">Cập nhật gần nhất</h2>
        </div>
      </section>
      <section aria-label="Comics list">
        {comics?.data?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {comics.data.map((comic, index) => (
                <ComicCard key={comic.id} comic={comic} index={index} />
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
