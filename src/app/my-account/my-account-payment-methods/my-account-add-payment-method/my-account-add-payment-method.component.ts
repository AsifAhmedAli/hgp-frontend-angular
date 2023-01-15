import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpersService} from '../../../shared/services/helpers.service';
import {DataService} from '../../../shared/services/data.service';
import {Subscription} from 'rxjs';
import {BrainTreeConfig, ValidationMessages} from '../../../shared/constants/constants';
import * as braintree from 'braintree-web';

@Component({
  selector: 'app-my-account-add-payment-method',
  templateUrl: './my-account-add-payment-method.component.html',
  styleUrls: ['./my-account-add-payment-method.component.css']
})
export class MyAccountAddPaymentMethodComponent implements OnInit {
  title: string;
  page = 'add-payment-method';
  subscription: Subscription;
  isConnected = true;
  name: string;
  cardholdersName: string;
  readonly MESSAGES = ValidationMessages;
  isSubmitting = false;
  invalidCreditCardInfo = false;
  clientInstance: any;
  hostedFieldsInstance: braintree.HostedFields;
  token: string;
  isPageProcessingDone = false;
  cvvIsRequired = false;
  expirationDateIsRequired = false;
  cardNumberIsRequired = false;
  cardNameIsRequired = false;
  cvvIsInvalid = false;
  expirationDateIsInvalid = false;
  cardNumberIsInvalid = false;
  anyCardRequiredError = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.dataService.setPage(this.page);
    this.resolveToken();
  }

  resolveToken = () => {
    if (this.isConnected) {
      this.helpersService.authService.getBrainTreeToken().subscribe(
        response => {
          this.token = response.token;
          this.createBrainTreeUI(response.token);
          this.helpersService.dataService.setShowFooter(true);
        },
        error => {
          this.helpersService.showResponseErrorMessage(error);
          this.helpersService.dataService.setShowFooter(true);
        }
      );
    } else {
      this.helpersService.showConnectionErrorMessage();
      this.helpersService.dataService.setShowFooter(true);
    }
  }

  pageProcessingIsDone(): void {
    this.isPageProcessingDone = true;
  }

  createBrainTreeUI(token: string) {
    braintree.client.create({
      authorization: token
    }).then(
      clientInstance => {
        this.clientInstance = clientInstance;
        this.createHostedFields();
      }
    ).catch(
      err => {
        // console.log(err);
      }
    );
  }

  createHostedFields() {
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
        this.pageProcessingIsDone();
      }
    ).catch(
      err => {
        this.pageProcessingIsDone();
        console.log(err);
      }
    );
  }

  tokenizeUserDetails() {
    // reset error fields
    this.resetErrorFields();
    const state = this.hostedFieldsInstance.getState();
    const formValid = Object.keys(state.fields).every(key => {
      return state.fields[key].isValid;
    });
    if (formValid) {
      this.isSubmitting = true;
      this.invalidCreditCardInfo = false;
      this.hostedFieldsInstance.tokenize({cardholderName: this.cardholdersName}).then((payload) => {
        this.isSubmitting = false;
        this.savePaymentMethod(payload);
      }).catch((error) => {
        console.error(error);
        this.invalidCreditCardInfo = true;
        this.isSubmitting = false;
      });
    } else {
      this.customCardValidation(state);
      this.invalidCreditCardInfo = true;
    }
  }

  resetErrorFields() {
    this.cvvIsRequired = false;
    this.expirationDateIsRequired = false;
    this.cardNumberIsRequired = false;
    this.cardNameIsRequired = false;
    this.cvvIsInvalid = false;
    this.expirationDateIsInvalid = false;
    this.cardNumberIsInvalid = false;
  }

  customCardValidation(state) {
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

  savePaymentMethod(payload) {
    this.isSubmitting = true;
    this.helpersService.authService.savePaymentMethod(payload).subscribe(
      response => {
        this.helpersService.success(response.message);
        this.helpersService.scrollToTop(250, 250);
        this.router.navigateByUrl('/my-account/payment-methods');
        this.isSubmitting = false;
      },
      error => {
        this.isSubmitting = false;
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }

}
