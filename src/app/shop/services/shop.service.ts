import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { Observable, map, of } from 'rxjs';
import { Type } from 'src/app/shared/models/type';
import { Brand } from 'src/app/shared/models/brand';
import { ProductParams } from 'src/app/shared/models/productParams';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl: string = environment.apiUrl;
  //use to cache
  products: Product[] = []; 
  types: Type[] = [];
  brands: Brand[] = [];

  constructor(private http: HttpClient) { }

  getProducts(prodcutParams: ProductParams): Observable<Pagination<Product[]>> {
    let params = new HttpParams();

    if (prodcutParams.typeId) params = params.append('typeId', prodcutParams.typeId);
    if (prodcutParams.brandId) params = params.append('brandId', prodcutParams.brandId)
    params = params.append('sort', prodcutParams.sort)
    params = params.append('pageIndex', prodcutParams.pageIndex)
    params = params.append('pageSize', prodcutParams.pageSize)
    if (prodcutParams.search) params = params.append('search', prodcutParams.search);

    return this.http.get<Pagination<Product[]>>(this.apiUrl + 'products', { params: params }).pipe(
      map(response => {
        this.products = response.data;
        return response;
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    const product = this.products.find(x => x.id === id);
    if (product) return of(product);
    return this.http.get<Product>(this.apiUrl + 'products/' + id);
  }

  getProductTypes(): Observable<Type[]> {
    if (this.types.length > 0) return of(this.types);
    return this.http.get<Type[]>(this.apiUrl + 'products/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );;
  }
  getProductBrands(): Observable<Brand[]> {
    if (this.brands.length > 0) return of(this.brands);
    return this.http.get<Brand[]>(this.apiUrl + 'products/brands').pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    );;
  }
}
