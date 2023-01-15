import {Component, Input, OnInit} from '@angular/core';
import {CartProduct} from "../../shared/interfaces/cart.interface";
import {ValidationMessages} from "../../shared/constants/constants";

@Component({
  selector: '[app-cart-checkout-item]',
  templateUrl: './cart-checkout-item.component.html',
  styleUrls: ['./cart-checkout-item.component.css']
})
export class CartCheckoutItemComponent implements OnInit {
  @Input() cartProduct: CartProduct;
  MESSAGES=  ValidationMessages;
  isRemoving = false;
  constructor() { }

  ngOnInit(): void {
  }

  onRemoving(removing: boolean): void {
    this.isRemoving = removing;
  }
}
