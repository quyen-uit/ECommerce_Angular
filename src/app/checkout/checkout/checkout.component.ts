import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.initAddress();
  }


  checkoutForm = this.fb.group({
    addressForm: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      houseNumber: ['', Validators.required],
      street: ['', Validators.required],
      ward: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: [0, Validators.required],
    }),
    deliveryForm: this.fb.group({
      deliveryMethod: ['', Validators.required]
    }),
    paymentForm: this.fb.group({
      nameOnCard: ['', Validators.required]
    })

  })

  initAddress() {
    this.accountService.getUserAddress().subscribe({
      next: address => {
        if (address) {
          this.checkoutForm.get('addressForm')?.patchValue(address);
        }
      }
    })
  }
}
