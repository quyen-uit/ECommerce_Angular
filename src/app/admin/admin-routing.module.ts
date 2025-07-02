// admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { AdminLayoutComponent } from './layout/layout.component';
import { ColorComponent } from './color/color.component';
import { CategoryComponent } from './category/category.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { ColorFormComponent } from './color/color-form/color-form.component';
import { ProductBrandFormComponent } from './product-brand/product-brand-form/product-brand-form.component';
import { SizeComponent } from './size/size.component';
import { SizeFormComponent } from './size/size-form/size-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product', component: ProductComponent },
      { path: 'brand', component: ProductBrandComponent },
      { path: 'brand/create', component: ProductBrandFormComponent },
      { path: 'brand/:id', component: ProductBrandFormComponent },
      { path: 'color', component: ColorComponent },
      { path: 'color/create', component: ColorFormComponent },
      { path: 'color/:id', component: ColorFormComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'category/create', component: CategoryFormComponent },
      { path: 'category/:id', component: CategoryFormComponent },
      { path: 'size', component: SizeComponent },
      { path: 'size/edit/:id', component: SizeFormComponent },
      { path: 'size/add', component: SizeFormComponent },
      // { path: 'size/create', component: CategoryFormComponent },
      // { path: 'size/:id', component: CategoryFormComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
