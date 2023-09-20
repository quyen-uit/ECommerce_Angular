import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { Address, User } from '../shared/models/user';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  private currentUserSource = new ReplaySubject<User | null>(1);
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

  loadCurrentUser(token: string | null) {
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(this.baseUrl + 'account', { headers }).pipe(
      map(user => {
        if (user) {
          this.currentUserSource.next(user);
          localStorage.setItem('user_token', user.token);
          return user;
        } else {
          return null;
        }
      })
    )
  }

  getUserAddress() {
    return this.http.get<Address>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: Address) {
    return this.http.put(this.baseUrl + 'account/address', address);
  }
}
