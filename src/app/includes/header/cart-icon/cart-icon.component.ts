import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../../shared/services/data.service';
import {Subscription} from 'rxjs';
import {Cart} from '../../../shared/interfaces/cart.interface';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit, OnDestroy {

  cartSubscription: Subscription;
  cart: Cart;
  qty = 0;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.cartSubscription = this.dataService.getCart().subscribe(
      cart => {
        this.cart = cart;
        if (this.cart) {
          this.qty = cart?.total_qty;
        } else {
          this.qty = 0;
        }
      }
    );
  }
  ngOnDestroy(): void {
    if (this.cartSubscription) { this.cartSubscription.unsubscribe(); }
  }

}
