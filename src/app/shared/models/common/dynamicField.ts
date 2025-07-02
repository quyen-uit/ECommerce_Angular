import { ValidatorFn } from '@angular/forms';

export interface DynamicField {
    type: 'text' | 'email' | 'phone' | 'number' | 'select' | 'date' | 'datetime' | 'checkbox' | 'file';
    key: string;
    label: string;
    value?: any;
    options?: { value: string; viewValue: string }[];
    validators?: ValidatorFn[];
    editable?: boolean;
}

export interface DynamicFieldSection {
    section: string;
    fields: DynamicField[];
}