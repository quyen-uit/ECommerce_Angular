import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../shared/models/user';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(value: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', value).pipe(
      map(user => {
        this.currentUserSource.next(user);
        localStorage.setItem('user_token', user.token);
      })
    )
  }

  register(value: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', value).pipe(
      map(user => {
        this.currentUserSource.next(user);
        localStorage.setItem('user_token', user.token);
      })
    )
  }

  logout() {
    this.currentUserSource.next(null);
    localStorage.removeItem('user_token');
    this.router.navigateByUrl('');
  }

  checkEmailExist(email: string) {
    return this.http.get<boolean>(this.baseUrl + 'account/email-exist?email=' + email);
  }

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(this.baseUrl + 'account', { headers }).pipe(
      map(user => {
        this.currentUserSource.next(user);
        localStorage.setItem('user_token', user.token);
      })
    )
  }
}
