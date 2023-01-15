import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Formats} from '../constants/constants';

@Directive({
  selector: '[appDate]'
})
export class DateDirective implements OnInit{
  @Input() date;
  @Input() format;
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private datePipe: DatePipe
  ) { }
  ngOnInit(): void {
    let format = this.format;
    if (!format) {
      format = Formats.dateFormat;
    }
    const text = this.renderer2.createText(this.datePipe.transform(this.date.replace(/-/g, '/'), format));
    this.renderer2.appendChild(this.elementRef.nativeElement, text);
  }
}
