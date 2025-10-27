import { Loader2 } from 'lucide-react';

import { Button } from '@/components';

interface ComicsPaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export function ComicsPagination({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: ComicsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-12 flex justify-center" aria-label="Pagination">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Trước'}
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'default' : 'outline'}
            onClick={() => onPageChange(page)}
            disabled={isLoading}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sau'}
        </Button>
      </div>
    </nav>
  );
}
