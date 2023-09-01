import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { Observable } from 'rxjs';
import { Type } from 'src/app/shared/models/type';
import { Brand } from 'src/app/shared/models/brand';
import { ProductParams } from 'src/app/shared/models/productParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl: string = 'http://localhost:5229/api/';

  constructor(private http: HttpClient) { }

  getProducts(prodcutParams: ProductParams): Observable<Pagination<Product[]>> {
    let params = new HttpParams();

    if (prodcutParams.typeId) params = params.append('typeId', prodcutParams.typeId);
    if (prodcutParams.brandId) params = params.append('brandId', prodcutParams.brandId)
    params = params.append('sort', prodcutParams.sort)
    params = params.append('pageIndex', prodcutParams.pageIndex)
    params = params.append('pageSize', prodcutParams.pageSize)
    if (prodcutParams.search) params = params.append('search', prodcutParams.search);

    return this.http.get<Pagination<Product[]>>(this.apiUrl + 'products', { params: params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + 'products/' + id);
  }
  
  getProductTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.apiUrl + 'products/types');
  }
  getProductBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl + 'products/brands');
  }
}
