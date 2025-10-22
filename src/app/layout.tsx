import { Suspense } from 'react';

import { Analytics } from '@vercel/analytics/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import type { Metadata } from 'next';
import './globals.css';

import { Footer, Header, ThemeProvider } from '@/components';
import { QueryProvider } from '@/providers';

export const metadata: Metadata = {
  title: 'Đọc truyện tranh online miễn phí - Manga, Manhwa, Manhua',
  description:
    'Khám phá hàng nghìn truyện tranh online miễn phí. Cập nhật nhanh nhất các bộ manga, manhwa, manhua hot nhất hiện nay.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable} flex min-h-screen flex-col bg-background text-foreground`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </Suspense>
          </ThemeProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
