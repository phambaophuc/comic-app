import { FeaturedComics } from '@/components';
import { cms } from '@/services';

export async function HotComics() {
  const hotComics = await cms.getHotComics(8);
  return <FeaturedComics title="Truyện nổi bật" comics={hotComics} />;
}
