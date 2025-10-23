'use client';

import { useEffect, useState } from 'react';

import { Heart } from 'lucide-react';

import { Comic } from '@/types';

import { Button } from './button';

interface Props {
  comic: Comic;
}

export function FavoriteButton({ comic }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteComics') || '[]') as Comic[];
    setIsFavorite(favorites.some((c) => c.id === comic.id));
  }, [comic.id]);

  function handleToggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favoriteComics') || '[]') as Comic[];
    const exists = favorites.find((c) => c.id === comic.id);

    if (exists) {
      const updated = favorites.filter((c: Comic) => c.id !== comic.id);
      localStorage.setItem('favoriteComics', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      localStorage.setItem('favoriteComics', JSON.stringify([comic, ...favorites]));
      setIsFavorite(true);
    }
  }

  return (
    <Button
      size="lg"
      variant={isFavorite ? 'default' : 'outline'}
      className={`rounded-full gap-2 ${isFavorite ? 'bg-accent text-accent-foreground' : ''}`}
      onClick={handleToggleFavorite}
      aria-label={`${isFavorite ? 'Remove' : 'Add'} ${comic.title} from favorites`}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} aria-hidden="true" />
      {isFavorite ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
    </Button>
  );
}
