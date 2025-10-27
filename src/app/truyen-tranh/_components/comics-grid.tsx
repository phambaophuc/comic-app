import { ComicCard } from '@/components';
import { formatRelativeTime } from '@/lib/dateUtils';
import { Comic } from '@/types';

interface ComicsGridProps {
  comics: Comic[];
}

export function ComicsGrid({ comics }: ComicsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {comics.map((comic) => (
        <div key={comic.id} className="relative">
          <ComicCard comic={comic} />
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full shadow-sm">
            {comic.last_update ? formatRelativeTime(comic.last_update) : 'Sắp ra mắt'}
          </span>
        </div>
      ))}
    </div>
  );
}
