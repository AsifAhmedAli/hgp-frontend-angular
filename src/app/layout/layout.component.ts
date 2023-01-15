import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HelpersService} from '../shared/services/helpers.service';
import {DataService} from "../shared/services/data.service";
import {isPlatformBrowser} from "@angular/common";

declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
      private helperService: HelpersService,
      private dataService: DataService,
      @Inject(PLATFORM_ID) private platformID,
  ) {
  }

  ngOnInit(): void {
  }

  onActivate(event: any): void {
    if (isPlatformBrowser(this.platformID)) {
      if ($('#collapsibleNavbar').hasClass('show')) {
        $('#collapsibleNavbar').removeClass('show');
        $('#main-menu-btn').addClass('collapsed');
        $('#main-menu-btn').attr('aria-expanded', 'false');
      }
    }

    this.helperService.scrollToTop();
    if (window.location.href == window.location.origin) {
      this.dataService.setShowSearchBar(false)
    } else {
      this.dataService.setShowSearchBar(true)
    }
  }
}
