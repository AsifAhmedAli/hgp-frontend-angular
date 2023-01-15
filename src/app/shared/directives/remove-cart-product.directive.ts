import {Directive, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {CartProduct} from '../interfaces/cart.interface';
import {ApiService} from '../services/api.service';
import {HelpersService} from '../services/helpers.service';
import {DataService} from '../services/data.service';

@Directive({
  selector: '[appRemoveCartProduct]'
})
export class RemoveCartProductDirective {

  @Input() cartProduct: CartProduct;
  @Output() removing = new EventEmitter<boolean>(true);
  @Output() removed = new EventEmitter<void>(true);
  isRemoving = false;
  constructor(
    private apiService: ApiService,
    private helperService: HelpersService,
    private dataService: DataService
  ) { }

  @HostListener('click') onClick(): void {
    if (!this.isRemoving) {
      if (this.cartProduct) {
        this.isRemoving = true;
        this.removing.emit(this.isRemoving);
        this.apiService.removeCartProduct(this.helperService.resolveSessionID(), this.cartProduct.id).subscribe(
          response => {
            this.dataService.setCart(response.cart);
            this.helperService.success(response.message);
            this.removed.emit();
            this.isRemoving = false;
            this.removing.emit(this.isRemoving);
          },
          error => {
            this.isRemoving = false;
            this.removing.emit(this.isRemoving);
            this.helperService.resetCart(error);
            this.helperService.showResponseErrorMessage(error);
          }
        );
      } else {
        this.helperService.warning('No Product selected');
      }
    }
  }
}
