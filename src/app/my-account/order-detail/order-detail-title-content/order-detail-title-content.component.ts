import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-detail-title-content',
  templateUrl: './order-detail-title-content.component.html',
  styleUrls: ['./order-detail-title-content.component.css']
})
export class OrderDetailTitleContentComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  constructor() { }

  ngOnInit(): void {
  }

}
