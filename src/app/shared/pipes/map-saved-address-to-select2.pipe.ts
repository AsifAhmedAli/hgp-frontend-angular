import { Pipe, PipeTransform } from '@angular/core';
import {AddressBook} from '../interfaces/address-books/address-books.response';
import {Select2OptionData} from 'ng-select2';
import {Select2Model} from '../models/select2.model';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  name: 'mapSavedAddressToSelect2'
})
export class MapSavedAddressToSelect2Pipe implements PipeTransform {

  constructor(
    private titleCasePipe: TitleCasePipe
  ) {}

  transform(addresses: Array<AddressBook>): Array<Select2OptionData> {
    const values: Array<Select2OptionData> = [new Select2Model('', '--- Select Address ---')];

    addresses.map(item => values.push(new Select2Model(item.id.toString(), this.titleCasePipe.transform(item.nickname))));

    return values;
  }

}
