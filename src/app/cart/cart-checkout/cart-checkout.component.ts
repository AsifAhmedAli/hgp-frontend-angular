import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {Subscription} from 'rxjs';
import {Cart} from '../../shared/interfaces/cart.interface';
import {DataService} from '../../shared/services/data.service';
import {AuthService} from '../../shared/services/auth.service';
import {isPlatformBrowser, UpperCasePipe} from '@angular/common';
import {
  closeCartSidebar,
  exists,
  getSettingValue,
  isEmpty,
  resolveValue,
  showFormError
} from '../../shared/functions/core.function';
import {FormsService} from '../../shared/services/forms.service';
import {FormGroup} from '@angular/forms';
import {AddressBook} from '../../shared/interfaces/address-books/address-books.response';
import {ApiService} from '../../shared/services/api.service';
import {ValidationMessages} from '../../shared/constants/constants';
import {StateModel} from '../../shared/models/state.model';
import {States} from '../../shared/services/States';
import {Setting} from '../../shared/interfaces/header.response';
import {User} from "../../shared/interfaces/user";
import {AddressBookModel} from "../../shared/models/address-book.model";
declare const FloatLabel: any;

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit, OnDestroy {

  title: string;
  cartFound = true;
  cartSubscription: Subscription;
  cartFoundSubscription: Subscription;
  cart: Cart;
  authSubscription: Subscription;
  settingSubscription: Subscription;
  isAuthenticated = false;
  proceedPayment = false;
  shippingForm: FormGroup;
  differentBilling = false;
  isSubmitting = false;
  addressBooks: Array<AddressBook> = [];
  getAddressBookSubscription: Subscription;
  MESSAGES = ValidationMessages;
  readonly states: Array<StateModel> = States;
  paymentMethod = 'credit_card';
  settings: Setting[];
  getSettingValue = getSettingValue;
  user: User;
  addressBook: AddressBookModel = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformID,
    private formService: FormsService,
    private upperCasePipe: UpperCasePipe,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.dataService.setShowHeader(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    if (isPlatformBrowser(this.platformID)) {
      closeCartSidebar();
    }
    this.subscribe();
    this.shippingForm = this.formService.buildShippingBillingForm(null);
    this.resolveDifferentBillingCheckBox();
    FloatLabel.init();
  }
  convertUserToAddressBook(user: User): void {
    if (user) {
      this.user = user;
      this.shippingForm.patchValue({
        billingFirstName: this.user.first_name,
        billingLastName: this.user.last_name,
        billingEmail: this.user.email,
        billingPhone: this.user.phone_number,
        billingAddress1: this.user.street_address_1,
        billingState: this.user.state,
        billingCity: this.user.city,
        billingZip: this.user.zip_code,
        shippingFirstName: this.user.first_name,
        shippingLastName: this.user.last_name,
        shippingEmail: this.user.email,
        shippingPhone: this.user.phone_number,
        shippingAddress1: this.user.street_address_1,
        shippingState: this.user.state,
        shippingCity: this.user.city,
        shippingZip: this.user.zip_code,
      });
    }
  }
  subscribe(): void {
    this.cartSubscription = this.dataService.getCart().subscribe(
      cart => {
        if (cart) {
          this.cart = cart;
          this.shippingForm = this.formService.buildShippingBillingForm(cart);
          if (this.addressBooks.length === 0 && this.helpersService.authService.isAuthenticated()) {
            this.getAddressBooks();
          }
        }
      }
    );
    this.cartFoundSubscription = this.dataService.getCartFound().subscribe(
      (found: boolean) => {
        this.cartFound = found;
        if (!this.cartFound) {
          this.router.navigateByUrl('/cart');
        }
      }
    );
    this.authSubscription = this.authService.getIsAuthenticated().subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if (this.isAuthenticated) {
          this.getAddressBooks();
        }
      }
    );
    this.settingSubscription = this.dataService.getSettings().subscribe(settings => this.settings = settings);
  }
  getAddressBooks(): void {
   // this.unsubscribe();
    if (this.cart) {
      this.getAddressBookSubscription = this.authService.getMyAddressBooks('all').subscribe(
        response => {
          this.addressBooks = response.books;
          // this.shippingForm = this.formService.buildShippingBillingForm(this.cart, null, null);
          this.resolveDifferentBillingCheckBox();
          this.populateData()
        },
          error => {
            this.populateData()
            if (error.status !== 400) {
              this.helpersService.showResponseErrorMessage(error);
            }
          }
      );
    }
  }

  populateData(): void {
    this.helpersService.reloadUser(user => this.convertUserToAddressBook(user));
  }

  unsubscribe(): void {
    if (this.getAddressBookSubscription) {
      this.getAddressBookSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.settingSubscription) {
      this.settingSubscription.unsubscribe();
    }
  }

  onChangeAddress(addressID, type: string): void {
    const addressBook: AddressBook = this.addressBooks.find(book => book.id.toString() === addressID.value.toString());
    this.populateValues(type, addressBook);
  }
  populateValues(type: string, book: AddressBook): void {
    if (!isEmpty(book)) {
      this.shippingForm.get(`${type}FirstName`).setValue(book.first_name);
      this.shippingForm.get(`${type}LastName`).setValue(book.last_name);
      this.shippingForm.get(`${type}Email`).setValue(book.email);
      this.shippingForm.get(`${type}Phone`).setValue(book.phone_no);
      this.shippingForm.get(`${type}Address1`).setValue(book.street);
      this.shippingForm.get(`${type}State`).setValue(this.upperCasePipe.transform(book.state));
      this.shippingForm.get(`${type}City`).setValue(book.city);
      this.shippingForm.get(`${type}Zip`).setValue(book.postal_code);
    } else {
      this.shippingForm.get(`${type}FirstName`).setValue(null);
      this.shippingForm.get(`${type}LastName`).setValue(null);
      this.shippingForm.get(`${type}Email`).setValue(null);
      this.shippingForm.get(`${type}Phone`).setValue(null);
      this.shippingForm.get(`${type}Address1`).setValue(null);
      this.shippingForm.get(`${type}State`).setValue(null);
      this.shippingForm.get(`${type}City`).setValue(null);
      this.shippingForm.get(`${type}Zip`).setValue(null);
    }
  }
  onCheckboxChange(event): void {
    this.differentBilling = event.target.checked;
    if (!this.differentBilling) {
      // this.populateValues('shipping', null);
    }
  }
  proceed(): void {
    if (this.cart.payment_nonce) {
      this.router.navigateByUrl('/cart/order-confirmation');
    }
  }
  ngOnDestroy(): void {
    this.dataService.setShowHeader(true);
    if (this.cartSubscription) { this.cartSubscription.unsubscribe(); }
    if (this.cartFoundSubscription) { this.cartFoundSubscription.unsubscribe(); }
    if (this.authSubscription) { this.authSubscription.unsubscribe(); }
  }

  proceedBillingShipping(submitForm): void {
    if (submitForm) {
      this.onSubmit();
    }
  }

  resolveDifferentBillingCheckBox(): void {
    if (this.shippingForm.get('isDifferentBilling').value === false) {
      this.differentBilling = false;
    } else {
      this.differentBilling = resolveValue(this.shippingForm.get('isDifferentBilling').value, 0) !== 0;
    }
  }

  onSubmit(): void {
    if (this.shippingForm.valid) {
      this.isSubmitting = true;
      this.apiService.updateBillingShipping(
        this.helpersService.resolveSessionID(),
        this.shippingForm.value
      ).subscribe(
        response => {
          this.isSubmitting = false
          this.dataService.setCart(response.cart);
         // this.helpersService.success(response.message);
          this.proceedPayment = true;
          this.router.navigateByUrl('/cart/order-confirmation');
        },
        error => {
          this.isSubmitting = false;
          this.proceedPayment = false;
          if (!exists(error.error.errors)) {
            this.helpersService.resetCart(error);
          }
          if (error.status === 424) {
            const restricted_products = error.error.restricted_products;
            const restricted_kits = error.error.restricted_kits;
            this.cart.products.forEach(item => {
              /*check restriction if kit added into cart*/
              if (item.kit){
                if (restricted_kits.includes(item.kit.id)) {
                  item.isRestrictedKit = true;
                } else {
                  item.isRestrictedKit = false;
                }
              }else {
                if (restricted_products.includes(item.hydro_product_id)) {
                  item.isRestricted = true;
                } else {
                  item.isRestricted = false;
                }
              }
            });
          } else {
            this.helpersService.showResponseErrorMessage(error);
          }

        }
      );
    } else {
      this.shippingForm.markAllAsTouched();
      showFormError();
      this.proceedPayment = false;
    }
  }


}
