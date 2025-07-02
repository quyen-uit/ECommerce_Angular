import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicFieldSection } from '../../models/common/dynamicField';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  private _initialData: { [key: string]: any } = {};
  @Input() title: string = '';
  @Input() formConfig: DynamicFieldSection[] = [];
  @Input() set initialData(data: { [key: string]: any }) {
    this._initialData = data;
    if (this.dynamicForm) {
      this.dynamicForm.patchValue(data);
    }
  }

  get initialData(): { [key: string]: any } {
    return this._initialData;
  }

  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dynamicForm = this.createFormGroup();
  }

  private createFormGroup(): FormGroup {
    const group: { [key: string]: any } = {};
    this.formConfig.forEach(section => {
      section.fields.forEach((field) => {
        const value = this._initialData[field.key] ?? field.value ?? '';
        group[field.key] = [value, field.validators || []];
      });
    });
    return this.fb.group(group);
  }

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.dynamicForm.get(controlName)?.setValue(input.files[0]);
    }
  }

  onSubmit(): void {
    if (this.dynamicForm.valid) {
      console.log('Form Submitted!', this.dynamicForm.value);
    }
  }
}