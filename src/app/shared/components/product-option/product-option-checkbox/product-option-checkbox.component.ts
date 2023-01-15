import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Option, OptionValue, Product} from '../../../interfaces/products.response';
import {resolvePrice} from '../../../functions/project.function';
import {SelectedVariantModel} from '../../../models/selected-variant.model';
import {DataService} from '../../../services/data.service';
import {Subscription} from 'rxjs';
import {ValidationMessages} from '../../../constants/constants';

@Component({
  selector: 'app-product-option-checkbox',
  templateUrl: './product-option-checkbox.component.html',
  styleUrls: ['./product-option-checkbox.component.css']
})
export class ProductOptionCheckboxComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  @Input() option: Option;
  getPrice = resolvePrice;
  readonly MESSAGES = ValidationMessages;
  requiredUnfilledIDsSubscription: Subscription;
  requiredError = false;
  constructor(
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
    const value: OptionValue = this.option.values.find(optionValue => optionValue.id.toString() === selectedValue.toString());
    let selectedVariants = this.dataService.selectedVariants.value;
    if (event.target.checked) {
      selectedVariants.push(new SelectedVariantModel(this.option, value, this.option.type));
      this.dataService.setSelectedVariants(selectedVariants);
    } else {
      selectedVariants = selectedVariants.filter(selected => selected.value.id.toString() !== selectedValue);
      this.dataService.setSelectedVariants(selectedVariants);
    }
  }

  ngOnDestroy(): void {
    this.dataService.setRequiredUnfilledIDs([]);
    if (this.requiredUnfilledIDsSubscription) {
      this.requiredUnfilledIDsSubscription.unsubscribe();
    }
  }
}
