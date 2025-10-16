import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ApiError } from '@/lib/api-client';
import { cms } from '@/services';
import { Comic, PaginatedAPIResponse, PaginationParams } from '@/types';

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
  options?: Omit<UseQueryOptions<PaginatedAPIResponse<Comic>, ApiError>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: COMIC_KEYS.list(params),
    queryFn: () => cms.getAll(params),
    ...options,
  });
}
