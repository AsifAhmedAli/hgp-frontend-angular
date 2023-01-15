import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {DataService} from '../../shared/services/data.service';
import {Subscription} from 'rxjs';
import {Cart} from '../../shared/interfaces/cart.interface';
import {AddressBook} from '../../shared/interfaces/address-books/address-books.response';
import {AuthService} from '../../shared/services/auth.service';
import {FormGroup} from '@angular/forms';
import {FormsService} from '../../shared/services/forms.service';
import {ValidationMessages} from '../../shared/constants/constants';
import {States} from '../../shared/services/States';
import {StateModel} from '../../shared/models/state.model';
import {exists, isEmpty, resolveValue, showFormError} from '../../shared/functions/core.function';
import {TitleCasePipe, UpperCasePipe} from '@angular/common';
import {ApiService} from '../../shared/services/api.service';
import {AddressBookModel} from "../../shared/models/address-book.model";
import {User} from "../../shared/interfaces/user";

@Component({
  selector: 'app-cart-checkout-billing-shipping',
  templateUrl: './cart-checkout-billing-shipping.component.html',
  styleUrls: ['./cart-checkout-billing-shipping.component.css']
})
export class CartCheckoutBillingShippingComponent implements OnInit, OnDestroy {

  cartSubscription: Subscription;
  cart: Cart;
  authSubscription: Subscription;
  userSubscription: Subscription;
  isAuthenticated = false;
  addressBooks: Array<AddressBook> = [];
  getAddressBookSubscription: Subscription;
  shippingForm: FormGroup;
  readonly MESSAGES = ValidationMessages;
  readonly states: Array<StateModel> = States;
  differentBilling = false;
  isSubmitting = false;
  @Input() submit = false;
  user: User;
  addressBook: AddressBookModel = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private authService: AuthService,
    private formService: FormsService,
    private titleCasePipe: TitleCasePipe,
    private upperCasePipe: UpperCasePipe,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.shippingForm = this.formService.buildShippingBillingForm(null);
    this.resolveDifferentBillingCheckBox();
    this.helpersService.reloadUser(user => this.convertUserToAddressBook(user));
    this.subscribe();
  }
  convertUserToAddressBook(user: User): void {
    if (user) {
      this.user = user;
      this.addressBook = new AddressBookModel(
        this.user.first_name,
        this.user.last_name,
        this.user.email,
        this.user.street_address_1,
        this.user.city, this.user.state,
        this.user.phone_number,
        this.user.zip_code
      );
    }
    this.shippingForm = this.formService.buildShippingBillingForm(this.cart ?? null, this.addressBook, this.addressBook);
  }
  subscribe(): void {
    this.cartSubscription = this.dataService.getCart().subscribe(
      cart => {
        this.cart = cart;
        if (this.cart) {
          this.shippingForm = this.formService.buildShippingBillingForm(cart, this.addressBook, this.addressBook);
          if (this.addressBooks.length === 0 && this.helpersService.authService.isAuthenticated()) {
            this.getAddressBooks();
          }
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
    this.userSubscription = this.dataService.getUser().subscribe(user => this.convertUserToAddressBook(user));
  }

  getAddressBooks(): void {
    this.unsubscribe();
    if (this.cart) {
      this.getAddressBookSubscription = this.authService.getMyAddressBooks('all').subscribe(
        response => {
          this.addressBooks = response.books;
          this.shippingForm = this.formService.buildShippingBillingForm(this.cart, this.addressBook, this.addressBook);
          this.resolveDifferentBillingCheckBox();
        },
        error => {
          if (error.status !== 400) {
            this.helpersService.showResponseErrorMessage(error);
          }
        }
      );
    }
  }
  unsubscribe(): void {
    if (this.getAddressBookSubscription) { this.getAddressBookSubscription.unsubscribe(); }
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
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
          this.isSubmitting = false;
          this.dataService.setCart(response.cart);
          // this.helpersService.success(response.message);
          this.router.navigateByUrl('/cart/order-confirmation');
        },
        error => {
          this.isSubmitting = false;
          if (!exists(error.error.errors)) {
            this.helpersService.resetCart(error);
          }
          this.helpersService.showResponseErrorMessage(error);
        }
      );
    } else {
      this.shippingForm.markAllAsTouched();
      showFormError();
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe();
    if (this.cartSubscription) { this.cartSubscription.unsubscribe(); }
    if (this.authSubscription) { this.authSubscription.unsubscribe(); }
  }
}
