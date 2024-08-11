// src/app/productBrand-form/productBrand-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductBrand } from 'src/app/shared/models/productBrand';
import { ProductBrandService } from 'src/app/shared/services/product-brand';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
  selector: 'app-product-brand-form',
  templateUrl: './product-brand-form.component.html',
  styleUrls: ['./product-brand-form.component.scss'],
})
export class ProductBrandFormComponent implements OnInit {
  productBrandForm!: FormGroup;
  isEditMode: boolean = false;
  productBrandId?: number;

  constructor(
    private fb: FormBuilder,
    private productBrandService: ProductBrandService,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.productBrandForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: [''],
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productBrandId = +params['id'];
        this.loadProductBrand();
      }
    });
  }

  loadProductBrand(): void {
    this.productBrandService.getProductBrand(this.productBrandId!).subscribe(productBrand => {
      this.productBrandForm.patchValue(productBrand);
    });
  }

  onSubmit(): void {
    if (this.productBrandForm.valid) {
      const productBrandData: CreateProductBrand = this.productBrandForm.value;
      if (this.isEditMode) {
        this.productBrandService.updateProductBrand(this.productBrandId!, productBrandData).subscribe(() => {
          this.sweetAlertService.success('ProductBrand updated successfully');
          this.router.navigate(['/admin/brand']);
        });
      } else {
        this.productBrandService.createProductBrand(productBrandData).subscribe(() => {
          this.sweetAlertService.success('ProductBrand created successfully');
          this.router.navigate(['/admin/brand']);
        });
      }
    }
  }


  // Check if the form control has an error and if the control has been touched or is dirty
  hasError(controlName: string, errorName: string): boolean {
    const control = this.productBrandForm.get(controlName);
    if (control)
      return control.hasError(errorName) && (control.dirty || control.touched);
    return true;
  }
}
