import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService) {
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
      },
      error: error => console.log(error)
    });
  }
}
