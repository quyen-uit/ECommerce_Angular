import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Color, CreateColor } from '../models/color';
import { ColorParams } from '../params/colorParams';
import { Pagination } from '../models/pagination';

@Injectable({
    providedIn: 'root',
})
export class ColorService {
    private baseUrl: string = environment.apiUrl + 'color';

    constructor(private http: HttpClient) { }

    getColors(colorParams: ColorParams): Observable<Pagination<Color[]>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('search', colorParams.search);
        httpParams = httpParams.append('sort', colorParams.sort);
        httpParams = httpParams.append('pageNumber', colorParams.pageNumber)
        httpParams = httpParams.append('pageSize', colorParams.pageSize)

        return this.http.get<Pagination<Color[]>>(`${this.baseUrl}/all`, { params: httpParams });
    }

    createColor(color: CreateColor): Observable<Color> {
        return this.http.post<Color>(this.baseUrl, color);
    }

    updateColor(id: number, color: CreateColor): Observable<Color> {
        return this.http.put<Color>(`${this.baseUrl}/${id}`, color);
    }

    deleteColor(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getColor(id: number): Observable<Color> {
        return this.http.get<Color>(`${this.baseUrl}/${id}`);
    }
}