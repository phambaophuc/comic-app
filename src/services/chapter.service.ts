import { fetchApi } from '@/lib/fetchApi';
import { GetChapterResponse } from '@/types';

const BASE_PATH = '/chapters';

export const ChapterService = {
  getByChapterNumber: (slug: string, cn: string) =>
    fetchApi<GetChapterResponse>(`${BASE_PATH}/${slug}/${cn}`, { revalidate: 86400 }),
};
