import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ComicService } from '@/services';
import { ComicWithChapters, PaginatedAPIResponse, PaginationParams } from '@/types';

// ============================================
// COMIC HOOKS
// ============================================

export const COMIC_KEYS = {
  all: ['manga-series'] as const,
  lists: () => [...COMIC_KEYS.all, 'list'] as const,
  list: (params?: PaginationParams) => [...COMIC_KEYS.lists(), params] as const,
};

export function useComics(
  params?: PaginationParams,
  options?: Omit<UseQueryOptions<PaginatedAPIResponse<ComicWithChapters>>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: COMIC_KEYS.list(params),
    queryFn: () => ComicService.getLatest(params),
    ...options,
  });
}
