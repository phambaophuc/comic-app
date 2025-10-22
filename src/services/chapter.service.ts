import apiClient from '@/lib/api-client';
import { APIResponse } from '@/types';
import { GetChapterResponse } from '@/types/chapter.types';

export class ChapterService {
  private readonly basePath = '/chapters';

  /**
   * Lấy danh sách hình ảnh với chapter number
   */
  async getByChapterNumber(slug: string, cn: string): Promise<GetChapterResponse> {
    const response = await apiClient.get<APIResponse<GetChapterResponse>>(
      `${this.basePath}/${slug}/${cn}`,
    );
    return response.data;
  }
}

export const cts = new ChapterService();
