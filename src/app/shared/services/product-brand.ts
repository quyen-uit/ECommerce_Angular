import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ProductBrand, CreateProductBrand } from '../models/productBrand';
import { ProductBrandParams } from '../params/productBrandParams';
import { Pagination } from '../models/pagination';

@Injectable({
    providedIn: 'root',
})
export class ProductBrandService {
    private baseUrl: string = environment.apiUrl + 'brand';

    constructor(private http: HttpClient) { }

    getProductBrands(productBrandParams: ProductBrandParams): Observable<Pagination<ProductBrand[]>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('search', productBrandParams.search);
        httpParams = httpParams.append('sort', productBrandParams.sort);
        httpParams = httpParams.append('pageNumber', productBrandParams.pageNumber)
        httpParams = httpParams.append('pageSize', productBrandParams.pageSize)

        return this.http.get<Pagination<ProductBrand[]>>(`${this.baseUrl}/all`, { params: httpParams });
    }

    createProductBrand(productBrand: CreateProductBrand): Observable<ProductBrand> {
        return this.http.post<ProductBrand>(this.baseUrl, productBrand);
    }

    updateProductBrand(id: number, productBrand: CreateProductBrand): Observable<ProductBrand> {
        return this.http.put<ProductBrand>(`${this.baseUrl}/${id}`, productBrand);
    }

    deleteProductBrand(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getProductBrand(id: number): Observable<ProductBrand> {
        return this.http.get<ProductBrand>(`${this.baseUrl}/${id}`);
    }
}