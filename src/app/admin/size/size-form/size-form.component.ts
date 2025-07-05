import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFieldSection } from 'src/app/shared/models/common/dynamicField';
import { Size } from 'src/app/shared/models/sizes/size';
import { SizeService } from 'src/app/shared/services/size-service';

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.scss'],
})
export class SizeFormComponent {
  sizeFormConfig: DynamicFieldSection[] = [
    {
      section: 'GENERAL',
      fields: [
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
      ],
    },
  ];
  title = 'SIZE.ADD';
  editRoute: string = '/admin/edit-size';
  isEditMode = false;
  id?: number;
  size = new Size();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sizeService: SizeService
  ) { }

  ngOnInit() {
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.isEditMode = true;
      this.title = 'SIZE.EDIT';
      // Load data by ID and patch the form
      this.sizeService.get(this.id).subscribe((res) => {
        this.size = res;
      });
    }
  }

  onSubmit(size: Size) {
    size.id = this.id;
    this.sizeService.createOrUpdate(size).subscribe((res) => {
      this.router.navigate(['/admin/size']);
    });
  }

  onDelete() {
    if (this.id)
      this.sizeService.delete(this.id).subscribe({
        next: () => {
          console.log('Delete successful');
          this.router.navigate(['/admin/size']);
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
  }
}