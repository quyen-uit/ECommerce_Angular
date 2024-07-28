import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category-service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories: Category[] = [];
  columnsToDisplay = ['id', 'name', 'order', 'isActive', 'actions'];

  constructor(private categoryService: CategoryService, private router: Router) {}

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
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }
}
