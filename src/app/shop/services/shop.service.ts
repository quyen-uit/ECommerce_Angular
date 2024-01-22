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
  pagination?: Pagination<Product[]>;
  productParams = new ProductParams();
  productCache = new Map<string, Pagination<Product[]>>();

  constructor(private http: HttpClient) { }

  getProducts(useCache = true): Observable<Pagination<Product[]>> {

    if (!useCache) this.productCache = new Map();

    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(this.getProductCacheKey())) {
        this.pagination = this.productCache.get(this.getProductCacheKey());
        if (this.pagination)
          return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.productParams.typeId) params = params.append('typeId', this.productParams.typeId);
    if (this.productParams.brandId) params = params.append('brandId', this.productParams.brandId)
    params = params.append('sort', this.productParams.sort)
    params = params.append('pageNumber', this.productParams.pageNumber)
    params = params.append('pageSize', this.productParams.pageSize)
    if (this.productParams.search) params = params.append('search', this.productParams.search);

    return this.http.get<Pagination<Product[]>>(this.apiUrl + 'products', { params: params }).pipe(
      map(response => {
        this.productCache.set(this.getProductCacheKey(), response);
        this.pagination = response;
        return response;
      })
    );
  }

  getProductCacheKey() {
    return Object.values(this.productParams).join('-');
  }

  setProductParams(params: ProductParams) {
    this.productParams = params;
  }

  getProductParams() {
    return this.productParams;
  }

  getProduct(id: number): Observable<Product> {
    // const product = this.products.find(x => x.id === id);
    // if (product) return of(product);

    const product = [...this.productCache.values()].reduce((acc, pagination) => {
      return { ...acc, ...pagination.data.find(x => x.id === id) }
    }, {} as Product);

    if (Object.keys(product).length != 0) return of(product);

    return this.http.get<Product>(this.apiUrl + 'products/' + id);
  }

  getProductTypes(): Observable<Type[]> {
    if (this.types.length > 0) return of(this.types);
    return this.http.get<Type[]>(this.apiUrl + 'products/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );
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
