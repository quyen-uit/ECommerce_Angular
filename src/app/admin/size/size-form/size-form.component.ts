import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicField, DynamicFieldSection } from 'src/app/shared/models/common/dynamicField';
import { Size } from 'src/app/shared/models/sizes/size';
import { SizeService } from 'src/app/shared/services/size-service';
const sizeFormConfig: DynamicFieldSection[] = [
  {
    section: 'General', fields: [
      {
        type: 'text',
        key: 'name',
        label: 'Size Name',
        validators: [Validators.required],
      },
      {
        type: 'checkbox',
        key: 'sortOrder',
        label: 'Sort Order',
        validators: [Validators.required],
      },
      {
        type: 'select',
        key: 'sizeType',
        label: 'Size Type',
        options: [
          { value: 'Character', viewValue: 'Character' },
          { value: 'Number', viewValue: 'Number' },
        ],
        validators: [Validators.required],
      },
    ]
  }
];

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.scss'],
})
export class SizeFormComponent {
  sizeFormConfig = sizeFormConfig;
  isEditMode = false;
  id!: string;
  size!: Size;

  constructor(private route: ActivatedRoute, private api: SizeService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = !!this.id;
    this.size = new Size();
    if (this.isEditMode) {
      // Load data by ID and patch the form
      this.api.get(this.id).subscribe((res) => {
        this.size = res;
      });
    }
  }
}