import { Eye, Heart } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { formatRelativeTime } from '@/lib/dateUtils';
import { formatNumber } from '@/lib/formatNumber';
import { Comic } from '@/types';

interface ComicCardProps {
  comic: Comic & {
    lastChapter?: number;
    lastReadAt?: string;
  };
  index?: number;
}

export function ComicCard({ comic, index }: ComicCardProps) {
  return (
    <div className="group block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
        <Image
          src={comic.cover_url || '/placeholder.svg'}
          alt={comic.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 16vw, 12vw"
          priority={index ? index < 10 : true}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>{formatNumber(comic.views)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                <span>{formatNumber((comic.views / 4) * 2)}</span>
              </div>
            </div>

            <Link href={`/truyen-tranh/${comic.slug}`}>
              <h4 className="font-bold text-white text-lg line-clamp-1 hover:text-primary transition-colors">
                {comic.title}
              </h4>
            </Link>

            {comic.lastChapter && (
              <div className="text-sm text-white/80 flex items-center justify-between">
                <Link
                  href={`/truyen-tranh/${comic.slug}/${comic.lastChapter}`}
                  className="hover:text-primary hover:underline transition-colors"
                >
                  Chương {comic.lastChapter}
                </Link>

                {comic.lastReadAt && (
                  <span className="text-white/60">{formatRelativeTime(comic.lastReadAt)}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
