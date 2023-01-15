import {Component, Input, OnInit} from '@angular/core';
import {Cart} from '../../../interfaces/cart.interface';
import {States} from '../../../services/States';

@Component({
  selector: 'app-order-shipping-detail',
  templateUrl: './order-shipping-detail.component.html',
  styleUrls: ['./order-shipping-detail.component.css']
})
export class OrderShippingDetailComponent implements OnInit {

  @Input() item: Cart;
  state: string;
  constructor() { }

  ngOnInit(): void {
    const state = States.find(item => item.abbreviation.toLowerCase() === this.item.shipping_address_state.toLowerCase());
    if (state) {
      this.state = state.name;
    } else {
      this.state = this.item.shipping_address_state;
    }
  }

}
