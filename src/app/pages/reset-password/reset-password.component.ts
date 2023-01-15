import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {ApiService} from '../../shared/services/api.service';
import {Subscription} from 'rxjs';
import {FormsService} from '../../shared/services/forms.service';
import {FormGroup} from '@angular/forms';
import {apiUrl} from '../../shared/functions/core.function';
import {ValidationMessages} from '../../shared/constants/constants';
declare const FloatLabel: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  title: string;
  token: string;
  validateLinkSubscription: Subscription;
  apiSubscription: Subscription;
  form: FormGroup;
  isSubmitting = false;
  MESSAGES = ValidationMessages;
  linkValid: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private apiService: ApiService,
    private router: Router,
    private formService: FormsService
  ) {
    this.form = formService.resetPassword();
    activatedRoute.params.subscribe(params => {
      this.token = params.token;
     this.validateLink();
    });
  }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(true);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    FloatLabel.init();
  }

  validateLink = () => {
    this.validateLinkSubscription = this.apiService.checkResetPasswordLink(this.token).subscribe(
      response => {
        this.form.patchValue({token: this.token});
        this.linkValid = true;
      },
        error => {
        this.linkValid = false;
      }
    );
  }

  onSubmit = () => {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.apiSubscription = this.apiService.postRequest(apiUrl('password/reset'), this.form.value).subscribe(
        response => {
          this.isSubmitting = false;
          this.helpersService.success(response.message, 'Success');
          this.router.navigateByUrl('/login');
        }, error => {
          this.isSubmitting = false;
          this.helpersService.error(error.error.errors[0], 'Error');
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    if (this.validateLinkSubscription) {
      this.validateLinkSubscription.unsubscribe();
    }
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
}
