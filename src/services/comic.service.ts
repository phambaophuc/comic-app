import { buildQueryString, fetchApi } from '@/lib/fetchApi';
import { ComicWithChapters, FindAllParams, PaginatedAPIResponse } from '@/types';

const BASE_PATH = '/comics';

export const ComicService = {
  getComics: (params?: FindAllParams, revalidate?: number) => {
    const query = params ? buildQueryString(params) : '';
    return fetchApi<PaginatedAPIResponse<ComicWithChapters>>(`${BASE_PATH}${query}`, {
      revalidate: revalidate ?? 600,
    });
  },

  getBySlug: (slug: string) =>
    fetchApi<ComicWithChapters>(`${BASE_PATH}/${slug}`, { revalidate: 3600 }),
};
