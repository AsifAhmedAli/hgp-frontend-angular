import {Injectable} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Constants} from '../constants/constants';
import {AuthService} from './auth.service';
import validate = WebAssembly.validate;
import {UserModel} from '../models/user.model';
import {HelpersService} from './helpers.service';
import {Cart} from '../interfaces/cart.interface';
import {ShippingBillingModel} from '../models/shipping-billing.model';
import {isEmpty, resolveObjectKey, resolveValue} from '../functions/core.function';
import {CustomValidators} from '../../validators/custom-validators';
import {LocalStorage} from '../libs/localstorage';
import {AddressBookModel} from "../models/address-book.model";

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private userID: null;
  addressBookID: number = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private helpersService: HelpersService,
    private localStorage: LocalStorage
  ) {
    this.userID = null;
    this.addressBookID = null;
  }

  addRatingForm(): FormGroup {
    return this.formBuilder.group({
      review: ['', Validators.required],
      image: null
    });
  }

  buildChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
      old: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(Constants.passwordMinLength),
        // Validators.maxLength(Constants.passwordMaxLength),
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ]],
      password_confirmation: ['', [
        Validators.required,
        this.confirmPassword.bind(this),
      ]]
    });
  }

  buildBlogCommentForm() {
    return this.formBuilder.group({
      website: [null],
      message: [null, Validators.required]
    });
  }

  buildContactUsForm() {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(Constants.contactUsNameMaxLength)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(Constants.generalMaxLength)]],
      message: [null, Validators.required]
    });
  }

  buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  buildSubscribeForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(Constants.generalMaxLength)]],
    });
  }

  buildRegisterForm(): FormGroup {
    this.userID = null;
    return this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(Constants.nameMaxField)]],
      lastName: ['', [Validators.required, Validators.maxLength(Constants.nameMaxField)]],
      phone: [null, [Validators.required, Validators.minLength(Constants.phoneMinLength), Validators.maxLength(Constants.phoneMaxLength)]],
      password_confirmation: ['', [Validators.required, this.confirmPassword.bind(this)]],
      password: [null, [
        Validators.required,
        Validators.minLength(Constants.passwordMinLength),
        // Validators.maxLength(Constants.passwordMaxLength),
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ]],
      // tslint:disable-next-line:max-line-length
      email: [null, [Validators.required, Validators.email, Validators.maxLength(Constants.generalMaxLength)], this.emailAlreadyTaken.bind(this)],
    });
  }

  confirmPassword(control: FormControl): any {
    if (control.root.get('password') !== null) {
      if (control.value !== control.root.get('password').value) {
        return {notSame: true};
      } else {
        return null;
      }
    }
    return null;
  }

  emailAlreadyTaken(control: FormControl): any {
    return new Promise((resolve, reject) => {
      this.authService.validateUserEmail(control.value, this.userID).subscribe(
        response => {
          resolve(null);
        },
        error => {
          if (error.status === 422) {
            resolve({emailAlreadyTaken: true});
          } else {
            // this.helpersService.showResponseErrorMessage(error);
            resolve(null);
          }
        }
      );
    });
  }

  verifyShipping(control: FormControl): any {

    const sessionID = this.helpersService.resolveSessionID();
    return new Promise((resolve, reject) => {
      if (!control.value) {
        return;
      }
      this.authService.verifyShipping(sessionID, control.value).subscribe(
        response => {
          resolve(null);
        },
        error => {
          if (error.status === 422) {
            resolve({verifyShipping: true});
          } else {
            // this.helpersService.showResponseErrorMessage(error);
            resolve(null);
          }
        }
      );
    });
  }

  forgotPassword(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(Constants.generalMaxLength)]],
    });
  }

  resetPassword(): FormGroup {
    return this.formBuilder.group({
      password: [null, [Validators.required,
        Validators.minLength(Constants.passwordMinLength),
        // Validators.maxLength(Constants.passwordMaxLength),
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true })
      ]],
      confirm_password: [null, [
        Validators.required
      ]],
      token: [null, [Validators.required]],
    });
  }

  addressBook(): FormGroup {
    return this.formBuilder.group({
      nickname: [null, [Validators.required, Validators.maxLength(Constants.nicknameMaxLength)]],
      first_name: [null, [Validators.required, Validators.maxLength(Constants.firstNameMaxlength)]],
      last_name: [null, [Validators.required, Validators.maxLength(Constants.lastNameMaxlength)]],
      email: [null, [Validators.required, Validators.email]],
      phone_no: [null, [Validators.required, Validators.minLength(Constants.phoneMinLength)]],
      postal_code: [null, [Validators.required, Validators.minLength(Constants.zipMinLength), Validators.maxLength(Constants.zipMaxLength)]],
      street: [null, [Validators.required, Validators.maxLength(Constants.streetMaxlength)]],
      city: [null, [Validators.required, Validators.maxLength(Constants.cityMaxlength)]],
      state: ['', [Validators.required]],

    });
  }

  buildShippingBillingForm(
    cart: Cart,
    defaultShipping: AddressBookModel = null,
    defaultBilling: AddressBookModel = null
  ): FormGroup {
    console.log('buildShippingBillingForm')
    let info: ShippingBillingModel;
    if (
      !isEmpty(defaultShipping) ||
      !isEmpty(defaultBilling) ||
      !isEmpty(cart)
    ) {
      info = new ShippingBillingModel(
        false,
        resolveValue(
          cart && cart.shipping_address_first_name,
          resolveObjectKey(defaultShipping, 'first_name', cart && cart.shipping_address_first_name)
        ),
        resolveValue(
          cart && cart.shipping_address_last_name,
          resolveObjectKey(defaultShipping, 'last_name', cart && cart.shipping_address_last_name)
        ),
        resolveValue(
          cart && cart.shipping_address_address1,
          resolveObjectKey(defaultShipping, 'street', cart && cart.shipping_address_address1)
        ),
        resolveValue(
          cart && cart.shipping_address_state,
          resolveObjectKey(defaultShipping, 'state', cart && cart.shipping_address_state)
        ),
        resolveValue(
          cart && cart.shipping_address_city,
          resolveObjectKey(defaultShipping, 'city', cart && cart.shipping_address_city)
        ),
        resolveValue(
          cart && cart.shipping_address_zip,
          resolveObjectKey(defaultShipping, 'postal_code', cart && cart.shipping_address_zip)
        ),
        resolveValue(
          cart && cart.shipping_address_email,
          resolveObjectKey(defaultShipping, 'email', cart && cart.shipping_address_email)
        ),
        resolveValue(
          cart && cart.shipping_address_phone,
          resolveObjectKey(defaultShipping, 'phone_no', cart && cart.shipping_address_phone)
        ),
        resolveValue(
          cart && cart.billing_address_first_name,
          resolveObjectKey(defaultBilling, 'first_name', cart && cart.billing_address_first_name)
        ),
        resolveValue(
          cart && cart.billing_address_last_name,
          resolveObjectKey(defaultBilling, 'last_name', cart && cart.billing_address_last_name)
        ),

        resolveValue(
          cart && cart.billing_address_address1,
          resolveObjectKey(defaultBilling, 'street', cart && cart.billing_address_address1)
        ),
        resolveValue(
          cart && cart.billing_address_state,
          resolveObjectKey(defaultBilling, 'state', cart && cart.billing_address_state)
        ),
        resolveValue(
          cart && cart.billing_address_city,
          resolveObjectKey(defaultBilling, 'city', cart && cart.billing_address_city)
        ),
        resolveValue(
          cart && cart.billing_address_zip,
          resolveObjectKey(defaultBilling, 'postal_code', cart && cart.billing_address_zip)
        ),
        resolveValue(
          cart && cart.billing_address_email,
          resolveObjectKey(defaultBilling, 'email', cart && cart.billing_address_email)
        ),
        resolveValue(
          cart && cart.billing_address_phone,
          resolveObjectKey(defaultBilling, 'phone_no', cart && cart.billing_address_phone)
        ),
        resolveValue(
          cart && cart.is_different_billing,
          false
        )
      );
    } else {
      info = new ShippingBillingModel(
        false,
        null,
        null,
        null,
        null,
        '',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        '',
        null,
        null,
        null
      );
    }
    return this.formBuilder.group({
      billingFirstName: [info.billingFirstName],
      billingLastName: [info.billingLastName],
      billingEmail: [info.billingEmail],
      billingPhone: [info.billingPhone],
      billingAddress1: [info.billingAddress1, [Validators.required]],
      billingState: [resolveValue(info.billingState, ''), [Validators.required, Validators.maxLength(Constants.stateMaxLength)]],
      billingCity: [info.billingCity, [Validators.required, Validators.maxLength(Constants.varcharMaxLength)]],
      billingZip: [info.billingZip, [
        Validators.required,
        Validators.minLength(Constants.zipMinLength),
        Validators.maxLength(Constants.zipMaxLength)]
      ],
      shippingFirstName: [info.shippingFirstName, [Validators.maxLength(Constants.varcharMaxLength)]],
      shippingLastName: [info.shippingLastName, [Validators.maxLength(Constants.varcharMaxLength)]],
      shippingEmail: [info.shippingEmail, [Validators.email, Validators.maxLength(Constants.varcharMaxLength)]],
      shippingPhone: [info.shippingPhone, [Validators.minLength(Constants.phoneMinLength)]],
      shippingAddress1: [info.shippingAddress1, []],
      shippingState: [resolveValue(info.shippingState, ''), [Validators.maxLength(Constants.stateMaxLength)]],
      shippingCity: [info.shippingCity, [Validators.maxLength(Constants.varcharMaxLength)]],
      shippingZip: [info.billingZip, [Validators.maxLength(Constants.varcharMaxLength)]],
      isDifferentBilling: [info.isDifferentBilling],
      createAccount: [info.createAccount],
    });
  }
  buildServiceCenterForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(Constants.varcharMaxLength)]],
      phone: [null, [Validators.required, Validators.maxLength(Constants.varcharMaxLength)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(Constants.varcharMaxLength)]],
      productModel: [null, [Validators.required, Validators.maxLength(Constants.varcharMaxLength)]],
      serialNumber: [null, [Validators.required, Validators.maxLength(Constants.varcharMaxLength)]],
      purchasedFrom: [null, [Validators.required, Validators.maxLength(Constants.varcharMaxLength)]],
      summary: [null, [Validators.required]],
    });
  }
}
