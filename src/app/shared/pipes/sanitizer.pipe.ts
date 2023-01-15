import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {optional, optionalString} from '../types/types';

@Pipe({
  name: 'sanitizer'
})
export class SanitizerPipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer
  ) {
  }

  transform(value: optionalString): unknown {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

}
