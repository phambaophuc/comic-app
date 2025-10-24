import { FeaturedComics } from '@/components';
import { ComicService } from '@/services';

export const revalidate = 10800;

export async function HotComics() {
  const hotComics = await ComicService.getHot(8);
  return <FeaturedComics title="Truyện nổi bật" comics={hotComics} />;
}
