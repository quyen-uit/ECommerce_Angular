import { Sort } from '@angular/material/sort';
export interface DynamicColumn {
    key: string;
    label: string;
    type: 'text' | 'bool' | 'number' | 'date' | 'select';
    visible: boolean;
    sortable: boolean;
    filterable: boolean;
}