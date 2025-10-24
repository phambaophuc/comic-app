import Image from 'next/image';
import Link from 'next/link';

import { Container } from './container';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.webp" alt="logo" width={40} height={40} className="w-10 h-10" />
                <span className="text-xl font-bold text-foreground">Nguồn Truyện</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cổng thông tin đọc truyện tranh tuyệt vời của bạn.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Duyệt</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Thịnh hành
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Mới phát hành
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Phổ biến
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Thể loại</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Hành động
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Lãng mạn
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Giả tưởng
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Điều khoản dịch vụ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Chính sách bảo mật
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Truyện Tranh. Bảo lưu mọi quyền.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
