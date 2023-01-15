import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {DataService} from '../../shared/services/data.service';
import {Subscription} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {Messages, ValidationMessages} from '../../shared/constants/constants';
import {FormsService} from '../../shared/services/forms.service';
declare const FloatLabel: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  title: string;
  page = 'change-password';
  subscription: Subscription;
  isSubmitting = false;
  changePasswordForm: FormGroup;
  readonly MESSAGES = ValidationMessages;
  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private formService: FormsService,
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formService.buildChangePasswordForm();
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.dataService.setPage(this.page);
    this.helpersService.dataService.setShowFooter(true);
    FloatLabel.init();
  }
  onSubmit() {
    if (this.changePasswordForm.valid) {
        this.isSubmitting = true;
        this.subscription = this.helpersService.authService.changePassword(this.changePasswordForm.value).subscribe(
          response => {
            this.isSubmitting = false
            this.changePasswordForm.reset();
            this.helpersService.toastrService.success(Messages.changedPasswordDescription, Messages.success);
          },
          error => {
            this.isSubmitting = false
            if (error.status === 422) {
              this.helpersService.showResponseErrorMessage(error, Messages.incorrectOldPassword);
            } else {
              this.helpersService.showResponseErrorMessage(error);
            }
          }
        );
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
