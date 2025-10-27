export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-muted rounded-lg aspect-[3/4] mb-2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
