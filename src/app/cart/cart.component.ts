import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpersService } from '../shared/services/helpers.service';
import { isPlatformBrowser } from '@angular/common';
import { closeCartSidebar } from '../shared/functions/core.function';
import { Subscription } from 'rxjs';
import { Cart } from '../shared/interfaces/cart.interface';
import { DataService } from '../shared/services/data.service';
import { ApiService } from '../shared/services/api.service';
import { Messages } from '../shared/constants/constants';
import { Setting } from '../shared/interfaces/header.response';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartFound = true;
  cartSubscription: Subscription;
  cartFoundSubscription: Subscription;
  couponSubscription: Subscription;
  cart: Cart;
  title: string;
  MESSAGES = Messages;
  private contactUsSubscription: Subscription;
  private settings: Setting[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformID
  ) {}

  ngOnInit(): void {
    this.getSettings();
    this.helpersService.dataService.setShowFooter(true);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    if (isPlatformBrowser(this.platformID)) {
      closeCartSidebar();
    }
    this.subscribe();
  }
  subscribe(): void {
    this.cartSubscription = this.dataService.getCart().subscribe((cart) => {
      this.cart = cart;
    });
    this.cartFoundSubscription = this.dataService
      .getCartFound()
      .subscribe((found: boolean) => {
        this.cartFound = found;
      });
  }
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.cartFoundSubscription) {
      this.cartFoundSubscription.unsubscribe();
    }
  }

  removeCoupon(): void {
    this.couponSubscription = this.apiService
      .removeCoupon(this.helpersService.resolveSessionID())
      .subscribe(
        (response) => {
          this.helpersService.success(response.message);
          this.dataService.setCart(response.cart);
        },
        (error) => {
          this.helpersService.resetCart(error);
          this.helpersService.showResponseErrorMessage(error);
        }
      );
  }

  getSettings() {
    this.contactUsSubscription = this.dataService
      .getSettings()
      .subscribe((settings) => {
        this.settings = settings;
      });
  }

  getSettingValue = (key) => {
    const setting = this.settings && this.settings.find((x) => x.key === key);
    if (setting) {
      return setting.value;
    }
    return '';
  };
}
