import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicField, DynamicFieldSection } from '../../models/common/dynamicField';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  private _initialData: { [key: string]: any } = {};
  @Input() title: string = '';
  @Input() editRoute: string = '';
  @Input() isEditMode: boolean = false;
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

  @Output() submit = new EventEmitter<any>();
  @Output() add = new EventEmitter<void>();
  @Output() delete = new EventEmitter<any>();

  dynamicForm!: FormGroup;
  editors: { [key: string]: Editor } = {};
  html: string = '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.dynamicForm = this.createFormGroup();
  }

  ngOnDestroy(): void {
    const keys = Object.keys(this.editors);
    keys.forEach(key => {
      this.editors[key].destroy();
    });
  }

  private createFormGroup(): FormGroup {
    const group: { [key: string]: any } = {};
    this.formConfig.forEach((section) => {
      section.fields.forEach((field) => {
        const value = this._initialData[field.key] ?? field.value ?? undefined;
        const disabled = field.editable === false;
        group[field.key] = [
          { value: value, disabled: disabled },
          field.validators || [],
        ];
        if (field.type === 'text-editor') {
          const editor = new Editor();
          this.editors[field.key] = editor;
        }

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

  onSubmit(event: Event): void {
    event.stopPropagation(); // receive default propagated event if output has naming submit
    if (this.dynamicForm.valid) {
      this.submit.emit(this.dynamicForm.value);
    }
  }

  onDelete() {
    this.delete.emit();
  }

  onAdd() {
    this.router.navigate([this.editRoute]);
  }

  getFieldsByType(fields: DynamicField[], type: string): DynamicField[] {
    return fields.filter((field) => field.type === type);
  }
}
