import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket/basket.component';
import { Router, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: BasketComponent },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BasketRoutingModule { }
