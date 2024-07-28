import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category, CreateCategory } from '../models/category';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private baseUrl: string = environment.apiUrl + 'category';

    constructor(private http: HttpClient) { }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.baseUrl}/all`);
    }

    createCategory(category: CreateCategory): Observable<Category> {
        return this.http.post<Category>(this.baseUrl, category);
    }

    updateCategory(id: number, category: CreateCategory): Observable<Category> {
        return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
    }

    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getCategory(id: number): Observable<Category> {
        return this.http.get<Category>(`${this.baseUrl}/${id}`);
    }
}