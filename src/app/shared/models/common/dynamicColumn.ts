export interface DynamicColumn {
  key: string;
  label: string;
  type: 'text' | 'bool' | 'number' | 'date' | 'options';
  visible: boolean;
  sortable: boolean;
  filterable: boolean;
  options?: { value: string; viewValue: string }[];
}

// A shared structure for dropdown options
export interface IControlOption {
  key: string | number;
  value: string;
}

// Specific types of controls for our Material form
export type FormInputType = 'text' | 'number' | 'textarea' | 'dropdown' | 'datepicker' | 'checkbox' | 'color';

// Specific types of data for our table columns
export type ColumnDataType = 'text' | 'bool' | 'number' | 'date' | 'options';