import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Constants} from '../constants/constants';

@Directive({
  selector: '[appOtherOption]'
})
export class OtherOptionDirective implements OnInit{
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) { }
  ngOnInit(): void {
    const text = this.renderer2.createText(`Other`);
    this.renderer2.appendChild(this.elementRef.nativeElement, text);
    this.renderer2.setAttribute(this.elementRef.nativeElement, 'value', Constants.otherOption);
  }
}
