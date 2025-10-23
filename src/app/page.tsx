import { Container } from '@/components';

import { ComicsGrid, HeroSection, HotComics } from './components';

export default async function HomePage() {
  return (
    <div className="py-8">
      <Container>
        <HeroSection />
        <HotComics />
        <ComicsGrid />
      </Container>
    </div>
  );
}
