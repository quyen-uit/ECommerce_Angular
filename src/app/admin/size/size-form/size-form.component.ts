import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicField, DynamicFieldSection } from 'src/app/shared/models/common/dynamicField';
import { Size } from 'src/app/shared/models/sizes/size';
import { SizeService } from 'src/app/shared/services/size-service';
const sizeFormConfig: DynamicFieldSection[] = [
  {
    section: 'GENERAL', fields: [
      {
        type: 'text',
        key: 'name',
        label: 'SIZE.NAME',
        validators: [Validators.required],
      },
      {
        type: 'number',
        key: 'sortOrder',
        label: 'SIZE.SORT_ORDER',
        validators: [Validators.required, Validators.min(0)],
      },
      {
        type: 'select',
        key: 'sizeType',
        label: 'SIZE.TYPE',
        options: [
          { value: 'Character', viewValue: 'CHARACTER' },
          { value: 'Number', viewValue: 'NUMBER' },
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