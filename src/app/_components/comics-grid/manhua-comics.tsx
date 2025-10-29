import { FeaturedComics } from '@/components';
import { ComicService } from '@/services';

export async function ManhuaComics() {
  const { data } = await ComicService.getComics(
    {
      page: 1,
      limit: 8,
      genres: ['Manhua'],
      sort: 'views',
      order: 'desc',
    },
    10800,
  );
  return <FeaturedComics title="Truyện Trung" comics={data} />;
}
