import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appFirstOption]'
})
export class FirstOptionDirective implements OnInit{
  @Input() title: string;
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) { }
  ngOnInit(): void {
    const text = this.renderer2.createText(`Select ${this.title}`);
    // const text = this.renderer2.createText(`--- Select ${this.title} ---`);
    this.renderer2.appendChild(this.elementRef.nativeElement, text);
    this.renderer2.setAttribute(this.elementRef.nativeElement, 'value', '');
  }
}
