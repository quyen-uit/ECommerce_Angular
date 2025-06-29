import { FilterRange } from "../models/common/filter-range";
import BaseParams from "./baseParams";

export class SizePaginationParams extends BaseParams {
    filter?: SizeFilter;

}

interface SizeFilter {
    name?: string;
    sizeStype?: string;
    sortOrder: FilterRange<number | null>;
}

 