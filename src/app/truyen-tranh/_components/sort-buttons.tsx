import { Clock, Star, TrendingUp } from 'lucide-react';

import { Button } from '@/components';

interface ComicsSortButtonsProps {
  sortBy: 'trending' | 'latest' | 'rating';
  onSortChange: (sort: 'trending' | 'latest' | 'rating') => void;
}

export function ComicsSortButtons({ sortBy, onSortChange }: ComicsSortButtonsProps) {
  return (
    <div className="flex gap-2" aria-label="Sort comics">
      <Button
        variant={sortBy === 'trending' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSortChange('trending')}
        className="gap-2"
      >
        <TrendingUp className="h-4 w-4" aria-hidden="true" />
        Thịnh hành
      </Button>
      <Button
        variant={sortBy === 'latest' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSortChange('latest')}
        className="gap-2"
      >
        <Clock className="h-4 w-4" aria-hidden="true" />
        Mới nhất
      </Button>
      <Button
        variant={sortBy === 'rating' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSortChange('rating')}
        className="gap-2"
      >
        <Star className="h-4 w-4" aria-hidden="true" />
        Đánh giá cao
      </Button>
    </div>
  );
}
