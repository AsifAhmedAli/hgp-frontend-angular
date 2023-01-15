import {Component, Input, OnInit} from '@angular/core';
import {CartProduct} from '../../interfaces/cart.interface';
import {MyOrderProduct} from '../../interfaces/my-orders.response';

@Component({
  selector: 'app-cart-item-variants',
  templateUrl: './cart-item-variants.component.html',
  styleUrls: ['./cart-item-variants.component.css']
})
export class CartItemVariantsComponent implements OnInit {

  @Input() item: CartProduct | MyOrderProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
