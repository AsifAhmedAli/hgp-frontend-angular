import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormsService} from '../../services/forms.service';
import {Subscription} from 'rxjs';
import {Messages, ValidationMessages} from '../../constants/constants';
import {HelpersService} from '../../services/helpers.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  readonly MESSAGES = ValidationMessages;
  isSubmitting = false;
  subscription: Subscription;

  constructor(private formService: FormsService,
              private helpersService: HelpersService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formService.buildRegisterForm();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.subscription = this.helpersService.authService.createAccount(this.registerForm.value).subscribe(
        response => {
          this.isSubmitting = false;
          this.registerForm.reset();
          this.helpersService.scrollToTop(180, 180);
          this.router.navigateByUrl('/login');
          this.helpersService.success(Messages.registerFormSubmitted, Messages.registerFormSubmittedTitle);
        },
        error => {
          this.isSubmitting = false;
          this.helpersService.showResponseErrorMessage(error, '', this.registerForm);
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
      // this.helpersService.showFormError();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
