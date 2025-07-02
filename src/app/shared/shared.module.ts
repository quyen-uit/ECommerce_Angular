import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StepperComponent } from './components/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';  

import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
 
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
    DynamicTableComponent,
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
    CdkStepperModule,
    RouterModule,
    SweetAlert2Module.forRoot(),

    TranslateModule.forRoot({
      defaultLanguage: 'vi',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatExpansionModule
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    PaginationModule,
    CarouselModule,
    ReactiveFormsModule,
    BsDropdownModule,
    FontAwesomeModule,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    DynamicTableComponent,
    DynamicFormComponent,

    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatExpansionModule 
  ]
})
export class SharedModule { }
