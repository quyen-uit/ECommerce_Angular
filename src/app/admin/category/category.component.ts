import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { CategoryParams } from 'src/app/shared/params/categoryParams';
import { CategoryService } from 'src/app/shared/services/category-service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @ViewChild(MatSort) sort!: MatSort;
  categories: Category[] = [];
  columnsToDisplay = ['id', 'name', 'order', 'isActive', 'actions'];
  private categoryParams: CategoryParams = new CategoryParams();
  searchControl: FormControl = new FormControl();
  searchValueBefore: string = "";
  dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();
  selectValues = [
    { value: undefined, viewValue: '' },
    { value: true, viewValue: 'Active' },
    { value: false, viewValue: 'Inactive' },
  ];

  constructor(private categoryService: CategoryService, private router: Router, private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngAfterViewInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      if (this.searchValueBefore != value) {
        this.categoryParams.search = value;
        this.loadCategories();
      }
    });

    this.sort.sortChange.subscribe((sortState: Sort) => {
      this.categoryParams.sort = `${sortState.active}_${sortState.direction}`;
      this.loadCategories();
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories(this.categoryParams).subscribe((data: Category[]) => {
      this.dataSource = new MatTableDataSource(data);
      // this.dataSource.sort = this.sort;
      this.searchValueBefore = this.categoryParams.search;
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

  onEnterKeyUp(event: Event): void {
    this.categoryParams.search = (event.target as HTMLInputElement).value;
    this.loadCategories();
  }

  onStatusChange(event: any): void {
    console.log(event.value)
    this.categoryParams.isActive = event.value;
    this.loadCategories();
  }
}
