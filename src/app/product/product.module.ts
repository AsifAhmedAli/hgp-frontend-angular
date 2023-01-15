import { NgModule } from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {SharedModule} from '../shared/shared.module';
// import {NgxStarsModule} from 'ngx-stars';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {LightboxModule} from 'ngx-lightbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    // NgxStarsModule,
    SlickCarouselModule,
    LightboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TitleCasePipe
  ]
})
export class ProductModule { }
