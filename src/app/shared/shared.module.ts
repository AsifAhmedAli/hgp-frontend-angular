import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, TitleCasePipe} from '@angular/common';
import {SingularPluralPipe} from './pipes/singular-plural.pipe';
import {ShortStringPipe} from './pipes/short-string.pipe';
import {ImageUrlPipe} from './pipes/image-url.pipe';
import {ExcerptPipe} from './pipes/excerpt.pipe';
import {LocalStorage} from './libs/localstorage';
import {BackgroundImageDirective} from './directives/background-image.directive';
import {DateDirective} from './directives/date.directive';
import {FirstOptionDirective} from './directives/first-option.directive';
import {HideBrokerImageDirective} from './directives/hide-broker-image.directive';
import {OtherOptionDirective} from './directives/other-option.directive';
import {CartRightSidebarComponent} from './components/cart-right-sidebar/cart-right-sidebar.component';
import {ClearfixComponent} from './components/clearfix/clearfix.component';
import {HttpClientModule} from '@angular/common/http';
import {SanitizerPipe} from './pipes/sanitizer.pipe';
import {RouterModule} from '@angular/router';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {SubmitButtonComponent} from './components/submit-button/submit-button.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {BlogPaginationComponent} from './components/blog-pagination/blog-pagination.component';
import {LoaderComponent} from './components/loader/loader.component';
import {ProductItemComponent} from './components/product-item/product-item.component';
// import {NgxStarsModule} from 'ngx-stars';
import {ProductOptionComponent} from './components/product-option/product-option.component';
import {ProductOptionDropdownComponent} from './components/product-option/product-option-dropdown/product-option-dropdown.component';
import {ProductOptionCheckboxComponent} from './components/product-option/product-option-checkbox/product-option-checkbox.component';
import {ProductOptionRadioComponent} from './components/product-option/product-option-radio/product-option-radio.component';
import {CustomBreadcrumbComponent} from './components/custom-breadcrumb/custom-breadcrumb.component';
import {UserPanelSubmitButtonComponent} from './components/user-panel-submit-button/user-panel-submit-button.component';
import {AddToCartDirective} from './directives/add-to-cart.directive';
import {PaginationComponent} from './components/pagination/pagination.component';
import {LogoutDirective} from './directives/logout.directive';
import {DecreaseQuantityDirective} from './directives/decrease-quantity.directive';
import {RemoveCartProductDirective} from './directives/remove-cart-product.directive';
import {SidebarDirective} from './directives/sidebar.directive';
import {CartRightSidebarItemComponent} from './components/cart-right-sidebar/cart-right-sidebar-item/cart-right-sidebar-item.component';
import {AddProductToFavoriteComponent} from './components/add-product-to-favorite/add-product-to-favorite.component';
import {CartItemVariantsComponent} from './components/cart-item-variants/cart-item-variants.component';
import {MapSavedAddressToSelect2Pipe} from './pipes/map-saved-address-to-select2.pipe';
import {MapStateToSelect2Pipe} from './pipes/map-state-to-select2.pipe';
import {OrderProductItemComponent} from './components/order-product-item/order-product-item.component';
import {OrderBillingShippingDetailComponent} from './components/order-billing-shipping-detail/order-billing-shipping-detail.component';
import {OrderBillShipDetailItemComponent} from './components/order-billing-shipping-detail/order-bill-ship-detail-item/order-bill-ship-detail-item.component';
import {OrderShippingDetailComponent} from './components/order-billing-shipping-detail/order-shipping-detail/order-shipping-detail.component';
import {OrderBillingDetailComponent} from './components/order-billing-shipping-detail/order-billing-detail/order-billing-detail.component';
import {OrderPaymentDetailComponent} from './components/order-payment-detail/order-payment-detail.component';
import {MyDatePipe} from './pipes/my-date.pipe';
import {DashboardPaginationComponent} from './components/dashboard-pagination/dashboard-pagination.component';
import {SortIconComponent} from './components/sort-icon/sort-icon.component';
import {MapCardToSelect2Pipe} from './pipes/map-card-to-select2.pipe';
import {SanitizerURLPipe} from './pipes/sanitizer-url.pipe';
import {DataNotFoundComponent} from './components/data-not-found/data-not-found.component';
import {MegaMenuComponent} from './components/mega-menu/mega-menu.component';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {TrimSpaceDirective} from './directives/trim-space.directive';
import {BlogItemComponent} from './components/blog-item/blog-item.component';
import {ImageNotFoundDirective} from './directives/image-not-found.directive';
import {TeamComponent} from './components/team/team.component';
import { ExcerptWithoutDotsPipe } from './pipes/excerpt-without-dots.pipe';
import { BreadcrumbPipe } from './pipes/breadcrumb.pipe';
import {DataService} from "./services/data.service";
import { LogoComponent } from './components/logo/logo.component';
import {SlickCarouselModule} from "ngx-slick-carousel";
import {VideosComponent} from './components/videos/videos.component';
@NgModule({
  declarations: [
    SingularPluralPipe,
    ShortStringPipe,
    ImageUrlPipe,
    ExcerptPipe,
    BackgroundImageDirective,
    DateDirective,
    FirstOptionDirective,
    HideBrokerImageDirective,
    OtherOptionDirective,
    CartRightSidebarComponent,
    ClearfixComponent,
    SanitizerPipe,
    BreadcrumbComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SubmitButtonComponent,
    SpinnerComponent,
    BlogPaginationComponent,
    LoaderComponent,
    ProductItemComponent,
    ProductOptionComponent,
    ProductOptionDropdownComponent,
    ProductOptionCheckboxComponent,
    ProductOptionRadioComponent,
    CustomBreadcrumbComponent,
    UserPanelSubmitButtonComponent,
    AddToCartDirective,
    PaginationComponent,
    LogoutDirective,
    DecreaseQuantityDirective,
    RemoveCartProductDirective,
    SidebarDirective,
    CartRightSidebarItemComponent,
    AddProductToFavoriteComponent,
    CartItemVariantsComponent,
    MapSavedAddressToSelect2Pipe,
    MapStateToSelect2Pipe,
    OrderProductItemComponent,
    OrderBillingShippingDetailComponent,
    OrderBillShipDetailItemComponent,
    OrderShippingDetailComponent,
    OrderBillingDetailComponent,
    OrderPaymentDetailComponent,
    MyDatePipe,
    DashboardPaginationComponent,
    SortIconComponent,
    MapCardToSelect2Pipe,
    SanitizerURLPipe,
    DataNotFoundComponent,
    MegaMenuComponent,
    TrimSpaceDirective,
    BlogItemComponent,
    ImageNotFoundDirective,
    TeamComponent,
    VideosComponent,
    ExcerptWithoutDotsPipe,
    BreadcrumbPipe,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxStarsModule,
    NgxMaskModule.forRoot(),
    SlickCarouselModule
  ],
    exports: [
        SingularPluralPipe,
        ShortStringPipe,
        ImageUrlPipe,
        ExcerptPipe,
        BackgroundImageDirective,
        DateDirective,
        FirstOptionDirective,
        HideBrokerImageDirective,
        OtherOptionDirective,
        CartRightSidebarComponent,
        ClearfixComponent,
        SanitizerPipe,
        BreadcrumbComponent,
        LoginFormComponent,
        RegisterFormComponent,
        SubmitButtonComponent,
        SpinnerComponent,
        BlogPaginationComponent,
        LoaderComponent,
        ProductItemComponent,
        ProductOptionComponent,
        CustomBreadcrumbComponent,
        UserPanelSubmitButtonComponent,
        AddToCartDirective,
        PaginationComponent,
        LogoutDirective,
        SidebarDirective,
        RemoveCartProductDirective,
        CartItemVariantsComponent,
        AddProductToFavoriteComponent,
        MapSavedAddressToSelect2Pipe,
        MapStateToSelect2Pipe,
        OrderProductItemComponent,
        OrderBillingShippingDetailComponent,
        OrderPaymentDetailComponent,
        MyDatePipe,
        DashboardPaginationComponent,
        SortIconComponent,
        MapCardToSelect2Pipe,
        SanitizerURLPipe,
        DataNotFoundComponent,
        MegaMenuComponent,
        TrimSpaceDirective,
        BlogItemComponent,
        ImageNotFoundDirective,
        TeamComponent,
        VideosComponent,
        ExcerptWithoutDotsPipe,
      LogoComponent
    ],
  providers: [
    LocalStorage,
    TitleCasePipe,
    DatePipe,
      BreadcrumbPipe
  ]
})
export class SharedModule {
}
