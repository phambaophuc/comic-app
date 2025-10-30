export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="h-10 w-10 bg-muted rounded-md animate-pulse" />
            <div className="flex-1 min-w-0">
              <div className="h-5 bg-muted rounded w-48 mx-auto animate-pulse" />
            </div>
            <div className="h-10 w-40 bg-muted rounded-md animate-pulse" />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6 text-center space-y-3">
          <div className="h-4 w-32 bg-muted rounded mx-auto animate-pulse" />
          <div className="h-8 w-64 bg-muted rounded mx-auto animate-pulse" />
        </div>
        <div className="space-y-0">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="relative w-full aspect-[4/7] bg-muted animate-pulse" />
          ))}
        </div>
        <nav className="mt-8 flex items-center justify-center gap-4 pb-8">
          <div className="h-11 w-28 bg-muted rounded-md animate-pulse" />
          <div className="h-11 w-28 bg-muted rounded-md animate-pulse" />
        </nav>
      </div>
    </div>
  );
}
