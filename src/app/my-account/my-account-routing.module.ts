import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageTitles} from '../shared/constants/constants';
import {MyAccountComponent} from './my-account.component';
import {ProfileComponent} from './profile/profile.component';
import {MyAccountAddressBookComponent} from './my-account-address-book/my-account-address-book.component';
import {MyAccountAddAddressBookComponent} from './my-account-address-book/my-account-add-address-book/my-account-add-address-book.component';
import {MyAccountPaymentMethodsComponent} from './my-account-payment-methods/my-account-payment-methods.component';
import {MyAccountAddPaymentMethodComponent} from './my-account-payment-methods/my-account-add-payment-method/my-account-add-payment-method.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {WishlistComponent} from './wishlist/wishlist.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/my-account/profile',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MyAccountComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: PageTitles.profile
        }
      },
      {
        path: 'address-book',
        component: MyAccountAddressBookComponent,
        data: {
          title: PageTitles.addressBook
        }
      },
      {
        path: 'address-book/add',
        component: MyAccountAddAddressBookComponent,
        data: {
          title: PageTitles.addAddressBook
        }
      },
      {
        path: 'address-book/edit/:id',
        component: MyAccountAddAddressBookComponent,
        data: {
          title: PageTitles.editAddressBook
        }
      },
      {
        path: 'payment-methods',
        component: MyAccountPaymentMethodsComponent,
        data: {
          title: PageTitles.paymentMethods
        }
      },
      {
        path: 'payment-methods/add',
        component: MyAccountAddPaymentMethodComponent,
        data: {
          title: PageTitles.addPaymentMethod
        }
      },
      {
        path: 'orders',
        component: MyOrdersComponent,
        data: {
          title: PageTitles.orders
        }
      },
      {
        path: 'orders/:orderNumber',
        component: OrderDetailComponent,
        data: {
          title: PageTitles.orderDetail
        }
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          title: PageTitles.changePassword
        }
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        data: {
          title: PageTitles.wishlist
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
