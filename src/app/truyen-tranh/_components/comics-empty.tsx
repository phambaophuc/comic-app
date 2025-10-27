import { Button } from '@/components';

interface Props {
  onShowAll: () => void;
  isLoading: boolean;
}

export function ComicsEmptyState({ onShowAll, isLoading }: Props) {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <span className="text-2xl">📚</span>
        </div>
        <p className="text-muted-foreground text-lg">Không tìm thấy truyện trong thể loại này.</p>
        <Button variant="outline" onClick={onShowAll} disabled={isLoading}>
          Hiển thị tất cả truyện
        </Button>
      </div>
    </div>
  );
}
