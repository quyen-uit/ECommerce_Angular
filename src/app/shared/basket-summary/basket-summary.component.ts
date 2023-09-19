import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketItem } from '../models/basket';
import { BasketService } from 'src/app/basket/basket.service';
import { faMinusCircle, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent {
  @Output() addItem = new EventEmitter<BasketItem>();
  @Output() removeItem = new EventEmitter<{ id: number, quantity: number }>();
  @Input() isBasket: boolean = true;

  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  faTimes = faTimes;

  constructor(public basketService: BasketService) { }

  onAddItem(basketItem: BasketItem) {
    this.addItem.emit(basketItem);
  }

  onRemoveItem(id: number, quantity: number) {
    this.removeItem.emit({ id, quantity });
  }
}
