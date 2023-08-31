import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './services/shop.service';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { HttpParams } from '@angular/common/http';
import { ProductParams } from '../shared/models/productParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  types: Type[] = [];
  brands: Brand[] = [];
  productParams = new ProductParams();
  pageCount: number = 1;

  sortOptions = [
    { name: 'Alphabetically', value: 'default' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ]

  constructor(private shopService: ShopService) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.productParams).subscribe({
      next: response => {
        this.products = response.data;
        this.productParams.pageIndex = response.pageIndex;
        this.productParams.pageSize = response.pageSize;
        this.pageCount = response.pageCount;
      },
      error: error => console.log(error),
    })
  }

  getTypes() {
    this.shopService.getProductTypes().subscribe({
      next: response => this.types = [{ id: 0, name: 'All' }, ...response],
      error: error => console.log(error),
    })
  }

  getBrands() {
    this.shopService.getProductBrands().subscribe({
      next: response => this.brands = [{ id: 0, name: 'All' }, ...response],
      error: error => console.log(error),
    });
  }

  onBrandSelected(brandId: number) {
    this.productParams.brandId = brandId;
    this.productParams.pageIndex = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.productParams.typeId = typeId;
    this.productParams.pageIndex = 1;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.productParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.productParams.pageIndex !== event) {
      this.productParams.pageIndex = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.productParams.search = this.searchTerm?.nativeElement.value;
    this.productParams.pageIndex = 1;
    this.getProducts();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.productParams = new ProductParams();
    this.getProducts();
  }
}
