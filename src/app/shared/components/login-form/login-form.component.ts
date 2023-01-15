import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormsService} from '../../services/forms.service';
import {ValidationMessages} from '../../constants/constants';
import {HelpersService} from '../../services/helpers.service';
import {AuthService} from '../../services/auth.service';
import {showFormError} from '../../functions/core.function';
import {ActivatedRoute, Router} from '@angular/router';
declare const FloatLabel: any;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  MESSAGES = ValidationMessages;
  isSubmitting = false;
  @Input() stopRedirect = false;
  constructor(
    private formsService: FormsService,
    private helpersService: HelpersService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(true);
    this.loginForm = this.formsService.buildLoginForm();
    FloatLabel.init();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.authService.login({...this.loginForm.value, sessionID: this.helpersService.resolveSessionID()}).subscribe(
        response => {
          if (response.status) {
            this.helpersService.afterLogin(response);
            if (!this.stopRedirect) {
              const next = this.activatedRoute.snapshot.queryParams.next || '/my-account';
              this.router.navigateByUrl(next);
            }
            this.isSubmitting = false;
            this.loginForm.reset();
          } else {
            this.helpersService.error('Something went wrong', 'Error');
          }
        },
        error => {
          this.isSubmitting = false;
          this.helpersService.showResponseErrorMessage(error, '', this.loginForm);
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
      showFormError();
    }
  }

}
