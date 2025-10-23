'use client';

import { useEffect, useState } from 'react';

import { BookMarked, Moon, Search, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';

import Link from 'next/link';

import { Button, Input } from '../ui';
import { Container } from './container';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BookMarked className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Nguồn Truyện</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Tìm kiếm truyện..." className="w-full pl-10" />
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/thu-vien">
                <BookMarked className="h-5 w-5" />
                <span className="sr-only">Thư viện</span>
              </Link>
            </Button>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Chuyển chế độ</span>
              </Button>
            )}

            <Button variant="ghost" size="icon" asChild>
              <Link href="/dang-nhap">
                <User className="h-5 w-5" />
                <span className="sr-only">Tài khoản</span>
              </Link>
            </Button>
          </nav>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Tìm kiếm truyện..." className="w-full pl-10" />
          </div>
        </div>
      </Container>
    </header>
  );
}
