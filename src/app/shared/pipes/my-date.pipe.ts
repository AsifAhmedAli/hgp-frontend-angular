import { Pipe, PipeTransform } from '@angular/core';
import {Formats} from '../constants/constants';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'myDate'
})
export class MyDatePipe extends DatePipe implements PipeTransform {

  transform(date: any, format: string = Formats.dateFormat): string {
    date = new Date(date);
    return super.transform(date, format);

  }

}
