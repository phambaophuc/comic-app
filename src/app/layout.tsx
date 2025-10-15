import { Suspense } from 'react';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import type { Metadata } from 'next';
import './globals.css';

import { Footer, Header, ThemeProvider } from '@/components';

export const metadata: Metadata = {
  title: 'ComicVerse - Đọc truyện tranh online',
  description:
    'Nền tảng đọc truyện tranh hiện đại với hàng ngàn bộ truyện hấp dẫn'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} flex min-h-screen flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
