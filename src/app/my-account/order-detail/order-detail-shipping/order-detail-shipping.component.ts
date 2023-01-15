import {Component, Input, OnInit} from '@angular/core';
import {MyOrder} from '../../../shared/interfaces/my-orders.response';
import {States} from '../../../shared/services/States';

@Component({
  selector: 'app-order-detail-shipping',
  templateUrl: './order-detail-shipping.component.html',
  styleUrls: ['./order-detail-shipping.component.css']
})
export class OrderDetailShippingComponent implements OnInit {

  @Input() order: MyOrder;
  state: string;
  constructor() { }

  ngOnInit(): void {
    const state = States.find(item => item.abbreviation.toLowerCase() === this.order.shipping_state.toLowerCase());
    if (state) {
      this.state = state.name;
    } else {
      this.state = this.order.shipping_state;
    }
  }

}
