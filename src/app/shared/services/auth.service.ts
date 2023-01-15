import {Injectable} from '@angular/core';


import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {GeneralResponse} from '../interfaces/general-response';
import {BehaviorSubject, Observable} from 'rxjs';
import {apiUrl, auth, isEmpty} from '../functions/core.function';
import {LoginResponse} from '../interfaces/login-response';
import {LocalStorage} from '../libs/localstorage';
import {Params, Router} from '@angular/router';
import {UserResponse} from '../interfaces/user';
import {AddressBooksResponse, SingleAddressBooksResponse} from '../interfaces/address-books/address-books.response';

import {GetBrainTreeTokenResponse, SavedPaymentMethodsResponse} from '../interfaces/user-payment/saved-payment-methods.response';

import {WishlistResponse} from '../interfaces/wishlist/Wishlist';
import {ProductResponse} from '../interfaces/products.response';
import {MyOrderResponse, MyOrdersResponse} from '../interfaces/my-orders.response';
import {ProductDetailResponse} from '../interfaces/products.model';

declare var require: any;
const qs = require('qs');


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorage,
    private router: Router,
  ) {
  }


  addProductReview(productId, review, rating): Observable<any> {
    const formData = {
      hydro_product_id: productId,
      review,
      rating,
    };
    return this.httpClient.post<any>(auth('review'), formData);
  }
  addKitReview(kitId, comment, rating, image): Observable<any> {
    const formData = {
      kit_id: kitId,
      comment,
      rating,
      image
    };
    return this.httpClient.post<any>(auth('kits/review/add'), formData);
  }
  addFavoriteProduct = (id: number): Observable<ProductDetailResponse> =>
    this.httpClient.post<ProductDetailResponse>(auth(`wishlist/${id}/add`), {})

  removeFavoriteProduct = (id: number): Observable<ProductDetailResponse> =>
    this.httpClient.post<ProductDetailResponse>(auth(`wishlist/${id}/delete`), {})

  getBrainTreeToken(): Observable<GetBrainTreeTokenResponse> {
    return this.httpClient.post<GetBrainTreeTokenResponse>(
      auth('payment-method/token/get'),
      {
        token: this.getToken(),
      }
    );
  }

  savePaymentMethod = (payload: any): Observable<GeneralResponse> =>
    this.httpClient.post<GeneralResponse>(auth('payment-method/add'), {nonce: payload.nonce})

  fetchPaymentMethods = (): Observable<SavedPaymentMethodsResponse> =>
    this.httpClient.post<SavedPaymentMethodsResponse>(auth('payment-method/get'), {})

  deletePaymentMethod = (token: string): Observable<SavedPaymentMethodsResponse> =>
    this.httpClient.post<SavedPaymentMethodsResponse>(auth('payment-method/delete'), {paymentMethodToken: token})

  makeDefaultPaymentMethod = (token: string): Observable<SavedPaymentMethodsResponse> =>
    this.httpClient.post<SavedPaymentMethodsResponse>(auth('payment-method/makeDefault'), {paymentMethodToken: token})

  exists(data): boolean {
    return data !== undefined && data !== null && data !== '';
  }

  user(): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(auth('user/get'));
  }

  // tslint:disable-next-line:ban-types
  updateUser(formData: Object, id): Observable<any> {
    return this.httpClient.put<any>(auth(`update_profile/${id}`), formData);
  }

  changePassword(formValues: any): Observable<GeneralResponse> {
    return this.httpClient.put<GeneralResponse>(auth('change_password'), formValues);
  }

  validateUserEmail(email, userID): Observable<GeneralResponse> {
    const headers = new HttpHeaders({ignoreProgressBar: ''});
    return this.httpClient.post<GeneralResponse>(apiUrl('user/check_email'), {email, userID}, {headers});
  }

  verifyShipping(sessionId, state): Observable<any> {
    const headers = new HttpHeaders({ignoreProgressBar: ''});
    const url = apiUrl('cart/' + sessionId + '/' + state + '/verify/shipping');
    return this.httpClient.get<any>(url, {headers});
  }

  createAccount(formValues): Observable<GeneralResponse> {
    return this.httpClient.post<GeneralResponse>(apiUrl('register'), formValues);
  }

  csrf(): void {
    this.httpClient.get(environment.baseURL + 'sanctum/csrf-cookie').subscribe();
  }

  login(formData: any): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(auth('login'), formData);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !isEmpty(token);
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  setIsAuthenticated(value): void {
    this.isAuthenticatedSubject.next(value);
  }

  setToken(token): void {
    this.localStorage.setObject('access_token', token);
  }

  getToken(): string {
    return this.localStorage.getObject('access_token');
  }

  removeToken(): void {
    this.localStorage.remove('access_token');
  }

  test(): void {
    this.httpClient.get(auth('test')).subscribe();
  }

  logout(): void {
    this.removeToken();
    this.setIsAuthenticated(false);
    this.router.navigate(['/login']);
    // call api to logout if needed
  }

  getAddressBooks(): Observable<AddressBooksResponse> {
    return this.httpClient.get<AddressBooksResponse>(auth('address/all'));
  }

  getMyAddressBooks(type: string = 'default'): Observable<AddressBooksResponse> {
    return this.httpClient.post<AddressBooksResponse>(auth('address/get'), {type});
  }

  addressBookById(id: number): Observable<SingleAddressBooksResponse> {
    return this.httpClient.get<SingleAddressBooksResponse>(auth(`address/${id}/get`));
  }

  updateAddressBook(formData: object, id: number): Observable<any> {
    return this.httpClient.put<any>(auth(`address/${id}/update`), formData);
  }

  addAddressBook(formData: object): Observable<any> {
    return this.httpClient.post<any>(auth(`address/add`), formData);
  }

  deleteAddress(id: number): Observable<any> {
    return this.httpClient.delete<any>(auth(`address/${id}/delete`));
  }

  myWishlist(query: any): Observable<WishlistResponse> {
    return this.httpClient.get<WishlistResponse>(auth(`wishlist/all?${qs.stringify(query)}`));
  }

  delteProductFromWishlist(productId: number): Observable<any> {
    return this.httpClient.post<any>(auth(`wishlist/${productId}/delete`), {});

  }
  getMyOrders = (params: Params): Observable<MyOrdersResponse> =>
    this.httpClient.post<MyOrdersResponse>(auth('my-orders/get'), {...params})

  getMyOrderDetail = (orderNumber: string): Observable<MyOrderResponse> =>
    this.httpClient.post<MyOrderResponse>(auth(`my-orders/${orderNumber}/get`), {})
}
