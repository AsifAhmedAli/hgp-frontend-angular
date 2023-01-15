import { Component, OnInit } from '@angular/core';
import {MenuItem} from '../../shared/models/menu-item';

@Component({
  selector: 'app-my-account-header',
  templateUrl: './my-account-header.component.html',
  styleUrls: ['./my-account-header.component.css']
})
export class MyAccountHeaderComponent implements OnInit {
  links: Array<MenuItem> = [
    new MenuItem('Profile', '/my-account/profile'),
    new MenuItem('Addresses', '/my-account/address-book'),
    // new MenuItem('Payments', '/my-account/payment-methods'),
    new MenuItem('Orders', '/my-account/orders'),
    new MenuItem('Change Password', '/my-account/change-password'),
    new MenuItem('Wish List', '/my-account/wishlist'),
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
