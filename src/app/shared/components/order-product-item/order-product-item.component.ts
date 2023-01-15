import {Component, Input, OnInit} from '@angular/core';
import {CartProduct} from '../../interfaces/cart.interface';

@Component({
  selector: 'app-order-product-item',
  templateUrl: './order-product-item.component.html',
  styleUrls: ['./order-product-item.component.css']
})
export class OrderProductItemComponent implements OnInit {

  @Input() item: CartProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
