'use client';

import { BookMarked, Clock, Heart } from 'lucide-react';

import { ComicCard, Container } from '@/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { comics } from '@/lib/data/comics';

export default function LibraryPage() {
  // Mock data - in a real app, this would come from user's library
  const favoriteComics = comics.slice(0, 3);
  const recentlyReadComics = comics.slice(2, 5);

  return (
    <div className="py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Thư viện của tôi
          </h1>
          <p className="text-muted-foreground">
            Truyện yêu thích và lịch sử đọc của bạn
          </p>
        </div>

        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              Yêu thích
            </TabsTrigger>
            <TabsTrigger value="recent" className="gap-2">
              <Clock className="h-4 w-4" />
              Đọc gần đây
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="space-y-6">
            {favoriteComics.length > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    {favoriteComics.length}{' '}
                    {favoriteComics.length === 1 ? 'Truyện' : 'Truyện'}
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {favoriteComics.map((comic) => (
                    <ComicCard key={comic.id} comic={comic} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <BookMarked className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Chưa có truyện yêu thích
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Bắt đầu thêm truyện vào yêu thích để xem chúng ở đây
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            {recentlyReadComics.length > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    {recentlyReadComics.length}{' '}
                    {recentlyReadComics.length === 1 ? 'Truyện' : 'Truyện'}
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {recentlyReadComics.map((comic) => (
                    <ComicCard key={comic.id} comic={comic} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Clock className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Chưa có lịch sử đọc
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Truyện bạn đọc sẽ xuất hiện ở đây
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
