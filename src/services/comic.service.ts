import apiClient from '@/lib/api-client';
import {
  APIResponse,
  Comic,
  ComicWithChapters,
  PaginatedAPIResponse,
  PaginationParams,
} from '@/types';

export class ComicService {
  private readonly basePath = '/comics';

  /**
   * Lấy danh sách comic với filter và phân trang
   */
  async getAll(params?: PaginationParams): Promise<PaginatedAPIResponse<ComicWithChapters>> {
    const queryString = params ? apiClient.buildQueryString(params) : '';
    const response = await apiClient.get<APIResponse<PaginatedAPIResponse<ComicWithChapters>>>(
      `${this.basePath}${queryString}`,
    );
    return response.data;
  }

  /**
   * Lấy comic theo slug
   */
  async getBySlug(slug: string): Promise<ComicWithChapters> {
    const response = await apiClient.get<APIResponse<ComicWithChapters>>(
      `${this.basePath}/${slug}`,
    );
    return response.data;
  }

  /**
   * Lấy danh sách hot comics (theo views)
   */
  async getHotComics(limit: number = 5): Promise<Comic[]> {
    const response = await apiClient.get<APIResponse<Comic[]>>(
      `${this.basePath}/hot?limit=${limit}`,
    );
    return response.data;
  }
}

export const cms = new ComicService();
