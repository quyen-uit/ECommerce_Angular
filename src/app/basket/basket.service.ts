import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Basket, BasketItem, BasketTotal } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { DeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  private basketTotalSource = new BehaviorSubject<BasketTotal | null>(null);

  basketSource$ = this.basketSource.asObservable();
  basketTotalSource$ = this.basketTotalSource.asObservable();
  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateBasketTotal();
      }
    })
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateBasketTotal();
      }
    })
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    const basket = this.getCurrentBasketValue();

    if (basket) {
      basket.shippingPrice = deliveryMethod.price;
      basket.deliveryMethodId = deliveryMethod.id;
      this.setBasket(basket);
    }
    this.calculateBasketTotal();
  }

  deleteBasket(basket: Basket) {
    this.http.delete<Basket>(this.baseUrl + 'basket?id=basket' + basket.id).subscribe({
      next: () => {
        this.deleteLocalBasket();
      }
    })
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product | BasketItem, quantity = 1) {
    if (this.isProduct(item)) {
      item = this.mapProductItem2BasketItem(item);
    }
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity)
    this.setBasket(basket);
  }

  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (basket) {
      const item = basket.items.find(x => x.id === id);
      if (item) {
        item.quantity -= quantity;
        if (item.quantity == 0) {
          basket.items = basket.items.filter(x => x.id != id);
        }

        if (basket.items.length > 0) {
          this.setBasket(basket);
        } else {
          this.deleteBasket(basket);
        }
      }
    }
  }

  addOrUpdateItem(items: BasketItem[], addedItem: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(x => x.id === addedItem.id);
    if (item) item.quantity += quantity
    else {
      addedItem.quantity = quantity;
      items.push(addedItem);
    }
    return items;
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItem2BasketItem(product: Product): BasketItem {
    return {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity: 0,
      photoUrl: product.photoUrl,
      brand: product.productBrand,
      type: product.productType
    }
  }

  private calculateBasketTotal() {
    const basket = this.getCurrentBasketValue();
    if (basket) {
      const subTotal = basket.items.reduce((sum, current) => sum + current.quantity * current.price, 0);
      const total = basket.shippingPrice + subTotal;
      this.basketTotalSource.next({ subTotal, shippingPrice: basket.shippingPrice, total });
    }
  }

  private isProduct(item: Product | BasketItem): item is Product {
    return (item as Product).productBrand !== undefined;
  }

  createPaymentIntent() {
    const basket = this.getCurrentBasketValue();
    return this.http.post<Basket>(this.baseUrl + 'payment/' + basket?.id, {})
      .pipe(
        map(basket => {
          this.basketSource.next(basket);
        })
      )
  }
}
