export interface Pagination<T> {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    totalPages: number;
    data: T;
  }
