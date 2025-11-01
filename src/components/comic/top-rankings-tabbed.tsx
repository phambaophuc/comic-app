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
    <Card className="overflow-hidden border bg-card shadow-sm">
      <div className="relative flex items-center gap-4 bg-muted/5 px-6 py-4 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border after:to-transparent">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-xl">
          🏆
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground leading-tight">Top Truyện</h3>
          <p className="text-sm text-muted-foreground leading-none">Được xem nhiều nhất</p>
        </div>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="flex w-full border-b bg-transparent h-auto">
          <TabsTrigger
            value="today"
            className="flex-1 py-2 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Hôm nay
          </TabsTrigger>
          <TabsTrigger
            value="week"
            className="flex-1 py-2 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Tuần này
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="p-0">
          <RankingList comics={todayComics} />
        </TabsContent>
        <TabsContent value="week" className="p-0">
          <RankingList comics={weekComics} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function RankingList({ comics }: { comics: Comic[] }) {
  return (
    <div className="divide-y">
      {comics.map((comic, index) => (
        <RankingItem key={comic.id} comic={comic} rank={index + 1} />
      ))}
    </div>
  );
}

interface RankingItemProps {
  comic: Comic;
  rank: number;
}

function RankingItem({ comic, rank }: RankingItemProps) {
  const rankColor =
    rank === 1
      ? 'text-yellow-500'
      : rank === 2
      ? 'text-gray-400'
      : rank === 3
      ? 'text-orange-500'
      : 'text-muted-foreground';

  return (
    <Link
      href={`/truyen-tranh/${comic.slug}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
    >
      <div className={`w-6 text-center text-sm font-semibold ${rankColor}`}>{rank}</div>

      <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={comic.cover_url || '/placeholder.svg'}
          alt={comic.title}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="line-clamp-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
          {comic.title}
        </h4>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">👁️ {formatNumber(comic.views)}</span>
          {rank <= 3 && <span className="text-xs font-medium text-yellow-600">Hot 🔥</span>}
        </div>
      </div>

      <svg
        className="w-4 h-4 text-muted-foreground/70 group-hover:text-primary transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
