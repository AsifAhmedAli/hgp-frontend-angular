import { NgModule } from '@angular/core';
import {CommonModule, TitleCasePipe, UpperCasePipe} from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartEmptyComponent } from './cart-empty/cart-empty.component';
import { CartThankYouComponent } from './cart-thank-you/cart-thank-you.component';
import { CartOrderConfirmationComponent } from './cart-order-confirmation/cart-order-confirmation.component';
import {SharedModule} from '../shared/shared.module';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { KitItemComponent } from './kit-items/kit-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ApplyCouponComponent } from './apply-coupon/apply-coupon.component';
import {NgSelect2Module} from 'ng-select2';
import { CartCheckoutBillingShippingComponent } from './cart-checkout-billing-shipping/cart-checkout-billing-shipping.component';
import { CartPaymentComponent } from './cart-payment/cart-payment.component';
import {NgxMaskModule} from 'ngx-mask';
import { CartCheckoutItemComponent } from './cart-checkout-item/cart-checkout-item.component';
import {NgxPayPalModule} from "ngx-paypal";
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';



@NgModule({
  declarations: [
    CartComponent,
    CartEmptyComponent,
    CartThankYouComponent,
    CartOrderConfirmationComponent,
    CartCheckoutComponent,
    CartItemComponent,
    KitItemComponent,
    ApplyCouponComponent,
    CartCheckoutBillingShippingComponent,
    CartPaymentComponent,
    CartCheckoutItemComponent,
    OrderSummaryComponent
  ],
    imports: [
        CommonModule,
        CartRoutingModule,
        SharedModule,
        FormsModule,
        NgSelect2Module,
        NgxMaskModule,
        NgxPayPalModule,
        AngularStickyThingsModule,
        FormsModule,
        ReactiveFormsModule,

    ],
  providers: [
    TitleCasePipe,
    UpperCasePipe
  ]
})
export class CartModule { }
