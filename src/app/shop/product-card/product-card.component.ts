import { Component, Input, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product?: Product;

  faShoppingCart = faShoppingCart;
  ngOnInit(): void {}

}
