import type { Chapter, Comic } from '@/lib/types';

export const comics: Comic[] = [
  {
    id: '1',
    slug: 'shadow-realm',
    title: 'Shadow Realm Chronicles',
    author: 'Alex Chen',
    coverImage: '/dark-fantasy-comic-cover-with-mysterious-shadows.jpg',
    bannerImage: '/epic-dark-fantasy-landscape-banner.jpg',
    description:
      'In a world where shadows hold ancient powers, a young warrior must master the darkness within to save her kingdom from an otherworldly threat.',
    genres: ['Fantasy', 'Action', 'Adventure'],
    rating: 4.8,
    status: 'ongoing',
    totalChapters: 45,
    views: 2500000,
    favorites: 125000,
    lastUpdated: '2025-10-10'
  },
  {
    id: '2',
    slug: 'neon-hearts',
    title: 'Neon Hearts',
    author: 'Maya Rodriguez',
    coverImage: '/cyberpunk-romance-comic-cover-with-neon-lights.jpg',
    bannerImage: '/futuristic-cyberpunk-city-at-night-banner.jpg',
    description:
      'Two hackers from rival corporations fall in love in a neon-lit megacity, but their romance could spark a corporate war.',
    genres: ['Romance', 'Sci-Fi', 'Drama'],
    rating: 4.6,
    status: 'ongoing',
    totalChapters: 32,
    views: 1800000,
    favorites: 98000,
    lastUpdated: '2025-10-12'
  },
  {
    id: '3',
    slug: 'legends-of-azure',
    title: 'Legends of Azure',
    author: 'Kenji Tanaka',
    coverImage: '/martial-arts-fantasy-comic-cover-with-blue-energy.jpg',
    bannerImage: '/ancient-asian-temple-mountains-banner.jpg',
    description:
      'A martial artist discovers an ancient technique that allows him to harness the power of the azure sky, but at a terrible cost.',
    genres: ['Action', 'Fantasy', 'Martial Arts'],
    rating: 4.9,
    status: 'completed',
    totalChapters: 120,
    views: 5200000,
    favorites: 310000,
    lastUpdated: '2025-09-15'
  },
  {
    id: '4',
    slug: 'whispers-in-the-void',
    title: 'Whispers in the Void',
    author: 'Sarah Mitchell',
    coverImage: '/horror-mystery-comic-cover-with-dark-void.jpg',
    bannerImage: '/eerie-cosmic-horror-space-banner.jpg',
    description:
      'When a space station begins receiving mysterious transmissions from the void, the crew must confront horrors beyond comprehension.',
    genres: ['Horror', 'Sci-Fi', 'Mystery'],
    rating: 4.7,
    status: 'ongoing',
    totalChapters: 28,
    views: 1200000,
    favorites: 67000,
    lastUpdated: '2025-10-14'
  },
  {
    id: '5',
    slug: 'cafe-chronicles',
    title: 'Café Chronicles',
    author: 'Emma Park',
    coverImage: '/cozy-cafe-slice-of-life-comic-cover.jpg',
    bannerImage: '/warm-cozy-coffee-shop-interior-banner.jpg',
    description:
      'Follow the daily lives and heartwarming stories of the staff and customers at a small neighborhood café.',
    genres: ['Slice of Life', 'Comedy', 'Romance'],
    rating: 4.5,
    status: 'ongoing',
    totalChapters: 56,
    views: 980000,
    favorites: 54000,
    lastUpdated: '2025-10-13'
  },
  {
    id: '6',
    slug: 'crimson-blade',
    title: 'Crimson Blade',
    author: 'Marcus Stone',
    coverImage: '/samurai-action-comic-cover-with-red-sword.jpg',
    bannerImage: '/feudal-japan-battlefield-banner.jpg',
    description:
      'A legendary swordsman seeks redemption for his dark past while protecting a village from supernatural threats.',
    genres: ['Action', 'Historical', 'Supernatural'],
    rating: 4.8,
    status: 'ongoing',
    totalChapters: 67,
    views: 3100000,
    favorites: 178000,
    lastUpdated: '2025-10-11'
  }
];

export const chapters: Record<string, Chapter[]> = {
  '1': Array.from({ length: 45 }, (_, i) => ({
    id: `1-${i + 1}`,
    comicId: '1',
    chapterNumber: i + 1,
    title:
      i === 0
        ? 'The Awakening'
        : i === 44
        ? 'Into the Abyss'
        : `Chapter ${i + 1}`,
    pages: Array.from(
      { length: 25 },
      (_, j) =>
        `/placeholder.svg?height=1400&width=800&query=dark fantasy comic page ${
          j + 1
        }`
    ),
    publishedAt: new Date(2024, 0, i + 1).toISOString()
  })),
  '2': Array.from({ length: 32 }, (_, i) => ({
    id: `2-${i + 1}`,
    comicId: '2',
    chapterNumber: i + 1,
    title:
      i === 0
        ? 'First Contact'
        : i === 31
        ? 'Digital Hearts'
        : `Chapter ${i + 1}`,
    pages: Array.from(
      { length: 22 },
      (_, j) =>
        `/placeholder.svg?height=1400&width=800&query=cyberpunk romance comic page ${
          j + 1
        }`
    ),
    publishedAt: new Date(2024, 2, i + 1).toISOString()
  }))
};

export function getComicBySlug(slug: string): Comic | undefined {
  return comics.find((comic) => comic.slug === slug);
}

export function getChaptersByComicId(comicId: string): Chapter[] {
  return chapters[comicId] || [];
}

export function getChapterById(
  comicId: string,
  chapterId: string
): Chapter | undefined {
  const comicChapters = chapters[comicId] || [];
  return comicChapters.find((chapter) => chapter.id === chapterId);
}
