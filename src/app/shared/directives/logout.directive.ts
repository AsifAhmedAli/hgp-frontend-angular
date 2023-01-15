import {Directive, HostListener, Inject, PLATFORM_ID} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {HelpersService} from '../services/helpers.service';
import {isPlatformBrowser} from '@angular/common';
import {LocalStorageConstants} from '../constants/constants';
import {uniqueID} from '../functions/core.function';

@Directive({
  selector: '[appLogout]'
})
export class LogoutDirective {
  constructor(
    private authService: AuthService,
    private helpersService: HelpersService,
    @Inject(PLATFORM_ID) private platformID
  ) {}

  @HostListener('click') onClick(): void {
    this.authService.logout();
    this.helpersService.dataService.setCart(null);
    if (isPlatformBrowser(this.platformID)) {
      const sessionID = uniqueID(20);
      this.helpersService.localStorage.setObject(LocalStorageConstants.SESSION_ID, sessionID);
      this.helpersService.localStorage.remove('user');
      this.helpersService.logoutChatWidget();
    }
  }
}
