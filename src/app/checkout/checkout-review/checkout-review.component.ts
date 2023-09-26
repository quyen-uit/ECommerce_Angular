import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { faIcon } from 'src/app/shared/icons/faIcon';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent {
  @Input() appStepper? : CdkStepper;
  faIcon = faIcon;
  constructor(private basketService: BasketService, private toast: ToastrService) { }

  createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.toast.success('Payment intent created successfully');
        this.appStepper?.next();
      },
      error: error => console.log('error')
    })
  }
}
