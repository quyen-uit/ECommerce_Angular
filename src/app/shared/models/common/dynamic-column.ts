export interface DynamicColumn {
    key: string;
    label: string;
    type: 'text' | 'bool' | 'number' | 'date' | 'select' | 'none';
    visible: boolean;
    sortable: boolean;
    filterable: boolean;
}