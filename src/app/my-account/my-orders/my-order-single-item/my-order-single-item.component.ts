import {Component, Input, OnInit} from '@angular/core';
import {MyOrder} from '../../../shared/interfaces/my-orders.response';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-my-order-single-item]',
  templateUrl: './my-order-single-item.component.html',
  styleUrls: ['./my-order-single-item.component.css']
})
export class MyOrderSingleItemComponent implements OnInit {

  @Input() order: MyOrder;
  constructor() { }

  ngOnInit(): void {
  }

}
