import {Component, Input, OnInit} from '@angular/core';
import {MyOrder} from '../../../shared/interfaces/my-orders.response';
import {States} from '../../../shared/services/States';

@Component({
  selector: 'app-order-detail-billing',
  templateUrl: './order-detail-billing.component.html',
  styleUrls: ['./order-detail-billing.component.css']
})
export class OrderDetailBillingComponent implements OnInit {

  @Input() order: MyOrder;
  state: string;
  constructor() { }

  ngOnInit(): void {
    const state = States.find(item => item.abbreviation.toLowerCase() === this.order.billing_state.toLowerCase());
    if (state) {
      this.state = state.name;
    } else {
      this.state = this.order.billing_state;
    }
  }

}
