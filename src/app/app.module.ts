import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GiveAwayComponent } from './give-away/give-away.component';
import { FooterComponent } from './includes/footer/footer.component';
import { CartIconComponent } from './includes/header/cart-icon/cart-icon.component';
import { HeaderComponent } from './includes/header/header.component';
import { NavBarComponent } from './includes/header/nav-bar/nav-bar.component';
import { SearchBarComponent } from './includes/header/search-bar/search-bar.component';
import { LayoutComponent } from './layout/layout.component';
import { MiddlewareInterceptor } from './shared/interceptors/middleware.interceptor';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    NavBarComponent,
    CartIconComponent,
    GiveAwayComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      closeButton: true,
      progressBar: true,
      timeOut: 6000,
      extendedTimeOut: 4000,
      preventDuplicates: true,
    }),
    RouterModule,
    NgProgressHttpModule,
    NgProgressModule.withConfig({
      color: '#1a3e7d',
      thick: false,
      spinner: false,
      min: 50,
    }),
    SharedModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MiddlewareInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
