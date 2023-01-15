import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerptWithoutDots'
})
export class ExcerptWithoutDotsPipe implements PipeTransform {

  transform(value: any, length: number = 27): any {
    if (value) {
      let originalLength: number = value.length;
      if (value && value.hasOwnProperty('changingThisBreaksApplicationSecurity')) {
        value = this.removeStringFromHTML(value.changingThisBreaksApplicationSecurity);
        originalLength = value.length;
      }
      if (value) {
        value = value.substring(0, length);
      }

      if (originalLength > length) {
        value = value.substring(0, length - 3);
      }
    }

    return value;
  }

  removeStringFromHTML(str): string | any {
    if (str) {
      return str.replace(/<[^>]*>/g, '');
    } else {
      return str;
    }
  }

}
