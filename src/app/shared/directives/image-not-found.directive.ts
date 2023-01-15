import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appImageNotFound]'
})
export class ImageNotFoundDirective {
  private elementRef: ElementRef;
  private renderer2: Renderer2;
  constructor(elementRef: ElementRef,
              render2: Renderer2) {
    this.elementRef = elementRef
    this.renderer2 = render2


  }
  @HostBinding('style.display') display = 'block';
  @HostListener('error') onError(): void {
    this.display = 'none';
    const  currentElement = this.elementRef.nativeElement
    const parent = this.renderer2.parentNode(currentElement)
    this.renderer2.setAttribute(parent, 'style', "display:none")
  }

}
