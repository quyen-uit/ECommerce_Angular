import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { faIcon } from 'src/app/shared/icons/faIcon';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/models/basket';
import { Address } from 'src/app/shared/models/user';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup;
  faIcon = faIcon;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService, private toast: ToastrService, private router: Router) { }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (basket) {
      const orderToCreate = this.getOrderToCreate(basket);
      if (orderToCreate) {
        this.checkoutService.createOrder(orderToCreate).subscribe({
          next: order => {
            this.toast.success('Order create successfully');
            this.basketService.deleteLocalBasket();
            const navExtras: NavigationExtras = { state: order };
            this.router.navigate(['checkout/success'], navExtras);
          }
        })
      }
    }
  }
  getOrderToCreate(basket: Basket) {
    const deliveryMethod = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;

    if (deliveryMethod && shipToAddress) {
      return { basketId: basket.id, deliveryMethod: deliveryMethod, shipToAddress: shipToAddress };
    }
    return null;
  }
}
