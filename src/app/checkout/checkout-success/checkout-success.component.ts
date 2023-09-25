import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent {
  orderId?: number;
  constructor(private router: Router) {
    this.orderId = this.router.getCurrentNavigation()?.extras.state?.['id'];
  }

}
