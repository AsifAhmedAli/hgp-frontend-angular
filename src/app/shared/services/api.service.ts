import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../functions/core.function';
import { SettingResponse } from '../interfaces/header.response';
import { Product } from '../interfaces/products.response';
import {
  ProductDetailResponse,
  ProductsResponse,
} from '../interfaces/products.model';
import { GeneralResponse } from '../interfaces/general-response';
import {
  AboutUsResponse,
  BrandPageResponse,
  DocumentPageResponse,
  StaticPageResponse,
} from '../interfaces/pages/static-page.response';
import {
  BlogDetailResponse,
  BlogResponse,
} from '../interfaces/blog/blog.response';
import { CartResponse } from '../interfaces/cart.interface';
import { AttachPaypalNonceRequest } from '../models/attach-paypal-nonce-request';
import { AttachPaymentNonceRequest } from '../models/attach-payment-nonce-request';
import { ServiceCenterResponse } from '../interfaces/service-center.response';
import { HomePageResponse } from '../models/Homepage.model';
import { FaqResponse } from '../interfaces/faq';
import { environment } from '../../../environments/environment';
import { HowItWorkResponse } from '../interfaces/how-it-work';
import { User } from '../interfaces/user';
import { makeUsername } from '../functions/project.function';
import { StateModel } from '../models/state.model';
import { KitCompareResponse, KitResponse } from '../interfaces/kit.interface';
import { KitProducts } from '../interfaces/kits.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  getLegalStates(): Observable<{ states: Array<StateModel> }> {
    return this.httpClient.get<{ states: Array<StateModel> }>(
      apiUrl('states/legal')
    );
  }
  searchFaqs(searchTerm: any, categorySlug: any): Observable<FaqResponse> {
    const formData = {
      searchTerm,
      categorySlug,
      projectType: environment.provider,
    };
    const headers = this.ignoreProgressBar();
    return this.httpClient.post<FaqResponse>(apiUrl(`faqs/search`), formData, {
      headers,
    });
  }
  searchFaqsFromHowItWork(searchTerm: string): Observable<FaqResponse> {
    const headers = this.ignoreProgressBar();
    return this.httpClient.post<FaqResponse>(
      apiUrl(`page/faqs-search-from-how-it-work`),
      {
        searchTerm,
      },
      {
        headers,
      }
    );
  }

  getFAQsByCategory(categorySlug: any): Observable<FaqResponse> {
    return this.httpClient.get<FaqResponse>(
      apiUrl(`faqs/by-category/${categorySlug}/${environment.provider}`)
    );
  }

  getFAQS(): Observable<FaqResponse> {
    return this.httpClient.get<FaqResponse>(
      apiUrl(`faqs/${environment.provider}`)
    );
  }

  ignoreProgressBar() {
    return new HttpHeaders({ ignoreProgressBar: '' });
  }

  getBlogDetail(slug: string): Observable<BlogDetailResponse> {
    return this.httpClient.get<BlogDetailResponse>(apiUrl(`blog/${slug}/show`));
  }

  getBlog(queryParams): Observable<BlogResponse> {
    return this.httpClient.get<BlogResponse>(apiUrl('blog/get'), {
      params: {
        ...queryParams,
      },
    });
  }

  getPage(slug: string): Observable<StaticPageResponse> {
    return this.httpClient.get<StaticPageResponse>(apiUrl(`page/${slug}/get`));
  }
  getAboutUsPage(): Observable<AboutUsResponse> {
    return this.httpClient.get<AboutUsResponse>(apiUrl(`page/about-us`));
  }

  getHowItWork(): Observable<HowItWorkResponse> {
    return this.httpClient.get<HowItWorkResponse>(apiUrl(`page/how-it-work`));
  }
  getDocuments(queryParams): Observable<DocumentPageResponse> {
    const headers = new HttpHeaders({ ignoreProgressBar: '' });
    return this.httpClient.get<DocumentPageResponse>(apiUrl(`documents`), {
      params: {
        ...queryParams,
      },
      headers,
    });
  }

  getBrands(queryParams): Observable<BrandPageResponse> {
    const headers = new HttpHeaders({ ignoreProgressBar: '' });
    return this.httpClient.get<BrandPageResponse>(apiUrl(`brands`), {
      params: {
        ...queryParams,
      },
      headers,
    });
  }

  postBlogComment(formValues: any, blogId: any): Observable<GeneralResponse> {
    const params = new HttpParams().set('blog_id', blogId);
    return this.httpClient.post<GeneralResponse>(
      apiUrl('blog/comment'),
      formValues,
      { params }
    );
  }
  postContactUsForm(formValues: any): Observable<GeneralResponse> {
    return this.httpClient.post<GeneralResponse>(
      apiUrl('contact-us'),
      formValues
    );
  }
  postGiveUsForm(formValues: any): Observable<GeneralResponse> {
    return this.httpClient.post<GeneralResponse>(
      apiUrl('giveawayAPI'),
      formValues
    );
  }
  mailchimpSubscription(FormData: any): Observable<GeneralResponse> {
    const headers = new HttpHeaders({ ignoreProgressBar: '' });
    return this.httpClient.post<GeneralResponse>(
      apiUrl('mailchimp/subscribe'),
      FormData,
      { headers }
    );
  }
  loadHeader(sessionID: string): Observable<SettingResponse> {
    return this.httpClient.get<SettingResponse>(apiUrl('settings/get'), {
      params: { sessionID },
    });
  }

  getProducts(queryParams): Observable<ProductsResponse> {
    const headers = new HttpHeaders({ ignoreProgressBar: '' });
    return this.httpClient.get<ProductsResponse>(apiUrl(`products/get`), {
      params: queryParams,
      headers,
    });
  }

  getCategories(queryParams): Observable<ProductsResponse> {
    const headers = new HttpHeaders({ ignoreProgressBar: '' });
    return this.httpClient.get<ProductsResponse>(
      apiUrl(`products/getCategories`),
      {
        params: queryParams,
        headers,
      }
    );
  }

  getProduct(sku: string): Observable<ProductDetailResponse> {
    const headers = new HttpHeaders({ ignoreProgressBar: '' });
    return this.httpClient.get<ProductDetailResponse>(
      apiUrl(`products/${sku}/get`),
      {
        headers,
      }
    );
  }
  getKit(kitId): Observable<any> {
    return this.httpClient.get(apiUrl(`kits/detail/${kitId}`));
  }
  getKitSize(name, size): Observable<any> {
    return this.httpClient.get(apiUrl(`kits/detail/${name}/${size}`));
  }
  allKits(): Observable<KitResponse> {
    return this.httpClient.get<KitResponse>(apiUrl(`kits/all`));
  }
  kitCompare(): Observable<KitCompareResponse> {
    return this.httpClient.get<KitCompareResponse>(apiUrl(`kits/compare`));
  }
  getKitProducts(cartId, kitId): Observable<KitProducts> {
    return this.httpClient.get<KitProducts>(
      apiUrl(`kits/products/${cartId}/${kitId}`)
    );
  }
  getVariantPrice(product: Product, params: HttpParams): Observable<any> {
    return this.httpClient.post(apiUrl(`products/${product.id}/price`), params);
  }
  forgotPassword(formData: object): Observable<any> {
    return this.httpClient.post(apiUrl(`forgot_password`), formData);
  }
  checkResetPasswordLink(code): Observable<any> {
    return this.httpClient.get(apiUrl(`password/reset/validate-code/${code}`));
  }
  postRequest(url: string, formData: object): Observable<any> {
    return this.httpClient.post(url, formData);
  }
  addToCart(sessionID: string, params: HttpParams): Observable<CartResponse> {
    return this.httpClient.post<CartResponse>(
      apiUrl(`cart/${sessionID}/add`),
      params
    );
  }
  removeCartProduct(
    sessionID: string,
    cartProductID: number
  ): Observable<CartResponse> {
    return this.httpClient.post<CartResponse>(
      apiUrl(`cart/${sessionID}/remove`),
      { cartProductID }
    );
  }
  updateCartProductQty(
    sessionID: string,
    quantity: number,
    cartProductID: number
  ): Observable<CartResponse> {
    return this.httpClient.post<CartResponse>(
      apiUrl(`cart/${sessionID}/quantity/update`),
      { quantity, cartProductID }
    );
  }
  applyCoupon(sessionID: string, coupon: string): Observable<CartResponse> {
    return this.httpClient.post<CartResponse>(
      apiUrl(`cart/${sessionID}/coupon/apply`),
      { coupon }
    );
  }
  removeCoupon(sessionID: string): Observable<CartResponse> {
    return this.httpClient.post<CartResponse>(
      apiUrl(`cart/${sessionID}/coupon/remove`),
      {}
    );
  }
  updateBillingShipping(
    sessionID: string,
    formData: any
  ): Observable<CartResponse> {
    return this.httpClient.post<CartResponse>(
      apiUrl(`cart/${sessionID}/shipping-billing/update`),
      formData
    );
  }
  getHomepage(): Observable<HomePageResponse> {
    return this.httpClient.get<HomePageResponse>(apiUrl(`homepage`));
  }
  attachNonceWithCart(
    payload: any,
    cardHolderName: string,
    sessionID: string
  ): Observable<CartResponse> {
    const request = this.resolveNonceRequest(
      sessionID,
      cardHolderName,
      payload
    );
    return this.httpClient.post<CartResponse>(
      apiUrl(`cart/${sessionID}/payment-nonce/add`),
      request
    );
  }
  placeOrder(sessionID: string, order: any, paypalData: any): Observable<any> {
    return this.httpClient.post<any>(apiUrl(`order/${sessionID}/place`), {
      paypalData,
      order,
    });
  }
  private resolveNonceRequest = (sessionID, cardHolderName, payload) => {
    let request: any;
    if (payload.type === 'PayPalAccount') {
      request = new AttachPaypalNonceRequest(
        payload.nonce,
        payload.details.firstName,
        payload.details.lastName,
        payload.details.payerId,
        payload.details.countryCode,
        payload.type
      );
    } else if (payload.type === 'SavedCard') {
      request = {
        type: payload.type,
        paymentToken: payload.other.token,
      };
    } else {
      request = new AttachPaymentNonceRequest(
        payload.nonce,
        cardHolderName,
        payload.details.expirationMonth,
        payload.details.expirationYear,
        payload.details.bin,
        payload.details.cardType,
        payload.type,
        payload.details.lastFour,
        payload.details.lastTwo,
        payload.description
      );
    }
    return request;
  };
  getServiceCenterPage(): Observable<ServiceCenterResponse> {
    return this.httpClient.get<ServiceCenterResponse>(
      apiUrl('service-center/get')
    );
  }
  submitServiceCenterForm(formData: any): Observable<GeneralResponse> {
    return this.httpClient.post<GeneralResponse>(
      apiUrl('service-center/submit'),
      formData
    );
  }

  registerChatUser(sessionID): Observable<any> {
    const headers = new HttpHeaders({
      apiKey: environment.chat.authKey,
      appid: environment.chat.appId,
    });
    /*  headers.set('apikey', environment.chat.authKey);
    headers.set('appid', environment.chat.appId);*/
    return this.httpClient.post(
      'https://api-us.cometchat.io/v2.0/users',
      {
        uid: sessionID,
        name: makeUsername(6),
      },
      { headers }
    );
  }

  accountVerify(formData: any): Observable<any> {
    return this.httpClient.post<any>(apiUrl('account/verify'), formData);
  }
}
