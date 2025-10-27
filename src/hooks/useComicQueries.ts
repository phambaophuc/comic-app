import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ComicService } from '@/services';
import { ComicWithChapters, FindAllParams, PaginatedAPIResponse } from '@/types';

// ============================================
// COMIC HOOKS
// ============================================

export const COMIC_KEYS = {
  all: ['manga-series'] as const,
  lists: () => [...COMIC_KEYS.all, 'list'] as const,
  list: (params?: FindAllParams) => [...COMIC_KEYS.lists(), params] as const,
};

export function useComics(
  params?: FindAllParams,
  options?: Omit<UseQueryOptions<PaginatedAPIResponse<ComicWithChapters>>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: COMIC_KEYS.list(params),
    queryFn: () => ComicService.getLatest(params),
    placeholderData: keepPreviousData,
    staleTime: 5000,
    ...options,
  });
}
