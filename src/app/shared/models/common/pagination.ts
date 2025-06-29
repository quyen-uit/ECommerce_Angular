export interface Pagination<T> {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    totalPages: number;
    data: T[];
}

export interface PaginationParams {
    sort?: string;
    pageNumber: number;
    pageSize: number;
}