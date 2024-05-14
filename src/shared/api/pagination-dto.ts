export interface PaginatedData<T> {
  items: T[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface BasePaginationParams {
  pageNumber: number;
  pageSize: number;
}
