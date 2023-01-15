import {Component, Input, OnInit} from '@angular/core';
import {Cart} from '../../interfaces/cart.interface';

@Component({
  selector: 'app-order-billing-shipping-detail',
  templateUrl: './order-billing-shipping-detail.component.html',
  styleUrls: ['./order-billing-shipping-detail.component.css']
})
export class OrderBillingShippingDetailComponent implements OnInit {

  @Input() item: Cart;
  @Input() type: string;
  constructor() { }

  ngOnInit(): void {
  }

}
