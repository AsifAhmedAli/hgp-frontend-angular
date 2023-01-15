import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Option, Product} from '../../../interfaces/products.response';
import {resolvePrice} from '../../../functions/project.function';
import {HelpersService} from '../../../services/helpers.service';
import {ValidationMessages} from '../../../constants/constants';
import {DataService} from '../../../services/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-option-dropdown',
  templateUrl: './product-option-dropdown.component.html',
  styleUrls: ['./product-option-dropdown.component.css']
})
export class ProductOptionDropdownComponent implements OnInit, OnDestroy {
  readonly MESSAGES = ValidationMessages;
  @Input() product: Product;
  @Input() option: Option;
  getPrice = resolvePrice;
  requiredUnfilledIDsSubscription: Subscription;
  requiredError = false;
  constructor(
    private helperService: HelpersService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
   this.requiredUnfilledIDsSubscription = this.dataService.getRequiredUnfilledIDs().subscribe(
     requiredIDs => {
       this.requiredError = requiredIDs.includes(this.option.id);
     }
   );
  }

  onChange(event): void {
    const selectedValue = event.target.value;
    if (this.option.is_required) {
      this.requiredError = !selectedValue;
    }
    this.helperService.resolveDropdownOrRadioVariantChange(this.option, selectedValue);
  }

  ngOnDestroy(): void {
    this.dataService.setRequiredUnfilledIDs([]);
    if (this.requiredUnfilledIDsSubscription) {
      this.requiredUnfilledIDsSubscription.unsubscribe();
    }
  }
}
