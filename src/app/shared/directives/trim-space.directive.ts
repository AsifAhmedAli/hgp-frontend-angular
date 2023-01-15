import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTrimSpace]'
})
export class TrimSpaceDirective {

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) { }

  @HostListener('focusout', ['$event']) onKeyUp(event: any): void {
    this.elementRef.nativeElement.value = event.target.value.trim();
  }
}
