import BaseParams from "./baseParams";

interface BrandFilter {
    name?: string;
    description?: string;
}

export class BrandPaginationParams extends BaseParams {
    filter?: BrandFilter;
}