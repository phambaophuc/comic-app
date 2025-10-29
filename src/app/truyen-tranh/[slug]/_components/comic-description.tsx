'use client';

import { useState } from 'react';

interface ComicDescriptionProps {
  description: string;
}

export function ComicDescription({ description }: ComicDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="pt-4">
      <h2 className="text-sm font-semibold text-muted-foreground mb-2">MÔ TẢ</h2>
      <div className="relative">
        <p
          className={`text-foreground leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}
          itemProp="description"
        >
          {description}
        </p>
        {description && description.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary/80 text-sm font-medium mt-2 transition-colors"
            aria-label={isExpanded ? 'Thu gọn mô tả' : 'Xem thêm mô tả'}
          >
            {isExpanded ? 'Thu gọn' : 'Xem thêm'}
          </button>
        )}
      </div>
    </div>
  );
}
