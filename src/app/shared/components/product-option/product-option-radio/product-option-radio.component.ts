import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Option, Product} from '../../../interfaces/products.response';
import {resolvePrice} from '../../../functions/project.function';
import {HelpersService} from '../../../services/helpers.service';
import {ValidationMessages} from '../../../constants/constants';
import {Subscription} from 'rxjs';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-product-option-radio',
  templateUrl: './product-option-radio.component.html',
  styleUrls: ['./product-option-radio.component.css']
})
export class ProductOptionRadioComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  @Input() option: Option;
  getPrice = resolvePrice;
  readonly MESSAGES = ValidationMessages;
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
