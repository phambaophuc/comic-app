'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Thời gian cache data (5 phút)
            staleTime: 5 * 60 * 1000,
            // Thời gian giữ data trong cache khi không sử dụng (10 phút)
            gcTime: 10 * 60 * 1000,
            // Tự động refetch khi window focus
            refetchOnWindowFocus: false,
            // Retry khi fetch fail
            retry: 1,
            // Thời gian retry
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            // Retry cho mutations
            retry: 0,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
