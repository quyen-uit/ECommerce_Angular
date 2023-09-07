import { Component } from '@angular/core';
import { BasketService } from '../basket.service';
import { faMinusCircle, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  faTimes = faTimes;
  constructor(public basketService: BasketService) { }

  increaseBasketItem(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeBasketItem(id: number, quantity: number) {
    this.basketService.removeItemFromBasket(id, quantity);
  }
}
