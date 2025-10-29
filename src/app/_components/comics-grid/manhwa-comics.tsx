import { FeaturedComics } from '@/components';
import { ComicService } from '@/services';

export async function ManhwaComics() {
  const { data } = await ComicService.getComics(
    {
      page: 1,
      limit: 8,
      genres: ['Manhwa'],
      sort: 'views',
      order: 'desc',
    },
    10800,
  );
  return <FeaturedComics title="Truyện Hàn" comics={data} />;
}
