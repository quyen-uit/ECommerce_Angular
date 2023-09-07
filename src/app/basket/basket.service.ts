import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Basket, BasketItem } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => this.basketSource.next(basket)
    })
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => this.basketSource.next(basket)
    })
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity = 1) {
    const basketItem = this.mapProductItem2BasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, basketItem, quantity)
    this.setBasket(basket);
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
      pictureUrl: product.photoUrl,
      brand: product.productBrand,
      type: product.productType
    }
  }

}
