import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShopComponent } from './shop.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShopComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports:[
    ShopComponent
  ]
})
export class ShopModule { }
