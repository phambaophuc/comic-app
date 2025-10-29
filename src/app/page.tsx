import { Container } from '@/components';

import { HeroSection, HotComics, LatestComics, ManhuaComics, ManhwaComics } from './_components';

export default async function HomePage() {
  return (
    <div className="py-8">
      <Container>
        <HeroSection />
        <HotComics />
        <ManhuaComics />
        <ManhwaComics />
        <LatestComics />
      </Container>
    </div>
  );
}
