import { Eye, Heart } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { Comic } from '@/types';

interface ComicCardProps {
  comic: Comic;
}

export function ComicCard({ comic }: ComicCardProps) {
  return (
    <Link href={`/comic/${comic.slug}`} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Cover Image */}
        <Image
          src={comic.cover_url || '/placeholder.svg'}
          alt={comic.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            {/* Title */}
            <h3 className="font-bold text-white text-lg line-clamp-2 text-balance">
              {comic.title}
            </h3>

            {/* Stats */}
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>{(comic.views / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                <span>{(10000 / 1000).toFixed(1)}K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
