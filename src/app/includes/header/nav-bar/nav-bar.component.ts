import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DataService} from '../../../shared/services/data.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Category, Setting} from '../../../shared/interfaces/header.response';
import {getSettingValue} from '../../../shared/functions/core.function';

declare var $: any ;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  categoriesSubscription: Subscription;
  categories: Array<Category> = [];
  isAuthenticated = false;
  private headerSettingsSubscription: any;
  settings: Setting[];
  private showSearchBoxSubscription: Subscription;
  showSearchBox = true;
  getSettingValue = getSettingValue;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.showSearchBoxSubscription = this.dataService.getShowSearchBar().subscribe(
      show => {
        this.showSearchBox = show;
      });
    this.resolveHeader();
    this.categoriesSubscription = this.dataService.getCategories().subscribe(
      categories => this.categories = categories
    );
    this.authService.getIsAuthenticated().subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated
    );
  }
  resolveHeader() {
    this.headerSettingsSubscription = this.dataService.getSettings().subscribe(
      (settings) => {
        this.settings = settings;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) { this.categoriesSubscription.unsubscribe(); }
    if (this.headerSettingsSubscription) { this.headerSettingsSubscription.unsubscribe(); }
  }
}
