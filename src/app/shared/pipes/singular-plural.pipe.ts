import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singularPlural'
})
export class SingularPluralPipe implements PipeTransform {

  transform(value: string, counter: number, plural: string = null): string {
    if (counter === 1) {
      return value;
    } else {
      if (plural) {
        return plural;
      } else {
        return value + 's';
      }
    }
  }

}
