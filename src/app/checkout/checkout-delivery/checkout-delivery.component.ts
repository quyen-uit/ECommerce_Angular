import { Component, Input, OnInit } from '@angular/core';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { FormGroup } from '@angular/forms';
import { faIcon } from 'src/app/shared/icons/faIcon';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  deliveryMethods: DeliveryMethod[] = [];
  faIcon = faIcon;

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.initDeliveryMethods();
    this.initDeliveryMethod();
  }

  initDeliveryMethods() {
    this.checkoutService.getDeliveryMethod().subscribe({
      next: response => {
        if (response.length > 0) {
          this.deliveryMethods = response;
        }
      },
      error: error => console.log(error)
    })
  }

  initDeliveryMethod() {
    const basket = this.basketService.getCurrentBasketValue();

    if (basket && basket.deliveryMethodId) {
      this.checkoutForm?.get('deliveryForm')?.patchValue({ deliveryMethod: basket.deliveryMethodId });
    }
  }


  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod)
  }
}
