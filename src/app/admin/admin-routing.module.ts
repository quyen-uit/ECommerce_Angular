// admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { AdminLayoutComponent } from './layout/layout.component';
import { ColorComponent } from './color/color.component';
import { CategoryComponent } from './category/category.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product', component: ProductComponent },
      { path: 'product-brand', component: ProductBrandComponent },
      { path: 'color', component: ColorComponent },
      { path: 'category', component: CategoryComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
