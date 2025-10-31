import { Container, TopRankingsTabbed } from '@/components';
import { ComicService } from '@/services';

import { HeroSection, HotComics, LatestComics } from './_components';

export default async function HomePage() {
  const { data } = await ComicService.getComics(
    { page: 1, limit: 5, sort: 'views', order: 'desc' },
    10800,
  );
  return (
    <div className="py-8">
      <Container>
        <HeroSection />
        <HotComics />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <LatestComics />
          </div>
          <aside className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              <TopRankingsTabbed todayComics={data} weekComics={data} />
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
