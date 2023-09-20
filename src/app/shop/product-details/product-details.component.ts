import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity = 1;
  quantityInBasket = 0;

  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService, private basketService: BasketService) {
    this.breadcrumbService.set('@productName', ' ');
  }
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService.getProduct(parseInt(this.activatedRoute.snapshot.paramMap.get('id')!)).subscribe({
      next: response => {
        this.product = response;
        this.breadcrumbService.set('@productName', response.name);
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next: basket => {
            const item = basket?.items.find(x => x.id == this.product?.id);
            if (item) {
              this.quantityInBasket = item.quantity;
              this.quantity = item.quantity;
            }
          }
        })
      },
      error: error => console.log(error)
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    this.quantity--;
  }

  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        this.basketService.addItemToBasket(this.product, this.quantity - this.quantityInBasket);
        this.quantityInBasket = this.quantity;
      } else {
        this.basketService.removeItemFromBasket(this.product.id, this.quantityInBasket - this.quantity);
        this.quantityInBasket = this.quantity;
      }
    }
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }
}
