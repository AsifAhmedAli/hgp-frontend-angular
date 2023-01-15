import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  Messages,
  PageTitles,
  LocalStorageConstants,
} from '../constants/constants';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from 'ng-connection-service';
import { Subscription } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { optionalString, pageCallback } from '../types/types';
import { ApiService } from './api.service';
import { PageData } from '../constants/data';
import { LocalStorage } from '../libs/localstorage';
import {
  cleanHttpHttps,
  exists,
  isEmpty,
  resolveErrorMessage,
  showValidationMessages,
  uniqueID,
} from '../functions/core.function';
import { LoginResponse } from '../interfaces/login-response';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { Option, OptionValue } from '../interfaces/products.response';
import { SelectedVariantModel } from '../models/selected-variant.model';
import { Blog } from '../interfaces/blog/blog.response';
import { environment } from '../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { User } from '../interfaces/user';
import { Product } from '../interfaces/products.model';
declare var $: any;
declare var CometChatWidget: any;

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  private isConnected = true;
  connectionSubscription: Subscription;
  user: User;
  constructor(
    public toastrService: ToastrService,
    public connectionService: ConnectionService,
    private title: Title,
    @Inject(PLATFORM_ID) private platformID: any,
    private meta: Meta,
    public apiService: ApiService,
    private router: Router,
    public localStorage: LocalStorage,
    public authService: AuthService,
    public dataService: DataService
  ) {
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }
    this.connectionSubscription = this.connectionService
      .monitor()
      .subscribe((isConnected) => {
        this.isConnected = isConnected;
        if (!this.isConnected) {
          this.showConnectionErrorMessage();
        } else {
          this.toastrService.success(
            Messages.internetConnectionBackDescription,
            Messages.internetConnectionBackTitle
          );
        }
      });
  }

  exists(data): boolean {
    return exists(data);
  }

  hideMobileMegaMenu() {
    if ($('#collapsibleNavbar').hasClass('show')) {
      $('#collapsibleNavbar').removeClass('show');
      $('#main-menu-btn').addClass('collapsed');
      $('#main-menu-btn').attr('aria-expanded', 'false');
    }
  }

  showResponseErrorMessage(
    error: any,
    title: any = null,
    form: FormGroup = null
  ): void {
    if (!exists(title)) {
      if (
        error.status === 400 ||
        error.status === 422 ||
        error.status === 420 ||
        error.status === 401
      ) {
        title = '';
      } else {
        title = error.statusText;
      }
    }
    if (error.status === 422) {
      showValidationMessages(form, error.error.errors);
    }
    if (error.status === '(failed)' || error.status === 0) {
      title = Messages.internetConnectionTitle;
    }
    if (error.status !== 404 && error.error.message !== null) {
      this.toastrService.error(resolveErrorMessage(error), title);
    }
  }

  showConnectionErrorMessage(): void {
    this.toastrService.warning(
      Messages.internetConnectionDescription,
      Messages.internetConnectionTitle
    );
  }

  getIsConnected(): boolean {
    return this.isConnected;
  }

  resolveTitle(activatedRoute: ActivatedRoute): string {
    const title = activatedRoute.snapshot.data.title;
    this.setTitle(title);
    return title;
  }

  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  validationErrorToastr(): void {
    this.error(Messages.validationErrorMessage, Messages.validationErrorTitle);
  }

  scrollToTop = (x = 0, y = 0) => {
    if (isPlatformBrowser(this.platformID)) {
      window.scrollTo(x, y);
    }
  };

  setProductMetaInfo(product: Product): void {
    this.removeMetaInfo();
    this.meta.addTag({ name: 'title', content: product.name });
    this.meta.addTag({ name: 'og:title', content: product.name });
    this.meta.addTag({ name: 'twitter:title', content: product.name });

    this.meta.addTag({ name: 'description', content: `View ${product.name}` });
    this.meta.addTag({
      name: 'og:description',
      content: `View ${product.name}`,
    });
    this.meta.addTag({
      name: 'twitter:description',
      content: `View ${product.name}`,
    });

    this.meta.addTag({ name: 'og:site_name', content: 'Home Grown Pros' });
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:site', content: 'Home Grown Pros' });

    this.meta.addTag({
      name: 'og:image',
      property: 'og:image',
      content: product.image.url,
    });
    this.meta.addTag({ name: 'twitter:image', content: product.image.url });
  }

  setBlogMetaInfo(blog: Blog): void {
    this.removeMetaInfo();
    this.meta.updateTag({ name: 'title', content: blog.name });
    this.meta.updateTag({
      name: 'og:title',
      content: blog.name,
      property: 'og:title',
    });
    this.meta.updateTag({ name: 'twitter:title', content: blog.name });

    this.meta.updateTag({ name: 'description', content: `View ${blog.name}` });
    this.meta.updateTag({
      name: 'og:description',
      content: `View ${blog.name}`,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: `View ${blog.name}`,
    });

    this.meta.updateTag({
      name: 'og:site_name',
      content: 'Empire Water Coolers',
    });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({
      name: 'twitter:site',
      content: 'Empire Water Coolers',
    });

    this.meta.updateTag({
      name: 'og:image',
      property: 'og:image',
      content: this.makeDefaultImagePath(blog.thumbnail_image),
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: this.makeDefaultImagePath(blog.thumbnail_image),
    });
  }

  makeDefaultImagePath(imageName: string) {
    return this.concatenate(environment.imageURL, imageName);
  }
  concatenate(...strings) {
    let concatenated = '';
    for (const text of strings) {
      concatenated += text;
    }
    return concatenated;
  }
  removeMetaInfo(): void {
    this.meta.removeTag('name=title');
    this.meta.removeTag('name=keywords');
    this.meta.removeTag('name=description');
    this.meta.removeTag('name="og:title"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('name="og:description"');
    this.meta.removeTag('name="twitter:description"');
    this.meta.removeTag('name="og:site_name"');
    this.meta.removeTag('name="twitter:site"');
    this.meta.removeTag('name="twitter:card"');
    this.meta.removeTag('name="og:type"');
    this.meta.removeTag('name="og:id"');
    this.meta.removeTag('name="og:url"');
    this.meta.removeTag('name="og:image"');
    this.meta.removeTag('name="twitter:image"');
    this.meta.removeTag('name="twitter:id"');
  }

  isInternalCTA(cta: string | null): any {
    if (isPlatformBrowser(this.platformID)) {
      if (cta) {
        let currentURL = window.location.origin;
        currentURL = cleanHttpHttps(currentURL);
        cta = cleanHttpHttps(cta);
        // @ts-ignore
        return cta.indexOf(currentURL) !== -1;
      } else {
        return false;
      }
    }
  }

  resolveCTA(cta: optionalString): any {
    if (isPlatformBrowser(this.platformID)) {
      if (this.isInternalCTA(cta)) {
        let currentURL = window.location.origin;
        currentURL = cleanHttpHttps(currentURL);
        cta = cleanHttpHttps(cta);
        // @ts-ignore
        return cta.replace(currentURL, '');
      } else {
        return cta;
      }
    }
  }

  success(message: string, tittle: string = ''): void {
    this.toastrService.success(message, tittle);
  }

  error(message: string, tittle: string = ''): void {
    this.toastrService.error(message, tittle);
  }

  warning(message: string, tittle: string = ''): void {
    this.toastrService.warning(message, tittle);
  }

  redirectTo404(): void {
    if (isPlatformBrowser(this.platformID)) {
      this.router.navigateByUrl('/404');
    }
  }

  resolvePage(slug: optionalString, callback: pageCallback): void {
    const content = PageData[slug];
    if (content) {
      callback(content.title, content.content, null);
    } else {
      callback(null, null, PageTitles.notFound);
    }
  }

  resolveCMSPage(slug: string): void {
    if (this.isConnected) {
      this.apiService.getPage(slug).subscribe(
        (response) => {
          this.dataService.setStaticPage(response.result);
        },
        (error) => {
          this.showResponseErrorMessage(error);
          this.redirectTo404();
        }
      );
    } else {
      this.showConnectionErrorMessage();
    }
  }

  resolveSessionID(): any {
    if (isPlatformBrowser(this.platformID)) {
      const session = this.localStorage.getObject(
        LocalStorageConstants.SESSION_ID
      );
      if (isEmpty(session)) {
        const sessionId = uniqueID(20);
        this.localStorage.setObject(
          LocalStorageConstants.SESSION_ID,
          sessionId
        );
        return sessionId;
      }
      return session;
    }
  }

  afterLogin = (response: LoginResponse) => {
    this.authService.setToken(response.result.access_token);
    this.authService.setIsAuthenticated(true);
    this.dataService.setUser(response.result.user);
    this.dataService.setCart(response.cart);
    this.localStorage.setObject('user', response.result.user);
    // this.loadChatWidget();
    if (exists(response.sessionID) && isPlatformBrowser(this.platformID)) {
      this.localStorage.setObject(
        LocalStorageConstants.SESSION_ID,
        response.sessionID
      );
    }
  };

  reloadUser(callback: (user: User) => void): void {
    this.authService.user().subscribe((response) => {
      this.user = response.result;
      this.dataService.setUser(this.user);
      callback(this.user);
    });
  }

  resolveDropdownOrRadioVariantChange(
    option: Option,
    selectedValue: string
  ): void {
    const value: OptionValue = option.values.find(
      (optionValue) => optionValue.id.toString() === selectedValue.toString()
    );
    const optionAndValue = new SelectedVariantModel(option, value, option.type);
    const selectedVariants = this.dataService.selectedVariants.value;
    const newlySelectedVariants = selectedVariants.filter(
      (selectedVar) => selectedVar.option.id !== option.id
    );
    if (value) {
      newlySelectedVariants.push(optionAndValue);
    }
    this.dataService.setSelectedVariants(newlySelectedVariants);
  }

  resetCart(error: any): void {
    if (error.status === 422 && !this.exists(error.cart)) {
      this.dataService.clearCart();
    }
  }

  showOutOfStockMessages(error: any): boolean {
    if (error.status === 420) {
      this.error(
        error.error.messages.toString() +
          (error.error.messages.length > 1 ? ' are ' : ' is ') +
          ' out of stock'
      );
      return false;
    }
    return true;
  }

  setPageMetaInfo(title: string, keywords: string, description: string): void {
    this.removeMetaInfo();
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'og:title', content: title });
    this.meta.updateTag({ name: 'twitter:title', content: title });

    this.meta.updateTag({
      name: 'description',
      content: `View ${description}`,
    });
    this.meta.updateTag({
      name: 'og:description',
      content: `View ${description}`,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: `View ${description}`,
    });

    this.meta.updateTag({
      name: 'og:site_name',
      content: environment.provider,
    });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({
      name: 'twitter:site',
      content: environment.provider,
    });
  }

  loadChatWidget(): void {
    const sessionID = this.localStorage.getObject('sessionID');
    if (!sessionID) {
      return;
    }

    CometChatWidget.init({
      appID: environment.chat.appId,
      appRegion: environment.chat.appRegion,
      authKey: environment.chat.authKey,
    }).then(
      (response) => {
        console.log('Initialization completed successfully');
        // You can now call login function.
        CometChatWidget.login({
          uid: sessionID,
        }).then(
          (response) => {
            CometChatWidget.launch({
              widgetID: 'bc4d07e6-9387-4084-933b-732d67abb42d',
              docked: 'true',
              alignment: 'right', // left or right
              roundedCorners: 'true',
              height: '450px',
              width: '400px',
              defaultID: 'superhero1', // default UID (user) or GUID (group) to show,
              defaultType: 'user', // user or group
            });
          },
          (error) => {
            console.log('User login failed with error:', error);
            // Check the reason for error and take appropriate action.
            if (error.code === 'ERR_UID_NOT_FOUND') {
              this.apiService
                .registerChatUser(sessionID)
                .subscribe((resposne) => {
                  // this.loadChatWidget();
                });
            }
          }
        );
      },
      (error) => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take appropriate action.
      }
    );
  }

  logoutChatWidget(): void {
    CometChatWidget.logout();
  }
  showSearchField(): void {
    const search = document.getElementById('searchField');
    search.style.top = '110px';
  }
}
