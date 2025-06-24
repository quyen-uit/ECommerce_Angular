import { Sort } from '@angular/material/sort';
export interface DynamicColumn {
    key: string;
    label: string;
    type: 'text' | 'bool' | 'number' | 'date' | 'action';
    visible: boolean;
    sortable: boolean;
    filterable: boolean;
}