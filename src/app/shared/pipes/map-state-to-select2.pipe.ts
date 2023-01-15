import { Pipe, PipeTransform } from '@angular/core';
import {StateModel} from '../models/state.model';
import {Select2OptionData} from 'ng-select2';
import {Select2Model} from '../models/select2.model';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  name: 'mapStateToSelect2'
})
export class MapStateToSelect2Pipe implements PipeTransform {
  constructor(
    private titleCasePipe: TitleCasePipe
  ) {}

  transform(states: Array<StateModel>): Array<Select2OptionData> {
    const values: Array<Select2OptionData> = [new Select2Model('', '--- Select State ---')];

    states.map(item => values.push(new Select2Model(item.abbreviation, this.titleCasePipe.transform(item.name))));

    return values;
  }

}
