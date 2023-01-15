import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appHideBrokerImage]'
})
export class HideBrokerImageDirective {
  @HostBinding('style.display') display = 'block';
  constructor() { }

  @HostListener('error') onError(): void {
    this.display = 'none';
  }
}
