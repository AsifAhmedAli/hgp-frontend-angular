import { Component, Input, OnInit } from '@angular/core';
import { Messages } from 'src/app/shared/constants/constants';
import { getSettingValue } from 'src/app/shared/functions/core.function';




@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
  
})

export class OrderSummaryComponent implements OnInit {
  @Input() cart: any;
  ONLYMESSAGES = Messages;
  getSettingValue = getSettingValue;
  constructor() { }

  ngOnInit(): void {
  }

}

