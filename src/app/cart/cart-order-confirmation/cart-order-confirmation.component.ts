import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {Subscription} from 'rxjs';
import {Cart} from '../../shared/interfaces/cart.interface';
import {DataService} from '../../shared/services/data.service';
import {exists, isEmpty} from '../../shared/functions/core.function';
import {ApiService} from '../../shared/services/api.service';
import {Messages} from '../../shared/constants/constants';
import {environment} from '../../../environments/environment';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';

@Component({
  selector: 'app-cart-order-confirmation',
  templateUrl: './cart-order-confirmation.component.html',
  styleUrls: ['./cart-order-confirmation.component.css']
})
export class CartOrderConfirmationComponent implements OnInit, OnDestroy {

  title: string;
  cartFound = true;
  cartSubscription: Subscription;
  cartFoundSubscription: Subscription;
  cart: Cart;
  isSubmitting = false;
  payPalConfig: IPayPalConfig;
  order: any;
  isPaying = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private router: Router,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.dataService.setShowFooter(false);
    this.dataService.setShowHeader(false);
    this.helpersService.scrollToTop();
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.subscribe();
    this.initConfig();
  }

  subscribe(): void {
    this.cartSubscription = this.dataService.getCart().subscribe(
      cart => {
        this.cart = cart;
      }
    );
    this.cartFoundSubscription = this.dataService.getCartFound().subscribe(
      (found: boolean) => {
        this.cartFound = found;
        if (!this.cartFound) {
          this.router.navigateByUrl('/cart');
        } else {
          this.checkForPage();
        }
        this.dataService.setShowFooter(true);
      }
    );
  }

  private initConfigNew(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.paypal.id,
      createOrderOnClient: (data) => <any>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.cart.total_price.toFixed(2).toString(),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.cart.total_price.toFixed(2).toString()
                }
              }
            },
            shipping: {
              address: {
                address_line_1: this.cart.billing_address_address1,
                address_line_2: this.cart.billing_address_address2,
                admin_area_2: this.cart.billing_address_city,
                admin_area_1: this.cart.billing_address_state,
                postal_code: this.cart.billing_address_zip,
                country_code: 'US'
              }
            },
            items: [
              {
                name: 'Subscription',
                quantity: this.cart.total_qty,
                category: 'PHYSICAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: this.cart.total_price.toFixed(2).toString(),
                },
              }
            ]
          }
        ],
        payer: {
          name: {
            given_name: this.cart.billing_address_first_name,
            surname: this.cart.billing_address_last_name
          },
          address: {
            address_line_1: this.cart.billing_address_address1,
            address_line_2: this.cart.billing_address_address2,
            admin_area_2: this.cart.billing_address_city,
            admin_area_1: this.cart.billing_address_state,
            postal_code: this.cart.billing_address_zip,
            country_code: 'US'
          },
          email_address: this.cart.billing_address_email,
          phone: {
            phone_type: 'MOBILE',
            phone_number: {
              national_number: this.cart.billing_address_phone
            }
          }
        }
      },
      advanced: {
        commit: 'true',
        extraQueryParams: [
          {
            name: 'disable-funding',
            value: 'credit'
          },

        ]
      },
      style: {
        label: 'pay',
        layout: 'vertical',
        shape: 'pill',
        tagline: false
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.placeOrder(data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.paypal.id,
      createOrderOnClient: (data) => <any>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.cart.total_price.toFixed(2).toString(),
            },
            shipping: {
              address: {
                address_line_1: this.cart.billing_address_address1,
                address_line_2: this.cart.billing_address_address2,
                admin_area_2: this.cart.billing_address_city,
                admin_area_1: this.cart.billing_address_state,
                postal_code: this.cart.billing_address_zip,
                country_code: 'US'
              }
            },
          }
        ],
        payer: {
          name: {
            given_name: this.cart.billing_address_first_name,
            surname: this.cart.billing_address_last_name
          },
          address: {
            address_line_1: this.cart.billing_address_address1,
            address_line_2: this.cart.billing_address_address2,
            admin_area_2: this.cart.billing_address_city,
            admin_area_1: this.cart.billing_address_state,
            postal_code: this.cart.billing_address_zip,
            country_code: 'US'
          },
          email_address: this.cart.billing_address_email,
          phone: {
            phone_type: 'MOBILE',
            phone_number: {
              national_number: this.cart.billing_address_phone
            }
          }
        }
      },
      advanced: {
        commit: 'true',
        extraQueryParams: [
          {
            name: 'disable-funding',
            value: 'credit'
          },

        ]
      },
      style: {
        label: 'pay',
        layout: 'vertical',
        shape: 'pill',
        tagline: false
      },
      onApprove: (data, actions) => {
        this.isPaying = true;
        actions.order.get().then(details => {
          this.order = details;
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.placeOrder(data);
      },
      onCancel: (data, actions) => {
        this.isPaying = false;
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        this.isPaying = false;
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        // this.isPaying = true;
        console.log('onClick', data, actions);
      },
    };
  }

  checkForPage(): void {
    if (!isEmpty(this.cart) && !exists(this.cart.billing_address_email)) {
      this.router.navigate(['/cart/checkout']);
    }
  }

  placeOrder(paypalData: any): void {
    if (!this.isSubmitting) {
      this.isSubmitting = true;
      this.apiService.placeOrder(
        this.helpersService.resolveSessionID(),
        this.order,
        paypalData
      ).subscribe(
        response => {
          this.isSubmitting = false;
          this.helpersService.dataService.setCart(response.cart);
          this.dataService.setOrderNumber(response.orderNumber);
          this.dataService.setOrderID(response.orderID);
          this.router.navigateByUrl('/cart/thank-you');
        },
        error => {
          if (this.helpersService.showOutOfStockMessages(error)) {
            if (error.status === 402) {
              if (error.error.reason === 'NonceNotFound') {
                this.helpersService.error(Messages[error.error.reason], error.statusText);
              } else {
                this.helpersService.showResponseErrorMessage(error);
              }
              this.router.navigate(['/cart/checkout']);
            } else {
              this.helpersService.resetCart(error);
              this.helpersService.showResponseErrorMessage(error);
            }
          }
          this.isSubmitting = false;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.dataService.setShowHeader(true);
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.cartFoundSubscription) {
      this.cartFoundSubscription.unsubscribe();
    }
  }

}
