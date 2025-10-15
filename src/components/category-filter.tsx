'use client';

import { useState } from 'react';

import { Button } from './ui/button';

const categories = [
  'Tất cả',
  'Hành động',
  'Lãng mạn',
  'Giả tưởng',
  'Khoa học viễn tưởng',
  'Kinh dị',
  'Hài hước',
  'Chính kịch',
  'Đời thường'
];

interface CategoryFilterProps {
  onCategoryChange?: (category: string) => void;
}

export function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [selected, setSelected] = useState('Tất cả');

  const handleSelect = (category: string) => {
    setSelected(category);
    onCategoryChange?.(category);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleSelect(category)}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
