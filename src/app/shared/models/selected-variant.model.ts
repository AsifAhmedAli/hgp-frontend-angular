import {Option, OptionValue} from '../interfaces/products.response';

export class SelectedVariantModel {
  constructor(
    public option: Option,
    public value: OptionValue,
    public type: string
  ) {}
}
