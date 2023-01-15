import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {SharedModule} from '../shared/shared.module';
// import {NgxStarsModule} from 'ngx-stars';
import { ProductFiltersComponent } from './product-filters/product-filters.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductFiltersComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    // NgxStarsModule,
    SharedModule
  ]
})
export class ProductsModule { }
