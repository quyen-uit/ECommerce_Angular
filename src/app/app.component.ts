import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private basketService: BasketService, private accountService: AccountService, private translate: TranslateService) {
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit(): void {
    this.loadCurrentUser();
    //this.loadBasket();
  }
  title = 'ECommerce';

  loadCurrentUser() {
    const token = localStorage.getItem('user_token');
    this.accountService.loadCurrentUser(token).subscribe();
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) this.basketService.getBasket(basketId);
  }
}
