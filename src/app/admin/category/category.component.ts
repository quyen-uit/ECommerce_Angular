import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category-service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories: Category[] = [];
  columnsToDisplay = ['id', 'name', 'order', 'isActive', 'actions'];

  constructor(private categoryService: CategoryService, private router: Router, private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  createCategory(): void {
    this.router.navigate(['admin/category/create']);
  }

  editCategory(id: number): void {
    this.router.navigate([`admin/category/${id}`]);
  }

  deleteCategory(id: number): void {
    this.sweetAlertService.confirm('Do you really want to delete this category?').then((result) => {
      if (result) {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            this.sweetAlertService.success('Category deleted successfully');
            this.loadCategories(); 
          },
          error: () => {
            this.sweetAlertService.error('Failed to delete category');
          }
        })
      }
    });
  }
}
