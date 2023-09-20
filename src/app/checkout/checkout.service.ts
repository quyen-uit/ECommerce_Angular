import { Injectable } from '@angular/core';
import { DeliveryMethod } from '../shared/models/deliveryMethod';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order, OrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDeliveryMethod(): Observable<DeliveryMethod[]> {
    return this.http.get<DeliveryMethod[]>(this.baseUrl + 'order/delivery-methods').pipe(map(
      delivery => delivery.sort((a, b) => b.price - a.price)
    ));
  }

  createOrder(order: OrderToCreate) {
    return this.http.post<Order>(this.baseUrl + 'order', order);
  }
}
