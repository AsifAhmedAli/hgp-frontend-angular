import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {FormsService} from "../../shared/services/forms.service";
import {ApiService} from "../../shared/services/api.service";
import {FormGroup} from "@angular/forms";
import {ValidationMessages} from "../../shared/constants/constants";
import {apiUrl} from "../../shared/functions/core.function";
import {Subscription} from "rxjs";
declare const FloatLabel: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  title: string;
  form: FormGroup
  MESSAGES = ValidationMessages;
  isSubmitting: boolean;
  formSubmitSubscription: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private formService: FormsService,
    private apiService: ApiService
  ) {
    this.form = this.formService.forgotPassword();
  }

  ngOnInit(): void {
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    FloatLabel.init();
  }

  onSubmit(direct = false): void {
    if(this.form.valid) {
      this.form.get('email').setErrors(null);
      if (!direct) {
        this.isSubmitting = true;
      }
      this.formSubmitSubscription = this.apiService.postRequest(apiUrl('forgot_password'), this.form.value).subscribe(
        response => {
          this.form.reset()
          this.isSubmitting = false
          this.helpersService.success(response.message, 'Success');
        },
        error => {
          this.isSubmitting = false;
          if (error.status === 422) {
            this.form.get('email').setErrors({invalidEmail: true});
          } else {
            this.form.get('email').setErrors(null);
            this.helpersService.error(error.error.errors[0], error.error.message);
          }
        })
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    if (this.formSubmitSubscription){
      this.formSubmitSubscription.unsubscribe()
    }
  }
}
