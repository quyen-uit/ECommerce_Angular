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
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { ColorFormComponent } from './color/color-form/color-form.component';
import { ProductBrandFormComponent } from './product-brand/product-brand-form/product-brand-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    AdminLayoutComponent,
    SidenavComponent,
    TopbarComponent,
    ProductBrandComponent,
    ColorComponent,
    CategoryComponent,
    CategoryFormComponent,
    ColorFormComponent,
    ProductBrandFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
