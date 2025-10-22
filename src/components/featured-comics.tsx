'use client';

import { memo, useRef } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Comic } from '@/types';

import { ComicCard } from './comic-card';
import { Button } from './ui/button';

interface FeaturedComicsProps {
  title?: string;
  comics: Comic[];
}

export const FeaturedComics = memo(function FeaturedComics({
  title = 'Truyện nhiều lượt xem',
  comics,
}: FeaturedComicsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative">
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>

        {/* Desktop scroll buttons */}
        <div className="hidden gap-2 md:flex">
          <Button variant="outline" size="icon" onClick={() => scroll('left')} className="h-9 w-9">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll('right')} className="h-9 w-9">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
      >
        {comics.map((comic) => (
          <div
            key={comic.id}
            className="w-[160px] flex-shrink-0 snap-start sm:w-[180px] md:w-[200px]"
          >
            <ComicCard comic={comic} />
          </div>
        ))}
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
});
