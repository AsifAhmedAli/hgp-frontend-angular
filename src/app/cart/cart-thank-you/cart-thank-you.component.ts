import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpersService } from '../../shared/services/helpers.service';
import { DataService } from '../../shared/services/data.service';
import { Subscription } from 'rxjs';
import { exists } from '../../shared/functions/core.function';
import { Setting } from '../../shared/interfaces/header.response';

@Component({
  selector: 'app-cart-thank-you',
  templateUrl: './cart-thank-you.component.html',
  styleUrls: ['./cart-thank-you.component.css'],
})
export class CartThankYouComponent implements OnInit, OnDestroy {
  orderNumber: number;
  orderNumberSubscription: Subscription;
  settingsSubscription: Subscription;
  settings: Setting[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.helpersService.scrollToTop();
    this.dataService.setShowHeader(true);
    this.helpersService.resolveTitle(this.activatedRoute);
    this.helpersService.dataService.clearCart();
    this.orderNumber = this.dataService.orderNumberSubject.value;
    this.getSettings();
    if (!exists(this.orderNumber)) {
      // this.router.navigateByUrl('/cart/order-confirmation');
    }
  }

  ngOnDestroy(): void {
    this.dataService.setShowHeader(true);
    if (this.orderNumberSubscription) {
      this.orderNumberSubscription.unsubscribe();
    }

    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }

  getSettings(): void {
    this.settingsSubscription = this.dataService
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
    return null;
  };
}
