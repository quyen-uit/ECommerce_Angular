import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { AdminLayoutComponent } from './layout/layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SharedModule } from '../shared/shared.module';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { ColorComponent } from './color/color.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    AdminLayoutComponent,
    SidenavComponent,
    TopbarComponent,
    ProductBrandComponent,
    ColorComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
