import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFieldSection } from 'src/app/shared/models/common/dynamicField';
import { CreateBrand, Brand } from 'src/app/shared/models/brands/brand';
import { BrandService } from 'src/app/shared/services/brand-service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss'],
})
export class BrandFormComponent {
  brandFormConfig: DynamicFieldSection[] = [
    {
      section: 'GENERAL',
      fields: [
        {
          type: 'text',
          key: 'name',
          label: 'BRAND.NAME',
          validators: [Validators.required],
        },
        {
          type: 'text-editor',
          key: 'description',
          label: 'BRAND.DESCRIPTION',
        },
        {
          type: 'text',
          key: 'logoUrl',
          label: 'BRAND.LOGO_URL',
        },
      ],
    },
  ];
  title = 'BRAND.ADD';
  editRoute: string = '/admin/brand';
  isEditMode = false;
  id?: number;
  brand = new Brand();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private translate: TranslateService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.isEditMode = true;
      this.title = 'BRAND.EDIT';
      this.brandService.get(this.id).subscribe((res) => {
        this.brand = res;
      });
    }
  }

  onSubmit(brand: CreateBrand) {
    brand.id = this.id;
    this.brandService.createOrUpdate(brand).subscribe((res) => {
      this.navigateToList();
      this.translate.get(['BRAND.UPDATE_SUCCESS', 'BRAND.CREATE_SUCCESS']).subscribe((res: string[]) => {
        if (this.isEditMode) {
          this.toast.success(res[0]); // BRAND.UPDATE_SUCCESS
        } else {
          this.toast.success(res[1]); // BRAND.CREATE_SUCCESS
        }
      });
    });
  }

  onDelete() {
    if (this.id)
      this.brandService.delete(this.id).subscribe({
        next: () => {
          this.navigateToList();
          this.translate.get('BRAND.DELETE_SUCCESS').subscribe((res: string) => {
            this.toast.success(res);
          });
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
  }

  navigateToList() {
    this.router.navigate(['/admin/brands']);
  }
}