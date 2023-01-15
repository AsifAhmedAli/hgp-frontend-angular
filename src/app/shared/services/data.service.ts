import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {LocalStorage} from '../libs/localstorage';
import {isPlatformBrowser} from '@angular/common';
import {StaticPage} from '../interfaces/pages/static-page.response';
import {Cart} from '../interfaces/cart.interface';
import {SelectedVariantModel} from '../models/selected-variant.model';
import {Category, Page, Setting} from '../interfaces/header.response';
import {Brand} from '../interfaces/products.model';
import {User} from "../interfaces/user";
import {Kit} from "../interfaces/kits.interface";
import {StateModel} from "../models/state.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private localStorage: LocalStorage,
    @Inject(PLATFORM_ID) private platformID
  ) {
  }
  private searchBarSubject = new BehaviorSubject<boolean>(true);
  public showHeaderSubject = new BehaviorSubject<boolean>(true);
  private showFooterSubject = new BehaviorSubject<boolean>(false);
  private pageSubject = new BehaviorSubject<string>(null);
  private staticPage = new BehaviorSubject<StaticPage>(null);
  public userSubject = new BehaviorSubject<User>(null);
  private categoriesSubject = new BehaviorSubject<Category[]>(this.localStorage.getArray('categories'));
  brandsSubject = new BehaviorSubject<Brand[]>(this.localStorage.getArray('brands'));
  private pages = new BehaviorSubject<Array<Page>>(this.localStorage.getArray('pages'));
  private settingsSubject = new BehaviorSubject<Setting[]>(this.localStorage.getObject('settings'));
  private cartSubject = new BehaviorSubject<Cart>(null);
  private firstKit = new BehaviorSubject<Kit>(null);
  private cartFoundSubject = new BehaviorSubject<boolean>(true);
  private guestSubject = new BehaviorSubject<boolean>(true);
  selectedVariants = new BehaviorSubject<Array<SelectedVariantModel>>([]);
  private requiredUnfilledOptions = new BehaviorSubject<Array<number>>([]);
  public orderNumberSubject = new BehaviorSubject<number>(null);
  private orderIDSubject = new BehaviorSubject<string>(null);
  legalStates = new BehaviorSubject<StateModel[]>([]);
  scrollToKits = new BehaviorSubject<boolean>(false);

  // private settingsSubject = new BehaviorSubject<any>(null);

  setShowSearchBar(show: boolean): void {
    this.searchBarSubject.next(show);
  }

  getShowSearchBar(): Observable<boolean> {
    return this.searchBarSubject.asObservable();
  }
  setSettings(settings: Setting[]): void {
    this.settingsSubject.next(settings);
    if (isPlatformBrowser(this.platformID)) {
      this.localStorage.setObject('settings', settings);
    }
  }

  getSettings(): Observable<Setting[]> {
    return this.settingsSubject.asObservable();
  }

  getShowHeader(): Observable<boolean> {
    return this.showHeaderSubject.asObservable();
  }

  setShowHeader(show: boolean): void {
    this.showHeaderSubject.next(show);
  }

  getShowFooter(): Observable<boolean> {
    return this.showFooterSubject.asObservable();
  }

  setShowFooter(show: boolean): void {
    this.showFooterSubject.next(show);
  }

  getPage(): Observable<string> {
    return this.pageSubject.asObservable();
  }

  getStaticPage(): Observable<StaticPage> {
    return this.staticPage.asObservable();
  }

  setStaticPage(page: StaticPage): void {
    this.staticPage.next(page);
  }

  setPage(page: string): void {
    this.pageSubject.next(page);
  }

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  setCategories(categories: Category[]): void {
    this.categoriesSubject.next(categories);
    if (isPlatformBrowser(this.platformID)) {
      this.localStorage.setArray('categories', categories);
    }
  }

  setBrands(brands: Brand[]): void {
    this.brandsSubject.next(brands);
    if (isPlatformBrowser(this.platformID)) {
      this.localStorage.setArray('brands', brands);
    }
  }

  getCategories(): Observable<Array<Category>> {
    return this.categoriesSubject.asObservable();
  }


  setCMSPages(pages: Array<Page>): void {
    if (pages) {
      this.pages.next(pages);
      if (isPlatformBrowser(this.platformID)) {
        this.localStorage.setArray('pages', pages);
      }
    }

  }


  getCMSPages(): Observable<Array<Page>> {
    return this.pages.asObservable();
  }

  setFirstKit(kit: Kit){
    this.firstKit.next(kit)
  }
  getFirstKit(): Observable<Kit>{
    return this.firstKit.asObservable();
  }
  setCart(cart: Cart): void {
    this.cartSubject.next(cart);
    if (cart) {
      this.setCartFound(true);
      if (cart.guest_email) {
        this.setGuest(true);
      } else {
        this.setGuest(false);
      }
    } else {
      this.setCartFound(false);
      this.setGuest(false);
    }
  }

  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  clearCart(): void {
    this.setCart(null);
  }

  setCartFound(show: boolean): void {
    this.cartFoundSubject.next(show);
  }

  getCartFound(): Observable<boolean> {
    return this.cartFoundSubject.asObservable();
  }

  setGuest(show: boolean): void {
    this.guestSubject.next(show);
  }

  getGuest(): Observable<boolean> {
    return this.guestSubject.asObservable();
  }

  setSelectedVariants(variants: Array<SelectedVariantModel>): void {
    this.selectedVariants.next(variants);
  }

  getSelectedVariants(): Observable<Array<SelectedVariantModel>> {
    return this.selectedVariants.asObservable();
  }

  setRequiredUnfilledIDs(IDs: Array<number>): void {
    this.requiredUnfilledOptions.next(IDs);
  }

  getRequiredUnfilledIDs(): Observable<Array<number>> {
    return this.requiredUnfilledOptions.asObservable();
  }

  setOrderNumber(orderNumber: number): void {
    this.orderNumberSubject.next(orderNumber);
  }

  getOrderNumber(): Observable<number> {
    return this.orderNumberSubject.asObservable();
  }

  setOrderID(orderID: string): void {
    this.orderIDSubject.next(orderID);
  }

  getOrderID(): Observable<string> {
    return this.orderIDSubject.asObservable();
  }

}
