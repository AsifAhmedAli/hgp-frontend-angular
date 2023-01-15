import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Product} from '../interfaces/products.model';
import {HelpersService} from '../services/helpers.service';
import {ApiService} from '../services/api.service';
import {DataService} from '../services/data.service';
import {HttpParams} from '@angular/common/http';
import {toggleCartSidebar} from '../functions/core.function';
import {Kit} from "../interfaces/kits.interface";

@Directive({
  selector: '[appAddToCart]'
})
export class AddToCartDirective {

  @Input() product: Product;
  @Input() kit: Kit;
  @Input() qty: number;
  @Input() variantParams: HttpParams = new HttpParams();
  @Output() adding = new EventEmitter<boolean>(false);
  @Output() added = new EventEmitter<void>();
  isAdding = false;
  constructor(
    private helperService: HelpersService,
    private apiService: ApiService,
    private dataService: DataService
  ) { }

  @HostListener('click') onClick(): void {
    if (!this.isAdding) {
      if (this.qty) {
        this.isAdding = true;
        this.adding.emit(this.isAdding);
        let params = this.variantParams;
        if (this.kit) {
          params = params.append('kit_id', this.kit.id.toString());
        } else {
          params = params.append('sku', this.product.sku);
        }
        params = params.append('quantity', this.qty.toString());
        this.apiService.addToCart(
          this.helperService.resolveSessionID(),
          params
        ).subscribe(
          response => {
            this.isAdding = false;
            this.adding.emit(this.isAdding);
            this.dataService.setCart(response.cart);
            // this.helperService.success(response.message);
            this.added.emit();
            toggleCartSidebar();
          },
          error => {
            this.helperService.resetCart(error);
            this.isAdding = false;
            this.adding.emit(this.isAdding);
            this.helperService.showResponseErrorMessage(error);
          });
      } else {
        this.helperService.warning('Please Select Quantity.');
      }
    }
  }
}
