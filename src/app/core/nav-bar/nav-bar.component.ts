import { Component } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  faShoppingCart = faShoppingCart;

  constructor(public basketService: BasketService) { }

  getCountItems(basketItems: BasketItem[]) : number {
    return basketItems.reduce((sum, current) => sum + current.quantity, 0)
  }
}
