import { Loader2 } from 'lucide-react';

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-6 shadow-lg flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-foreground">Đang tải truyện...</p>
      </div>
    </div>
  );
}
