import {Select2OptionData} from 'ng-select2';

export class Select2Model {
  constructor(
    public id: string,
    public text: string,
    public disabled?: boolean,
    public children?: Array<Select2OptionData>,
    public additional?: any
  ) {}
}
