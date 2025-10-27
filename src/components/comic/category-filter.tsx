'use client';

import { useEffect, useState } from 'react';

import { Button } from '../ui';

const categories = [
  { key: 'all', label: 'Tất cả' },
  { key: 'Action', label: 'Hành động' },
  { key: 'Romance', label: 'Lãng mạn' },
  { key: 'Fantasy', label: 'Giả tưởng' },
  { key: 'Horror', label: 'Kinh dị' },
  { key: 'Comedy', label: 'Hài hước' },
  { key: 'Drama', label: 'Chính kịch' },
];

interface CategoryFilterProps {
  onCategoryChange?: (categories: string[]) => void;
  selectedCategories?: string[];
}

export function CategoryFilter({ onCategoryChange, selectedCategories = [] }: CategoryFilterProps) {
  const [selected, setSelected] = useState<string[]>(selectedCategories);

  useEffect(() => {
    setSelected(selectedCategories);
  }, [selectedCategories]);

  const handleSelect = (categoryKey: string) => {
    let newSelected: string[];

    if (categoryKey === 'all') {
      newSelected = ['all'];
    } else {
      newSelected = selected.filter((item) => item !== 'all');

      if (newSelected.includes(categoryKey)) {
        newSelected = newSelected.filter((item) => item !== categoryKey);
      } else {
        newSelected = [...newSelected, categoryKey];
      }

      if (newSelected.length === 0) {
        newSelected = ['all'];
      }
    }

    setSelected(newSelected);
    const backendCategories = newSelected.filter((cat) => cat !== 'all');
    onCategoryChange?.(backendCategories);
  };

  const isSelected = (categoryKey: string) => selected.includes(categoryKey);

  const getCategoryLabel = (categoryKey: string) => {
    const category = categories.find((cat) => cat.key === categoryKey);
    return category ? category.label : categoryKey;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.key}
            variant={isSelected(category.key) ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSelect(category.key)}
            className="rounded-full"
          >
            {category.label}
            {isSelected(category.key) && category.key !== 'all' && <span className="ml-1">✓</span>}
          </Button>
        ))}
      </div>

      {selected.length > 0 && selected[0] !== 'all' && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Đã chọn:</span>
          <div className="flex flex-wrap gap-1">
            {selected.map((categoryKey) => (
              <span key={categoryKey} className="bg-secondary px-2 py-1 rounded-full text-xs">
                {getCategoryLabel(categoryKey)}
              </span>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSelect('all')}
            className="h-auto p-1 text-xs"
          >
            Xóa tất cả
          </Button>
        </div>
      )}
    </div>
  );
}
