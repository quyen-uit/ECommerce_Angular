import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { faIcon } from 'src/app/shared/icons/faIcon';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;
  faIcon = faIcon;

  constructor(private accountService: AccountService, private toast: ToastrService) { }

  saveAddress() {
    this.accountService.updateUserAddress(this.checkoutForm?.get('addressForm')?.value).subscribe({
      next: () => {
        this.toast.success('Save address successfully');
        this.checkoutForm?.get('addressForm')?.reset(this.checkoutForm?.get('addressForm')?.value);
      }
    })
  }
}
