import {Directive, HostListener} from '@angular/core';
import {toggleCartSidebar} from '../functions/core.function';

@Directive({
  selector: '[appSidebar]'
})
export class SidebarDirective {

  @HostListener('click') onClick(): void {
    toggleCartSidebar();
  }
}
