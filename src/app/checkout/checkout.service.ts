import { Injectable } from '@angular/core';
import { DeliveryMethod } from '../shared/models/deliveryMethod';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDeliveryMethod(): Observable<DeliveryMethod[]> {
    return this.http.get<DeliveryMethod[]>(this.baseUrl + 'order/delivery-methods').pipe(map(
      delivery => delivery.sort((a,b) => b.price - a.price)
    ));
  }
}
