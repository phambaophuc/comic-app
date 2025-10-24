import { Container } from '@/components';

import { HeroSection, HotComics, LatestComics } from './_components';

export default async function HomePage() {
  return (
    <div className="py-8">
      <Container>
        <HeroSection />
        <HotComics />
        <LatestComics />
      </Container>
    </div>
  );
}
