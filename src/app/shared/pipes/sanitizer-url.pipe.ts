import { Pipe, PipeTransform } from '@angular/core';
import {optionalString} from '../types/types';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'sanitizerURL'
})
export class SanitizerURLPipe implements PipeTransform {
  constructor(
    private domSanitizer: DomSanitizer
  ) {
  }
  transform(value: optionalString): unknown {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
