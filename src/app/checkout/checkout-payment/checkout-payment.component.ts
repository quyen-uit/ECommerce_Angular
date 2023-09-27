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
import { Order, OrderToCreate } from 'src/app/shared/models/order';
import { firstValueFrom } from 'rxjs';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;
  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardNumberComplete = false;
  cardExpiryComplete = false;
  cardCvcComplete = false;

  cardErrors: any;
  loading = false;
  faIcon = faIcon;
  faSpinner = faSpinner;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService, private toast: ToastrService, private router: Router) { }
  ngOnInit(): void {
    loadStripe('pk_test_51NtiaFFkPQ3eTLH3yFn2jH7j3TlKC67PHUJMX0W10XOCKA0owRLhHqiBchTm4NlzwkMvy4i6KLV4Ddk4AcFJY7z800IYDD90KA').then(stripe => {
      this.stripe = stripe;
      const elements = stripe?.elements();
      if (elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change', event => {
          this.cardNumberComplete = event.complete;
          if (event.error)
            this.cardErrors = event.error.message;
          else
            this.cardErrors = null;
        })

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry.on('change', event => {
          this.cardExpiryComplete = event.complete;
          if (event.error)
            this.cardErrors = event.error.message;
          else
            this.cardErrors = null;
        })

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        this.cardCvc.on('change', event => {
          this.cardCvcComplete = event.complete;
          if (event.error)
            this.cardErrors = event.error.message;
          else
            this.cardErrors = null;
        })
      }
    })

  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    if (basket) {
      try {
        const createdOrder = await this.createOrder(basket);
        const paymentResult = await this.confirmStripePayment(basket);

        if (paymentResult.paymentIntent) {
          this.basketService.deleteBasket(basket);
          const navExtras: NavigationExtras = { state: createdOrder };
          this.router.navigate(['checkout/success'], navExtras);
        }
        else this.toast.error(paymentResult.error.message);

      } catch (error: any) {
        console.log(error);
        this.toast.error(error.message);
      }
      finally {
        this.loading = false;
      }
    } else throw new Error("Basket is null!!");

  }

  private async confirmStripePayment(basket: Basket | null) {
    if (basket) {
      const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
        payment_method: {
          card: this.cardNumber!,
          billing_details: {
            name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
          }
        }
      });
      if (result)
        return result;
      else
        throw new Error('Problems with stripe payment!!!');
    } else {
      throw new Error('Basket is null!!!');
    }
  }

  private async createOrder(basket: Basket | null) {
    if (basket) {
      const orderToCreate = this.getOrderToCreate(basket);
      return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
    } else {
      throw new Error('Basket is null!!!');
    }
  }

  getOrderToCreate(basket: Basket): OrderToCreate {
    const deliveryMethod = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;

    if (deliveryMethod && shipToAddress) {
      return { basketId: basket.id, deliveryMethod: deliveryMethod, shipToAddress: shipToAddress };
    } else {
      throw new Error('Problem  with basket!!!')
    }

  }

  get paymentFormComplete() {
    return this.checkoutForm?.get('paymentForm')?.valid
      && this.cardCvcComplete && this.cardExpiryComplete && this.cardNumberComplete;
  }

}
