import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MyAccountComponent } from './my-account.component';
import { MyAccountHeaderComponent } from './my-account-header/my-account-header.component';
import {SharedModule} from '../shared/shared.module';
import { MyAccountAddressBookComponent } from './my-account-address-book/my-account-address-book.component';
import { MyAccountAddAddressBookComponent } from './my-account-address-book/my-account-add-address-book/my-account-add-address-book.component';
import { MyAccountPaymentMethodsComponent } from './my-account-payment-methods/my-account-payment-methods.component';
import { MyAccountAddPaymentMethodComponent } from './my-account-payment-methods/my-account-add-payment-method/my-account-add-payment-method.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountPaymentItemComponent } from './my-account-payment-methods/account-payment-item/account-payment-item.component';
import {ProductModule} from "../product/product.module";
import {NgSelect2Module} from 'ng-select2';
import { MyOrderSingleItemComponent } from './my-orders/my-order-single-item/my-order-single-item.component';
import { OrderDetailTitleContentComponent } from './order-detail/order-detail-title-content/order-detail-title-content.component';
import { OrderDetailBillingComponent } from './order-detail/order-detail-billing/order-detail-billing.component';
import { OrderDetailShippingComponent } from './order-detail/order-detail-shipping/order-detail-shipping.component';
import {NgxMaskModule} from 'ngx-mask';



@NgModule({
  declarations: [
    ProfileComponent,
    MyAccountComponent,
    MyAccountHeaderComponent,
    MyAccountAddressBookComponent,
    MyAccountAddAddressBookComponent,
    MyAccountPaymentMethodsComponent,
    MyAccountAddPaymentMethodComponent,
    MyOrdersComponent,
    ChangePasswordComponent,
    WishlistComponent,
    OrderDetailComponent,
    AccountPaymentItemComponent,
    MyOrderSingleItemComponent,
    OrderDetailTitleContentComponent,
    OrderDetailBillingComponent,
    OrderDetailShippingComponent
  ],
    imports: [
        CommonModule,
        MyAccountRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgSelect2Module,
        ProductModule,
        NgxMaskModule.forRoot()
    ]
})
export class MyAccountModule { }
