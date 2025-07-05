import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicFieldSection } from 'src/app/shared/models/common/dynamicField';
import { CreateSize, Size } from 'src/app/shared/models/sizes/size';
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
  editRoute: string = '/admin/size';
  isEditMode = false;
  id?: number;
  size = new Size();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sizeService: SizeService,
    private toast: ToastrService,
    private translate: TranslateService
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

  onSubmit(size: CreateSize) {
    size.id = this.id;
    this.sizeService.createOrUpdate(size).subscribe((res) => {
      this.navigateToList();
      this.translate.get(['SIZE.UPDATE_SUCCESS', 'SIZE.CREATE_SUCCESS']).subscribe((res: string[]) => {
        if (this.isEditMode) {
          this.toast.success(res[0]); // SIZE.UPDATE_SUCCESS
        } else {
          this.toast.success(res[1]); // SIZE.CREATE_SUCCESS
        }
      });
    });
  }

  onDelete() {
    if (this.id)
      this.sizeService.delete(this.id).subscribe({
        next: () => {
          this.translate.get('SIZE.DELETE_SUCCESS').subscribe((res: string) => {
            this.toast.success(res);
          });
          this.navigateToList();
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
  }

  navigateToList() {
    this.router.navigate(['/admin/sizes']);
  }
}