import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SharedModule } from '../shared/shared.module';
import { HomepageComponent } from './homepage/homepage.component';
import { FaqComponent } from './faq/faq.component';
import { ManualsComponent } from './manuals/manuals.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgSelect2Module } from 'ng-select2';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { ServiceCenterComponent } from './service-center/service-center.component';
// import {NgxStarsModule} from 'ngx-stars';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { NgxMaskModule } from 'ngx-mask';
import { FaqItemComponent } from './faq/faq-item/faq-item.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { CompareComponent } from './compare/compare.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    AboutUsComponent,
    HomepageComponent,
    FaqComponent,
    ManualsComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ContactUsComponent,
    RegisterLoginComponent,
    ManufacturersComponent,
    SearchDetailsComponent,
    ServiceCenterComponent,
    HowItWorkComponent,
    FaqItemComponent,
    AccountVerificationComponent,
    CompareComponent,
  ],
  exports: [NotFoundComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelect2Module,
    SlickCarouselModule,
    // NgxStarsModule,
    NgxMaskModule,
  ],
})
export class PagesModule {}
