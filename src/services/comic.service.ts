import apiClient from '@/lib/api-client';
import { Chapter, Comic, PaginatedAPIResponse, PaginationParams } from '@/types';

export class ComicService {
  private readonly basePath = '/comics';

  /**
   * Lấy danh sách comic với filter và phân trang
   */
  async getAll(params?: PaginationParams): Promise<PaginatedAPIResponse<Comic>> {
    const queryString = params ? apiClient.buildQueryString(params) : '';
    return apiClient.get<PaginatedAPIResponse<Comic>>(`${this.basePath}${queryString}`);
  }

  /**
   * Lấy comic theo slug
   */
  async getBySlug(slug: string): Promise<Comic> {
    return apiClient.get<Comic>(`${this.basePath}/${slug}`);
  }

  /**
   * Lấy thông tin chapter
   */
  async getByChapter(slug: string, cn: string): Promise<Chapter> {
    return apiClient.get<Chapter>(`${this.basePath}/${slug}/chapters/${cn}`);
  }
}

export const cms = new ComicService();
