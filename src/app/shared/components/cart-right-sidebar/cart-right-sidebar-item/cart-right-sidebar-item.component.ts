import {Component, Input, OnInit} from '@angular/core';
import {CartProduct} from '../../../interfaces/cart.interface';
import {closeCartSidebar} from '../../../functions/core.function';

@Component({
  selector: 'app-cart-right-sidebar-item',
  templateUrl: './cart-right-sidebar-item.component.html',
  styleUrls: ['./cart-right-sidebar-item.component.css']
})
export class CartRightSidebarItemComponent implements OnInit {

  @Input() cartProduct: CartProduct;
  isRemoving = false;
  closeCartSidebar = closeCartSidebar;
  constructor() { }

  ngOnInit(): void {
  }

  onRemoving(removing: boolean): void {
    this.isRemoving = removing;
  }

}
