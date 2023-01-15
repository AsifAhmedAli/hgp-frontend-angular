import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortString'
})
export class ShortStringPipe implements PipeTransform {

  transform(value: any, limit: number): string {
    if (value.length > limit)
    {
      return value.substr(0, limit) + '...';
    }
    return value;
  }

}
