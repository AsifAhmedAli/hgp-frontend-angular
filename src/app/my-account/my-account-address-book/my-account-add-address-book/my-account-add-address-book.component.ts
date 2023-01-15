import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpersService} from '../../../shared/services/helpers.service';
import {DataService} from '../../../shared/services/data.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../shared/services/auth.service';
import {AddressBook} from '../../../shared/interfaces/address-books/address-books.response';
import {FormGroup} from '@angular/forms';
import {FormsService} from '../../../shared/services/forms.service';
import {ValidationMessages} from '../../../shared/constants/constants';
import {States} from '../../../shared/services/States';
import {StateModel} from '../../../shared/models/state.model';
declare const FloatLabel: any;

@Component({
  selector: 'app-my-account-add-address-book',
  templateUrl: './my-account-add-address-book.component.html',
  styleUrls: ['./my-account-add-address-book.component.css']
})
export class MyAccountAddAddressBookComponent implements OnInit {
  title: string;
  page = 'add-address-book';
  id: number;
  addressBookSubscription: Subscription;
  addressBook: AddressBook;
  form: FormGroup;
  MESSAGES = ValidationMessages;
  isSubmitting: any = false;
  states: Array<StateModel> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private authService: AuthService,
    private formService: FormsService,
    private router: Router
  ) {
    this.form = this.formService.addressBook();
    this.states = States;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params && params.id) {
        this.id = params.id;
        this.getAddressBook();
      }
    });
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.dataService.setPage(this.page);
    this.helpersService.dataService.setShowFooter(true);
    FloatLabel.init();
  }

  getAddressBook(): void {
    this.addressBookSubscription = this.authService.addressBookById(this.id).subscribe(
      response => {
        this.addressBook = response.result;
        this.patchValues();
      }, error => {
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }

  patchValues() {
    this.form.patchValue({
      nickname: this.addressBook.nickname,
      first_name: this.addressBook.first_name,
      last_name: this.addressBook.last_name,
      street: this.addressBook.street,
      phone_no: this.addressBook.phone_no,
      email: this.addressBook.email,
      city: this.addressBook.city,
      postal_code: this.addressBook.postal_code,
      state: this.addressBook.state,
    });
  }

  ngOnDestroy() {
    if (this.addressBookSubscription) {
      this.addressBookSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      if (this.id) {
        this.updateAddress();
      } else {
        this.addAddress();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  updateAddress() {
    let formData = Object.assign({}, this.form.value);
    this.addressBookSubscription = this.authService.updateAddressBook(formData, this.id).subscribe(
      response => {
        this.helpersService.success(response.message);
        this.helpersService.scrollToTop(250, 250);
        this.router.navigateByUrl('/my-account/address-book');
      }, error => {
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }

  addAddress() {
    let formData = Object.assign({}, this.form.value);
    this.addressBookSubscription = this.authService.addAddressBook(formData).subscribe(
      response => {
        this.helpersService.success(response.message);
        this.helpersService.scrollToTop(250, 250);
        this.router.navigateByUrl('/my-account/address-book');
      }, error => {
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }
}
