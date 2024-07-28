// src/app/category-form/category-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateCategory } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category-service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
 
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  isEditMode: boolean = false;
  categoryId?: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      order: ['', [Validators.required, Validators.min(0)]],
      isActive: [false],
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.categoryId = +params['id'];
        this.loadCategory();
      }
    });
  }

  loadCategory(): void {
    this.categoryService.getCategory(this.categoryId!).subscribe(category => {
      this.categoryForm.patchValue(category);
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData: CreateCategory = this.categoryForm.value;
      if (this.isEditMode) {
        this.categoryService.updateCategory(this.categoryId!, categoryData).subscribe(() => {
          this.sweetAlertService.success('Category updated successfully');
          this.router.navigate(['/admin/category']);
        });
      } else {
        this.categoryService.createCategory(categoryData).subscribe(() => {
          this.sweetAlertService.success('Category created successfully');
          this.router.navigate(['/admin/category']);
        });
      }
    }
  }
}
