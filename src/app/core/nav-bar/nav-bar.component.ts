import { Component } from '@angular/core';
import { faBell, faFileInvoice, faShoppingCart, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  faShoppingCart = faShoppingCart;
  faFileInvoice = faFileInvoice;
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;
  
  constructor(public basketService: BasketService, public accountService: AccountService) { }

  getCountItems(basketItems: BasketItem[]) : number {
    return basketItems.reduce((sum, current) => sum + current.quantity, 0)
  }
}
