import Link from 'next/link';

import { Button } from '@/components';

export function HeroSection() {
  return (
    <section className="mb-12">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Khám phá truyện tranh yêu thích tiếp theo của bạn
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Khám phá hàng nghìn câu chuyện hấp dẫn thuộc mọi thể loại.
          </p>
          <Button size="lg" className="rounded-full" asChild>
            <Link href="/truyen-tranh" aria-label="Khám phá ngay các truyện tranh mới nhất">
              Khám phá ngay
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
