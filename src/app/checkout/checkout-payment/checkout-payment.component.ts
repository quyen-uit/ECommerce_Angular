import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { faIcon } from 'src/app/shared/icons/faIcon';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/models/basket';
import { Address } from 'src/app/shared/models/user';
import { NavigationExtras, Router } from '@angular/router';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement? : ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement? : ElementRef;
  @ViewChild('cardCvc') cardCvcElement? : ElementRef;
  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardErrors: any;

  faIcon = faIcon;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService, private toast: ToastrService, private router: Router) { }
  ngOnInit(): void {
    loadStripe('pk_test_51NtiaFFkPQ3eTLH3yFn2jH7j3TlKC67PHUJMX0W10XOCKA0owRLhHqiBchTm4NlzwkMvy4i6KLV4Ddk4AcFJY7z800IYDD90KA').then( stripe => {
      this.stripe = stripe;
      const elements = stripe?.elements();
      if(elements){
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change', event => {
          if (event.error)
            this.cardErrors = event.error.message;
          else 
            this.cardErrors = null;
        })
        
        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry.on('change', event => {
          if (event.error)
            this.cardErrors = event.error.message;
          else 
            this.cardErrors = null;
        })

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        this.cardCvc.on('change', event => {
          if (event.error)
            this.cardErrors = event.error.message;
          else 
            this.cardErrors = null;
        })
      }
    })
    
  }

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
