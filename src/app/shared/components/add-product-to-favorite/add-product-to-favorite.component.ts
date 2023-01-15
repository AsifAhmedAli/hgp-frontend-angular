import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Product, ProductDetailResponse } from '../../interfaces/products.model';
import {HelpersService} from '../../services/helpers.service';
import {Messages} from '../../constants/constants';
import {ProductResponse} from '../../interfaces/products.response';

@Component({
  selector: 'app-add-product-to-favorite',
  templateUrl: './add-product-to-favorite.component.html',
  styleUrls: ['./add-product-to-favorite.component.css']
})
export class AddProductToFavoriteComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  removeSubscription: Subscription;
  authSubscription: Subscription;
  @Input() product: any;
  @Input() showText = true;
  processing = false;
  isAuthenticated = false;
  MESSAGES = Messages;

  constructor(private helpersService: HelpersService) {
  }

  ngOnInit(): void {
    this.authSubscription = this.helpersService.authService.getIsAuthenticated().subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  // tslint:disable-next-line:typedef
  onUnAuthenticated() {
    this.helpersService.toastrService.info(this.MESSAGES.loginFirst);
  }


  addToFavorite = () => {
    this.processing = true;
    this.subscription = this.helpersService.authService.addFavoriteProduct(this.product.id).subscribe(
      response => {
        this.processing = false;
        // this.product = response.product;
        this.product.is_favorite_count = 1;
        this.helpersService.success(response.message, '');
      },
      error => {
        this.processing = false;
        if (error.status === 400) {
          this.product.is_favorite_count = 0;
        }
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }

  removeFromFavorite = () => {
    this.processing = true;
    this.subscription = this.helpersService.authService.removeFavoriteProduct(this.product.id).subscribe(
      response => {
       // this.product = response.product;
        this.product.is_favorite_count = 0;
        this.helpersService.toastrService.success(response.message, '');
        this.processing = false;
      },
      error => {
        this.processing = false;
        if (error.status === 400) {
          this.product.is_favorite_count = 0;
        }
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
