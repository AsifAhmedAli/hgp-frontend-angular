import {Component, Input, OnInit} from '@angular/core';
import {Cart} from '../../../interfaces/cart.interface';
import {States} from '../../../services/States';

@Component({
  selector: 'app-order-billing-detail',
  templateUrl: './order-billing-detail.component.html',
  styleUrls: ['./order-billing-detail.component.css']
})
export class OrderBillingDetailComponent implements OnInit {

  @Input() item: Cart;
  state: string;
  constructor() { }

  ngOnInit(): void {
    const state = States.find(item => item.abbreviation.toLowerCase() === this.item.billing_address_state.toLowerCase());
    if (state) {
      this.state = state.name;
    } else {
      this.state = this.item.billing_address_state;
    }
  }

}
