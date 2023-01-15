import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CartProduct} from '../../shared/interfaces/cart.interface';
import {ApiService} from '../../shared/services/api.service';
import {HelpersService} from '../../shared/services/helpers.service';
import {DataService} from '../../shared/services/data.service';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input() cartProduct: CartProduct;
  isRemoving = false;
  quantity: number;
  increasingOrDecreasingSubscription: Subscription;
  constructor(
    private apiService: ApiService,
    private helperService: HelpersService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.quantity = this.cartProduct.quantity;
  }

  increase(): void {
    if (this.quantity) {
      if ((this.cartProduct.product && this.quantity < this.cartProduct.product.qty) || this.cartProduct.kit) {
        this.quantity += 1;
      } else {
        return;
      }
    } else {
      this.quantity = 1;
    }
    this.updateQty();
  }

  decrease(): void {
    if (this.quantity && this.quantity > 1) {
      this.quantity -= 1;
      this.updateQty();
    }
  }

  updateQty(): void {
    this.stop();
    this.increasingOrDecreasingSubscription = this.apiService.updateCartProductQty(
      this.helperService.resolveSessionID(),
      this.quantity,
      this.cartProduct.id
    ).subscribe(
      response => {
        this.dataService.setCart(response.cart);
        this.helperService.success(response.message);
      },
      error => {
        this.resetQtyToDefault();
        this.helperService.resetCart(error);
        this.helperService.showResponseErrorMessage(error);
      }
    );
  }

  resetQtyToDefault(): void {
    this.quantity = this.cartProduct.quantity;
  }

  onChangeQty(event): void {
    // tslint:disable-next-line:radix
    const qty = parseInt(event.target.value);
    if (qty && qty !== this.cartProduct.quantity) {
      this.updateQty();
    } else {
      this.resetQtyToDefault();
    }
  }

  onRemoving(removing: boolean): void {
    this.isRemoving = removing;
  }

  stop(): void {
    if (this.increasingOrDecreasingSubscription) { this.increasingOrDecreasingSubscription.unsubscribe(); }
  }

  ngOnDestroy(): void {
    this.stop();
  }

}
