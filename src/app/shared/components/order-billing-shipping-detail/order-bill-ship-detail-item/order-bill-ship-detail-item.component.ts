import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-bill-ship-detail-item',
  templateUrl: './order-bill-ship-detail-item.component.html',
  styleUrls: ['./order-bill-ship-detail-item.component.css']
})
export class OrderBillShipDetailItemComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  constructor() { }

  ngOnInit(): void {
  }

}
