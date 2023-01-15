import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpersService } from '../../shared/services/helpers.service';
import { FormGroup } from '@angular/forms';
import { FormsService } from '../../shared/services/forms.service';
import { Messages, ValidationMessages } from '../../shared/constants/constants';
import { Subscription } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { Setting } from '../../shared/interfaces/header.response';
declare const FloatLabel: any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contactUsForm: FormGroup;
  title: string;
  readonly MESSAGES = ValidationMessages;
  isSubmitting = false;
  subscription: Subscription;
  private contactUsSubscription: Subscription;
  settings: Setting[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private helpersService: HelpersService,
    private formService: FormsService
  ) {}

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(true);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.contactUsForm = this.formService.buildContactUsForm();
    this.resolvePage();
    FloatLabel.init();
  }

  resolvePage() {
    this.contactUsSubscription = this.dataService
      .getSettings()
      .subscribe((settings) => {
        this.settings = settings;
        this.helpersService.scrollToTop();
      });
  }

  onSubmit() {
    if (this.contactUsForm.valid) {
      this.isSubmitting = true;
      this.subscription = this.helpersService.apiService
        .postContactUsForm(this.contactUsForm.value)
        .subscribe(
          (response) => {
            this.isSubmitting = false;
            this.contactUsForm.reset();
            this.helpersService.success(
              Messages.contactUsFormSubmitted,
              Messages.contactUsFormSubmittedTitle
            );
          },
          (error) => {
            this.isSubmitting = false;
            this.helpersService.showResponseErrorMessage(error);
          }
        );
    } else {
      this.contactUsForm.markAllAsTouched();
    }
  }

  getSettingValue = (key) => {
    const setting = this.settings && this.settings.find((x) => x.key === key);
    if (setting) {
      return setting.value;
    }
    return '';
  };
}
