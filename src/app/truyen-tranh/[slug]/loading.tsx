import { Container } from '@/components';

export default function Loading() {
  return (
    <>
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-muted animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <Container>
        <div className="relative -mt-32 md:-mt-40 pb-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-48 md:w-56 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-4 border-background bg-muted animate-pulse" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="h-10 bg-muted rounded-lg w-3/4 mb-2 animate-pulse" />
                <div className="h-6 bg-muted rounded w-1/4 animate-pulse" />
              </div>

              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 w-20 bg-muted rounded-full animate-pulse" />
                ))}
              </div>

              <div className="flex flex-wrap gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="h-11 w-32 bg-muted rounded-full animate-pulse" />
                <div className="h-11 w-11 bg-muted rounded-full animate-pulse" />
              </div>

              <div className="pt-4">
                <div className="h-4 w-16 bg-muted rounded mb-2 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full animate-pulse" />
                  <div className="h-4 bg-muted rounded w-full animate-pulse" />
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-48 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>

          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 w-48 bg-muted rounded animate-pulse" />
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            </div>

            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
