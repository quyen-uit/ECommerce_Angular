import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pagination } from '../models/common/pagination';
import { Size } from '../models/sizes/size';
import { SizePaginationParams } from '../params/sizePaginationParams';

@Injectable({
    providedIn: 'root',
})
export class SizeService {
    private baseUrl: string = environment.apiUrl + 'size';

    constructor(private http: HttpClient) { }

    getAll(params: SizePaginationParams): Observable<Pagination<Size>> {
        return this.http.post<Pagination<Size>>(`${this.baseUrl}/get-all`, params);
    }

    createOrUpdate(productBrand: Size): Observable<Size> {
        return this.http.post<Size>(`${this.baseUrl}/create`, productBrand);
    }


    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    get(id: string): Observable<Size> {
        return this.http.get<Size>(`${this.baseUrl}/${id}`);
    }
}