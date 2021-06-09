export interface Pagination<T> {
  data: T[];
  limit: number;
  total: number;
  page: number;
  pages: number;
}
