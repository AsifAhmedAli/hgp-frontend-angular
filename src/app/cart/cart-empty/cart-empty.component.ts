import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cart-empty',
  templateUrl: './cart-empty.component.html',
  styleUrls: ['./cart-empty.component.css']
})
export class CartEmptyComponent implements OnInit {
  @Input() cartNotFound;
  constructor() { }

  ngOnInit(): void {
  }

}
