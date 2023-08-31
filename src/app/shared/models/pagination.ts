export interface Pagination<T> {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalPages: number;
    data: T;
  }
