import { Pipe, PipeTransform } from '@angular/core';
import {Select2OptionData} from 'ng-select2';
import {BrainTreeCreditCard} from '../interfaces/user-payment/saved-payment-methods.response';
import {Select2Model} from '../models/select2.model';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  name: 'mapCardToSelect2'
})
export class MapCardToSelect2Pipe implements PipeTransform {

  constructor(
    private titleCasePipe: TitleCasePipe
  ) {}

  transform(cards: Array<BrainTreeCreditCard>): Array<Select2OptionData> {
    const values: Array<Select2OptionData> = [new Select2Model('', '--- Select Payment Method ---')];

    cards.map(item => values.push(new Select2Model(item.token, this.makeTitle(item))));
    values.push(new Select2Model('other', 'Other'));

    return values;
  }

  private makeTitle(card: BrainTreeCreditCard): string {
    let title = card.maskedNumber + ' ' + this.titleCasePipe.transform(card.cardholderName);
    if (card.default) {
      title += ' -Default';
    }

    return title;
  }

}
