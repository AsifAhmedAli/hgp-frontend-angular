import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {Cart} from '../../shared/interfaces/cart.interface';
import {DataService} from '../../shared/services/data.service';
import {BrainTreeCreditCard} from '../../shared/interfaces/user-payment/saved-payment-methods.response';
import {BrainTreeConfig, ValidationMessages} from '../../shared/constants/constants';

import * as braintree from 'braintree-web';
import {ApiService} from '../../shared/services/api.service';
import {AuthService} from '../../shared/services/auth.service';
import {HelpersService} from '../../shared/services/helpers.service';
import {Router} from '@angular/router';
import {exists} from '../../shared/functions/core.function';
import {PayloadModel} from '../../shared/models/paypal.model';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.css']
})
export class CartPaymentComponent implements OnInit, OnDestroy {

  cartFound = true;
  cartSubscription: Subscription;
  cartFoundSubscription: Subscription;
  cart: Cart;
  paymentMethod: string;
  invalidCreditCardInfo = false;
  clientInstance: any;
  payPalInstance: any;
  payPalSubmitting = false;
  savedCards: Array<BrainTreeCreditCard> = [];
  readonly MESSAGES = ValidationMessages;
  isSubmitting = false;
  payFrom = '';
  hostedFieldsInstance: braintree.HostedFields;
  cardholdersName: string;
  token: string;
  defaultMethodToken: string;
  cvvIsRequired = false;
  expirationDateIsRequired = false;
  cardNumberIsRequired = false;
  cardNameIsRequired = false;
  cvvIsInvalid = false;
  expirationDateIsInvalid = false;
  cardNumberIsInvalid = false;
  anyCardRequiredError = false;
  authSubscription: Subscription;
  apiSubscription: Subscription;
  @Output() proceedBillingShipping = new EventEmitter();
  @Input() proceedPayment = false;
  payload: any;
  constructor(
    private dataService: DataService,
    private apiService: ApiService,
    private authService: AuthService,
    private helpersService: HelpersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscribe();
    this.resolveToken();
  }

  ngOnChanges(): void {
    if (this.proceedPayment && this.proceedPayment === true) {
      if (this.paymentMethod === 'credit') {
        this.payWithCC();
      } else {
        this.payWithPaypal();
      }
    }
  }
  onChange(target): void {
    this.payFrom = target.value;
    this.invalidCreditCardInfo = false;
  }

  resolveToken(): void {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
    this.apiSubscription = this.authService.getBrainTreeToken().subscribe(
      response => {
        this.token = response.token;
        if (exists(response.customer) && response.customer.creditCards.length) {
          this.savedCards = response.customer.creditCards;
          for (const card of this.savedCards) {
            if (card.default) {
              this.defaultMethodToken = card.token;
              this.payFrom = card.token;
              this.invalidCreditCardInfo = false;
            }
          }
        } else {
          this.payFrom = 'other';
        }
        this.createBrainTreeUI(response.token);
      },
      error => {
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }

  createBrainTreeUI(token: string): void {
    braintree.client.create({
      authorization: token
    }).then(
      clientInstance => {
        this.clientInstance = clientInstance;
        this.createHostedFields();
        this.createBrainTreePayPal();
      }
    ).catch(
      err => {
        // console.log(err);
      }
    );
  }

  createHostedFields(): void {
    braintree.hostedFields.create({
      client: this.clientInstance,
      styles: {
        // Style all elements
        'input': {
          'font-size': '14px'
        }
      },//BrainTreeConfig.style,
      fields: BrainTreeConfig.fields
    }).then(
      hostedFieldsInstance => {
        this.hostedFieldsInstance = hostedFieldsInstance;

        hostedFieldsInstance.on('focus', (event) => {
          const field = event.fields[event.emittedBy];
          // const label = this.findLabel(field);
          // label.classList.add('label-float');
          // label.classList.remove('filled');
        });

        hostedFieldsInstance.on('blur', (event) => {
          const field = event.fields[event.emittedBy];
          // const label = this.findLabel(field);

          // if (field.isEmpty) {
          //   label.classList.remove('label-float');
          // } else if (field.isValid) {
          //   label.classList.add('filled');
          // } else {
          //   label.classList.add('invalid');
          // }
        });

        hostedFieldsInstance.on('empty', (event) => {
          const field = event.fields[event.emittedBy];
          // const label = this.findLabel(field);

          // label.classList.remove('filled');
          // label.classList.remove('invalid');
        });

        hostedFieldsInstance.on('validityChange', (event) => {
          const field = event.fields[event.emittedBy];
          // const label = this.findLabel(field);
          // if (field.isPotentiallyValid) {
          //   label.classList.remove('invalid');
          // } else {
          //   label.classList.add('invalid');
          // }
        });
      }
    ).catch(
      err => {
        // console.log(err);
      }
    );
  }

  createBrainTreePayPal(): void {
    braintree.paypal.create({
      client: this.clientInstance
    }).then(
      paypalInstance => {
        this.payPalInstance = paypalInstance;
      }
    );
  }

  checkoutWithPayPal(): void {
    this.proceedBillingShipping.emit(true);
  }

  payWithPaypal(): void {
    if (this.isSubmitting) {
      return;
    }
    this.payPalSubmitting = true;
    this.payPalInstance.tokenize({
      flow: 'checkout',
      // intent: 'authorize',
      amount: this.cart.total_price,
      currency: 'USD',
      displayName: 'HGP',
      locale: 'en_US'
    }).then(
      payload => {
        this.payPalSubmitting = false;
        this.sendNonceToCart(payload);
      }).catch(
      tokenizeErr => {
        this.payPalSubmitting = false;
        switch (tokenizeErr.code) {
          case 'PAYPAL_POPUP_CLOSED':
            console.error('Customer closed PayPal popup.');
            break;
          case 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED':
            // console.error('PayPal tokenization failed. See details:', tokenizeErr.details);
            break;
          case 'PAYPAL_FLOW_FAILED':
            // console.error('Unable to initialize PayPal flow. Are your options correct?', tokenizeErr.details);
            break;
          default:
          // console.error('Error!', tokenizeErr);
        }
      }
    );
  }

  payWithCC(): void {
    this.invalidCreditCardInfo = false;
    this.isSubmitting = true;
    if (this.payload) {
      this.sendNonceToCart(this.payload);
    } else {
      this.hostedFieldsInstance.tokenize({cardholderName: this.cardholdersName}).then((payload) => {
        this.isSubmitting = false;
        this.sendNonceToCart(payload);
      }).catch((error) => {
        switch (error.code) {
          case 'HOSTED_FIELDS_FIELDS_EMPTY':
            console.error('All fields are empty! Please fill out the form.');
            break;
          case 'HOSTED_FIELDS_FIELDS_INVALID':
            console.error('Some fields are invalid:', error.details.invalidFieldKeys);
            error.details.invalidFields.each((fieldContainer) => {
              fieldContainer.className = 'invalid';
            });
            break;
          case 'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE':
            console.error('This payment method already exists in your vault.');
            break;
          case 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED':
            console.error('CVV did not pass verification');
            break;
          case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
            console.error('Tokenization failed server side. Is the card valid?');
            break;
          case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
            console.error('Network error occurred when tokenizing.');
            break;
          default:
            console.error('Something bad happened!', error);
        }
        this.invalidCreditCardInfo = true;
        this.isSubmitting = false;
      });
    }
  }

  tokenizeUserDetails(): void {
    // reset error fields
    this.resetErrorFields();
    if (!exists(this.payFrom)) {
      this.invalidCreditCardInfo = true;
    } else if (this.payFrom === 'other') {
      const state = this.hostedFieldsInstance.getState();
      const formValid = Object.keys(state.fields).every(key => {
        return state.fields[key].isValid;
      });
      if (formValid) {
        this.proceedBillingShipping.emit(true);
      } else {
        this.customCardValidation(state);
        this.invalidCreditCardInfo = true;
        this.isSubmitting = false;
      }
    } else {
      const payload = new PayloadModel('SavedCard', {token: this.payFrom});
      this.payload = payload;
      this.isSubmitting = false;
      this.proceedBillingShipping.emit(true);
      // this.sendNonceToCart(payload);
    }
  }

  resetErrorFields(): void {
    this.cvvIsRequired = false;
    this.expirationDateIsRequired = false;
    this.cardNumberIsRequired = false;
    this.cardNameIsRequired = false;
    this.cvvIsInvalid = false;
    this.expirationDateIsInvalid = false;
    this.cardNumberIsInvalid = false;
  }

  customCardValidation(state): void {
    // required validation start
    this.anyCardRequiredError = false;
    if (state.fields) {
      if (state.fields.cvv.isEmpty && state.fields.expirationDate.isEmpty && state.fields.number.isEmpty && !this.cardholdersName) {
        this.cvvIsRequired = true;
        this.expirationDateIsRequired = true;
        this.cardNumberIsRequired = true;
        this.cardNameIsRequired = true;
        this.anyCardRequiredError = true;
      } else if (state.fields.cvv.isEmpty && state.fields.expirationDate.isEmpty && state.fields.number.isEmpty) {
        this.cvvIsRequired = true;
        this.expirationDateIsRequired = true;
        this.cardNumberIsRequired = true;
        this.anyCardRequiredError = true;
      } else if (state.fields.cvv.isEmpty && state.fields.expirationDate.isEmpty) {
        this.cvvIsRequired = true;
        this.expirationDateIsRequired = true;
        this.anyCardRequiredError = true;
      } else if (state.fields.cvv.isEmpty) {
        this.cvvIsRequired = true;
        this.anyCardRequiredError = true;
      } else if (state.fields.expirationDate.isEmpty) {
        this.expirationDateIsRequired = true;
        this.anyCardRequiredError = true;
      } else if (state.fields.number.isEmpty) {
        this.cardNumberIsRequired = true;
        this.anyCardRequiredError = true;
      } else if (!this.cardholdersName) {
        this.cardNameIsRequired = true;
        this.anyCardRequiredError = true;
      }
      //  required validation end

      //  fields error will show start
      if (!this.anyCardRequiredError) {
        if (!state.fields.cvv.isValid && !state.fields.expirationDate.isValid && !state.fields.number.isValid) {
          this.cvvIsInvalid = true;
          this.expirationDateIsInvalid = true;
          this.cardNumberIsInvalid = true;
        } else if (!state.fields.cvv.isValid && !state.fields.number.isValid) {
          this.cvvIsInvalid = true;
          this.cardNumberIsInvalid = true;
        } else if (!state.fields.expirationDate.isValid && !state.fields.number.isValid) {
          this.expirationDateIsInvalid = true;
          this.cardNumberIsInvalid = true;
        } else if (!state.fields.cvv.isValid && !state.fields.number.isValid) {
          this.cvvIsInvalid = true;
          this.cardNumberIsInvalid = true;
        } else if (!state.fields.cvv.isValid && !state.fields.expirationDate.isValid) {
          this.cvvIsInvalid = true;
          this.expirationDateIsInvalid = true;
        } else if (!state.fields.cvv.isValid) {
          this.cvvIsInvalid = true;
        } else if (!state.fields.number.isValid) {
          this.cardNumberIsInvalid = true;
        } else if (!state.fields.expirationDate.isValid) {
          this.expirationDateIsInvalid = true;
        }
      }
      //  fields error will show end

    }
  }

  sendNonceToCart(payload: any): void {
    this.isSubmitting = true;
    this.apiService.attachNonceWithCart(payload, this.cardholdersName, this.helpersService.resolveSessionID()).subscribe(
      response => {
        this.dataService.setCart(response.cart);
        this.isSubmitting = false;
        this.router.navigateByUrl('/cart/order-confirmation');
      },
      error => {
        if (this.helpersService.showOutOfStockMessages(error)) {
          this.helpersService.resetCart(error);
          this.helpersService.showResponseErrorMessage(error);
        }
        this.isSubmitting = false;
      }
    );
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
      }
    );
    this.authSubscription = this.authService.getIsAuthenticated().subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          this.resolveToken();
        }
      }
    );
  }

  onChangeCheckbox(event: any): void {
    this.paymentMethod = event.target.value;
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.cartFoundSubscription) {
      this.cartFoundSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
