import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Pagination } from 'src/app/shared/models/pagination';
import { ProductBrand } from 'src/app/shared/models/productBrand';
import { ProductBrandParams } from 'src/app/shared/params/productBrandParams';
import { ProductBrandService } from 'src/app/shared/services/product-brand';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.scss']
})
export class ProductBrandComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnsToDisplay = ['order', 'name', 'description', 'actions'];
  pageSizes = [5, 10, 20];
  dataSource: MatTableDataSource<ProductBrand> = new MatTableDataSource<ProductBrand>();
  pageLength = 5;

  productBrands: ProductBrand[] = [];
  private productBrandParams: ProductBrandParams = new ProductBrandParams();

  searchControl: FormControl = new FormControl();
  searchValueBefore: string = "";
  constructor(private productBrandService: ProductBrandService, private router: Router, private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.loadproductBrands();
    this.productBrandParams.pageSize = 5;
    this.productBrandParams.pageNumber = 1;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.searchControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      if (this.searchValueBefore != value) {
        this.productBrandParams.search = value;
        this.search();
      }
    });

    this.sort.sortChange.subscribe((sortState: Sort) => {
      this.productBrandParams.sort = `${sortState.active}_${sortState.direction}`;
      this.search()
    });

  }

  pageChangeEvent(event: PageEvent) {
    this.productBrandParams.pageSize = event.pageSize;
    this.productBrandParams.pageNumber = event.pageIndex + 1;
    this.loadproductBrands();
  }

  getOrderNumber(index: number): number {
    return (this.productBrandParams.pageNumber - 1) * this.productBrandParams.pageSize + index + 1;
  }

  loadproductBrands(): void {
    this.productBrandService.getProductBrands(this.productBrandParams).subscribe((data: Pagination<ProductBrand[]>) => {
      this.dataSource = new MatTableDataSource(data.data);
      this.pageLength = data.pageCount;
      this.searchValueBefore = this.productBrandParams.search;
    });
  }

  createProductBrand(): void {
    this.router.navigate(['admin/brand/create']);
  }

  editProductBrand(id: number): void {
    this.router.navigate([`admin/brand/${id}`]);
  }

  deleteProductBrand(id: number): void {
    this.sweetAlertService.confirm('Do you really want to delete this product brand?').then((result) => {
      if (result) {
        this.productBrandService.deleteProductBrand(id).subscribe({
          next: () => {
            this.sweetAlertService.success('Product Brand deleted successfully');
            this.loadproductBrands();
          },
          error: () => {
            this.sweetAlertService.error('Failed to delete product brand');
          }
        })
      }
    });
  }

  onEnterKeyUp(event: Event): void {
    this.productBrandParams.search = (event.target as HTMLInputElement).value;
    this.search();
  }

  search() {
    this.productBrandParams.pageNumber = 1;
    this.loadproductBrands();
    setTimeout(() => { this.paginator.pageIndex = 0; });
  }
}
