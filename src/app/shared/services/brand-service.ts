import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '../models/common/pagination';
import { CreateBrand, Brand } from '../models/brands/brand';
import { BrandPaginationParams } from '../params/brandPaginationParams';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class BrandService {
    private baseUrl: string = environment.apiUrl + 'brand';

    constructor(private http: HttpClient) { }

    // Updated to use the new BrandPaginationParams type
    getAll(params: BrandPaginationParams): Observable<Pagination<Brand>> {
        return this.http.post<Pagination<Brand>>(`${this.baseUrl}/get-all`, params);
    }

    createOrUpdate(brand: CreateBrand): Observable<Brand> {
        return this.http.post<Brand>(`${this.baseUrl}/create`, brand);
    }

    delete(id: number): Observable<string> {
        return this.http.delete<string>(`${this.baseUrl}/${id}`);
    }

    deleteMany(ids: number[]): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete-many`, {
            body: ids,
        });
    }

    get(id: number): Observable<Brand> {
        return this.http.get<Brand>(`${this.baseUrl}/${id}`);
    }
}