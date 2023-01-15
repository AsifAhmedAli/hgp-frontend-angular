import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { FormGroup } from '@angular/forms';
import { Messages, ValidationMessages } from '../../shared/constants/constants';
import { FormsService } from '../../shared/services/forms.service';
import { HelpersService } from '../../shared/services/helpers.service';
import { ApiService } from '../../shared/services/api.service';
import { Page, Setting } from '../../shared/interfaces/header.response';

declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  showFooter = false;
  showFooterSubscription: Subscription;
  subscribeForm: FormGroup;
  readonly MESSAGES = ValidationMessages;
  subscription: Subscription;
  isSubmitting = false;
  private footerSettingsSubscription: Subscription;
  settings: Setting[];
  private pagesSettingsSubscription: Subscription;
  private showHeaderSubscription: Subscription;
  termsAndConditionPage: Page;
  privacyPage: Page;
  shippingInfoPage: Page;

  constructor(
    private formService: FormsService,
    private helpersService: HelpersService,
    private apiService: ApiService,
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.resolveFooter();
    this.resolvePages();
    this.subscribeForm = this.formService.buildSubscribeForm();
    this.showFooterSubscription = this.dataService
      .getShowFooter()
      .subscribe((show) => {
        this.showFooter = show;
        this.changeDetectorRef.detectChanges();
      });
  }

  resolveFooter(): void {
    this.footerSettingsSubscription = this.dataService
      .getSettings()
      .subscribe((settings) => {
        this.settings = settings;
        this.helpersService.scrollToTop();
      });
  }

  getSettingValue = (key) => {
    if (key) {
      const setting = this.settings && this.settings.find((x) => x.key === key);
      if (setting) {
        return setting.value;
      }
    }
    return null;
  };

  resolvePages(): void {
    /*this.pagesSettingsSubscription = this.dataService.getCMSPages().subscribe(
        (pages) => {
          if (pages) {
            pages.find(x => {
              console.log(x.slug)
              if (x.slug === 'terms-and-conditions') {
                this.termsAndConditionPage = x;
              } else if (x.slug === 'privacy-policy') {
                this.privacyPage = x;
              } else if (x.slug === 'shipping-info') {
                this.shippingInfoPage = x;
              } else if (x.slug === 'returns') {
                this.shippingInfoPage = x;
              }
            });
          }
        }
    );*/
  }

  onSubmit(): void {
    if (this.subscribeForm.valid) {
      this.isSubmitting = true;
      this.subscription = this.apiService
        .mailchimpSubscription(this.subscribeForm.value)
        .subscribe(
          (response) => {
            this.isSubmitting = false;
            this.subscribeForm.reset();
            if (response.message === 'Already Subscribed.') {
              this.helpersService.success(response.message);
            } else {
              this.helpersService.success(response.message, Messages.thankYou);
            }
          },
          (error) => {
            this.isSubmitting = false;
            this.helpersService.showResponseErrorMessage(error);
          }
        );
    } else {
      this.subscribeForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    if (this.showFooterSubscription) {
      this.showFooterSubscription.unsubscribe();
    }
  }
}
