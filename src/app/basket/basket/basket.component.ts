import { Component } from '@angular/core';
import { BasketService } from '../basket.service';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  constructor(public basketService: BasketService) { }

  increaseBasketItem(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeBasketItem(event: { id: number, quantity: number }) {
    this.basketService.removeItemFromBasket(event.id, event.quantity);
  }
}
