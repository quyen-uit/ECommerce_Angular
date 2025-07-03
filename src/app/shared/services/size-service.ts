import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '../models/common/pagination';
import { Size } from '../models/sizes/size';
import { SizePaginationParams } from '../params/sizePaginationParams';

@Injectable({
    providedIn: 'root',
})
export class SizeService {
    private baseUrl: string = 'http://localhost:5229/api/size';

    constructor(private http: HttpClient) { }

    getAll(params: SizePaginationParams): Observable<Pagination<Size>> {
        return this.http.post<Pagination<Size>>(`${this.baseUrl}/get-all`, params);
    }

    createOrUpdate(productBrand: Size): Observable<Size> {
        return this.http.post<Size>(`${this.baseUrl}/create`, productBrand);
    }

    delete(id: number): Observable<string> {
        return this.http.delete<string>(`${this.baseUrl}/${id}`);
    }

    deleteMany(ids: number[]): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete-many`, {
            body: ids,
        });
    }

    get(id: number): Observable<Size> {
        return this.http.get<Size>(`${this.baseUrl}/${id}`);
    }
}
