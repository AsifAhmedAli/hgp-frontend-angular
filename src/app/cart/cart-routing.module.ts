import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from './cart.component';
import {PageTitles} from '../shared/constants/constants';
import {CartThankYouComponent} from './cart-thank-you/cart-thank-you.component';
import {CartOrderConfirmationComponent} from './cart-order-confirmation/cart-order-confirmation.component';
import {CartCheckoutComponent} from './cart-checkout/cart-checkout.component';
import {AuthGuard} from '../shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    data: {
      title: PageTitles.cart
    }
  },
  {
    path: 'order-confirmation',
    component: CartOrderConfirmationComponent,
    data: {
      title: PageTitles.orderConfirmation
    }
  },
  {
    path: 'checkout',
    component: CartCheckoutComponent,
    data: {
      title: PageTitles.checkout
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'thank-you',
    component: CartThankYouComponent,
    data: {
      title: PageTitles.thankYou
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
