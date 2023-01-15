import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageTitles } from '../shared/constants/constants';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FaqComponent } from './faq/faq.component';
import { ManualsComponent } from './manuals/manuals.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { GuestGuard } from '../shared/guards/guest.guard';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { HomepageResolverService } from '../shared/resolver/homepage-resolver.service';
import { ServiceCenterComponent } from './service-center/service-center.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { CompareComponent } from './compare/compare.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    data: {
      title: PageTitles.homepage,
    },
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: {
      title: PageTitles.notFound,
    },
  },
  {
    path: 'how-it-works',
    component: HowItWorkComponent,
    data: {
      title: PageTitles.howItWorks,
    },
  },

  {
    path: 'faqs',
    component: FaqComponent,
    data: {
      title: PageTitles.faq,
    },
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: {
      title: PageTitles.aboutUs,
    },
  },

  {
    path: 'manuals',
    component: ManualsComponent,
    data: {
      title: PageTitles.manuals,
    },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: PageTitles.forgotPassword,
    },
    canActivate: [GuestGuard],
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    data: {
      title: PageTitles.resetPassword,
    },
    // canActivate: [GuestGuard]
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    data: {
      title: PageTitles.contactUs,
    },
  },
  {
    path: 'register',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: RegisterLoginComponent,
    data: {
      title: PageTitles.registerLogin,
    },
    canActivate: [GuestGuard],
  },
  {
    path: 'manufacturers',
    component: ManufacturersComponent,
    data: {
      title: PageTitles.manufacturers,
    },
  },
  {
    path: 'search-details',
    component: SearchDetailsComponent,
    data: {
      title: PageTitles.searchDetails,
    },
  },
  {
    path: 'service-center',
    component: ServiceCenterComponent,
    data: {
      title: PageTitles.serviceCenter,
    },
  },
  {
    path: 'account/verify',
    component: AccountVerificationComponent,
    data: {
      title: PageTitles.accountVerify,
    },
  },
  {
    path: 'compare',
    component: CompareComponent,
    data: {
      title: PageTitles.compare,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
