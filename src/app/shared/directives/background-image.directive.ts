import {Directive, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';
import {exists, makeDefaultImagePath} from '../functions/core.function';

@Directive({
  selector: '[appBackgroundImage]'
})
export class BackgroundImageDirective implements OnChanges{
  @Input() path: string;
  @Input() exact = false;

  @HostBinding('style.background-image') backgroundImage;
  ngOnChanges(changes: SimpleChanges): void {
    if (exists(this.path)) {
      if (!this.exact && this.path) {
        this.path = makeDefaultImagePath(this.path.replace(/\\/g, '/'));
      }
      this.backgroundImage = 'url(' + this.path + ')';
    }
  }

}
