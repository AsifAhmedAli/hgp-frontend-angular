import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {HelpersService} from '../../shared/services/helpers.service';
import {DataService} from '../../shared/services/data.service';
import {Subscription} from 'rxjs';
import {Product} from '../../shared/interfaces/products.model';
import {Kit, KitProducts} from '../../shared/interfaces/kits.interface';
import {CartProduct} from "../../shared/interfaces/cart.interface";

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-kit-item]',
  templateUrl: './kit-item.component.html',
  styleUrls: ['./kit-item.component.css']
})
export class KitItemComponent implements OnInit {
  @Input() cartId: number;
  @Input() kit: Kit;
  kitProducts: Product[];
  increasingOrDecreasingSubscription: Subscription;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getKitProducts();
  }
  getKitProducts(): void {
    this.apiService.getKitProducts(this.cartId, this.kit.id).subscribe(
      response => {
        this.kitProducts = response.products;
      }
    );
  }

}
