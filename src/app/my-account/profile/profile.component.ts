import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {Subscription} from 'rxjs';
import {FormsService} from '../../shared/services/forms.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {States} from '../../shared/services/States';
import {Constants, Messages, ValidationMessages} from '../../shared/constants/constants';
import {User} from '../../shared/interfaces/user';
declare const FloatLabel: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  title: string;
  page = 'profile';
  form: FormGroup;
  states = [];
  userData: User;
  userSubscription: Subscription;
  MESSAGES = ValidationMessages;
  notification = Messages;
  isSubmitting = false;
  selectedState: string;
  isPageProcessingDone = false;
  private updateUserSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private formService: FormsService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.createForm();
    this.states = States;
  }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(true)
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.dataService.setPage(this.page);
    this.getUser();
    FloatLabel.init();
  }

  pageProcessingIsdone(): void {
    this.isPageProcessingDone = true;
  }

  onSubmit(form): void {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.updateUserSubscription = this.authService.updateUser(form, this.userData.id).subscribe(res => {
          this.isSubmitting = false;
          this.helpersService.success(this.notification.profileUpdated, this.notification.success);
        },
        error => {
          this.isSubmitting = false;
          this.helpersService.showResponseErrorMessage(error, '', this.form);
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  getUser(): void {
    this.userSubscription = this.authService.user().subscribe(res => {
      this.pageProcessingIsdone();
      if (res.status) {
        this.userData = res.result;
        this.patchValues();
      }
    });
  }

  createForm(): void {
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(Constants.nameMaxField)]],
      last_name: ['', [Validators.required, Validators.maxLength(Constants.nameMaxField)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.minLength(Constants.phoneMinLength)]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.maxLength(Constants.cityMaxlength)]],
      street_address_1: ['', [Validators.required,Validators.maxLength(Constants.streetMaxlength)]],
      zip_code: ['', [Validators.required, Validators.minLength(Constants.zipMinLength), Validators.maxLength(Constants.zipMaxLength)]]
    });
  }

  patchValues(): void {
    this.selectedState = this.userData.state != null && this.userData.state !== '' ? this.userData.state : '';
    this.form.patchValue({
      first_name: this.userData.first_name,
      last_name: this.userData.last_name,
      email: this.userData.email,
      phone_number: this.userData.phone_number,
      state: this.selectedState,
      city: this.userData.city,
      street_address_1: this.userData.street_address_1,
      zip_code: this.userData.zip_code,
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.updateUserSubscription) {
      this.updateUserSubscription.unsubscribe();
    }
  }


}
