import { buildQueryString, fetchApi } from '@/lib/fetchApi';
import { Comic, ComicWithChapters, PaginatedAPIResponse, PaginationParams } from '@/types';

const BASE_PATH = '/comics';

export const ComicService = {
  getLatest: (params?: PaginationParams) => {
    const query = params ? buildQueryString(params) : '';
    return fetchApi<PaginatedAPIResponse<ComicWithChapters>>(`${BASE_PATH}${query}`, {
      revalidate: 600,
    });
  },

  getHot: (limit = 8) =>
    fetchApi<Comic[]>(`${BASE_PATH}/hot?limit=${limit}`, { revalidate: 10800 }),

  getBySlug: (slug: string) =>
    fetchApi<ComicWithChapters>(`${BASE_PATH}/${slug}`, { revalidate: 3600 }),
};
