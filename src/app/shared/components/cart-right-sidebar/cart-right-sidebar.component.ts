import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Cart} from '../../interfaces/cart.interface';
import {DataService} from '../../services/data.service';
import {closeCartSidebar} from '../../functions/core.function';

@Component({
  selector: 'app-cart-right-sidebar',
  templateUrl: './cart-right-sidebar.component.html',
  styleUrls: ['./cart-right-sidebar.component.css']
})
export class CartRightSidebarComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  cartFoundSubscription: Subscription;
  cart: Cart;
  cartFound = true;
  closeCartSidebar = closeCartSidebar;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.cartSubscription = this.dataService.getCart().subscribe(
      cart => {
        this.cart = cart;
      }
    );
    this.cartFoundSubscription = this.dataService.getCartFound().subscribe(
      (found: boolean) => {
        this.cartFound = found;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.cartSubscription) { this.cartSubscription.unsubscribe(); }
    if (this.cartFoundSubscription) { this.cartFoundSubscription.unsubscribe(); }
  }

}
