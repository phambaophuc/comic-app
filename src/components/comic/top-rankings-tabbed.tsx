'use client';

import Image from 'next/image';
import Link from 'next/link';

import { formatNumber } from '@/lib/formatNumber';
import { Comic } from '@/types';

import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '../ui';

interface TopRankingsTabbedProps {
  todayComics: Comic[];
  weekComics: Comic[];
}

export function TopRankingsTabbed({ todayComics, weekComics }: TopRankingsTabbedProps) {
  return (
    <Card className="overflow-hidden border border-border/50 bg-gradient-to-br from-background via-card to-primary/5 shadow-xl backdrop-blur-sm py-0">
      <div className="relative border-b border-border/30 bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 px-3 sm:px-6 py-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.1))]" />
        <div className="relative flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30">
            <span className="text-xl sm:text-2xl">🏆</span>
          </div>
          <div>
            <h3 className="text-base sm:text-xl font-bold text-foreground">Top Truyện</h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground hidden xs:block">
              Được xem nhiều nhất
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="w-full justify-start border-b border-border/30 rounded-none bg-muted/30 p-0 h-auto backdrop-blur-sm">
          <TabsTrigger
            value="today"
            className="relative rounded-none border-b-2 border-transparent px-4 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
          >
            <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
              <span className="hidden xs:inline">🔥</span>
              <span>Hôm nay</span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="week"
            className="relative rounded-none border-b-2 border-transparent px-4 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
          >
            <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
              <span className="hidden xs:inline">⭐</span>
              <span>Tuần này</span>
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="m-0 space-y-0 p-0">
          <div className="divide-y divide-border/20">
            {todayComics.map((comic, index) => (
              <RankingItem key={comic.id} comic={comic} rank={index + 1} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="week" className="m-0 space-y-0 p-0">
          <div className="divide-y divide-border/20">
            {weekComics.map((comic, index) => (
              <RankingItem key={comic.id} comic={comic} rank={index + 1} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

interface RankingItemProps {
  comic: Comic;
  rank: number;
}

function RankingItem({ comic, rank }: RankingItemProps) {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30',
          text: 'text-white',
          icon: '👑',
          ring: 'ring-2 ring-yellow-400/50',
        };
      case 2:
        return {
          bg: 'bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg shadow-gray-400/30',
          text: 'text-white',
          icon: '🥈',
          ring: 'ring-2 ring-gray-400/50',
        };
      case 3:
        return {
          bg: 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30',
          text: 'text-white',
          icon: '🥉',
          ring: 'ring-2 ring-orange-400/50',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-muted to-muted/60',
          text: 'text-muted-foreground',
          icon: '',
          ring: 'ring-1 ring-border/20',
        };
    }
  };

  const rankStyle = getRankBadge(rank);
  const isTopThree = rank <= 3;

  return (
    <Link
      href={`/truyen-tranh/${comic.slug}`}
      className="group relative flex items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 py-3 sm:py-4 transition-all hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5"
    >
      <div className="relative z-10">
        <div
          className={`flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex-shrink-0 items-center justify-center rounded-full font-bold text-xs sm:text-sm transition-all group-hover:scale-110 ${rankStyle.bg} ${rankStyle.text} ${rankStyle.ring}`}
        >
          {rankStyle.icon || rank}
        </div>
      </div>

      <div
        className={`relative h-16 w-11 sm:h-18 sm:w-13 md:h-20 md:w-14 flex-shrink-0 overflow-hidden rounded-md sm:rounded-lg shadow-md transition-all group-hover:shadow-xl group-hover:scale-105 ${
          isTopThree ? 'ring-2 ring-primary/20' : ''
        }`}
      >
        <Image
          src={comic.cover_url || '/placeholder.svg'}
          alt={comic.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 16vw, 12vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <h4
          className={`line-clamp-2 text-xs sm:text-sm font-semibold transition-colors ${
            isTopThree ? 'text-foreground' : 'text-foreground/90'
          } group-hover:text-primary`}
        >
          {comic.title}
        </h4>
        <div className="mt-1 sm:mt-1.5 flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs flex-wrap">
          <span className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-primary/10 px-2 sm:px-2.5 py-0.5 sm:py-1 text-primary font-medium backdrop-blur-sm">
            <span className="text-xs sm:text-sm">👁️</span>
            <span>{formatNumber(comic.views)}</span>
          </span>
          {isTopThree && (
            <span className="hidden xs:flex items-center gap-1 text-yellow-600 dark:text-yellow-400 font-medium animate-pulse">
              <span>🔥</span>
              <span className="hidden sm:inline">Hot</span>
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 text-muted-foreground/50 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300 hidden sm:block">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
