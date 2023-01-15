import {Component, Input, OnInit} from '@angular/core';
import {Cart} from '../../interfaces/cart.interface';

@Component({
  selector: 'app-order-payment-detail',
  templateUrl: './order-payment-detail.component.html',
  styleUrls: ['./order-payment-detail.component.css']
})
export class OrderPaymentDetailComponent implements OnInit {

  @Input() item: Cart;
  constructor() { }

  ngOnInit(): void {
  }

}
