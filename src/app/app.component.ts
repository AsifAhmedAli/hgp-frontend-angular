import { Component, OnInit } from '@angular/core';
import { HelpersService } from './shared/services/helpers.service';
import { ApiService } from './shared/services/api.service';
import { DataService } from './shared/services/data.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HGP';
  // isAuth: boolean = false;

  constructor(
    private helpersService: HelpersService,
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // let loc = localStorage.getItem('auth');
    // if (!loc) {
    //   let auth = prompt('Please Enter Pin', '');
    //   if (auth && auth === 'mexil') {
    //     localStorage.setItem('auth', 'true');
    //     this.isAuth = true;
    //   } else {
    //     this.isAuth = false;
    //     alert('Wrong PIN Entered');
    //     window.close();
    //   }
    // } else {
    //   this.isAuth = true;
    // }
    this.apiService
      .loadHeader(this.helpersService.resolveSessionID())
      .subscribe(
        (response) => {
          this.dataService.setCategories(response.categories);
          this.dataService.setBrands(response.brands);
          this.dataService.setCart(response.cart);
          this.dataService.setSettings(response.settings);
          this.dataService.setFirstKit(response.firstKit);
          // this.dataService.setCMSPages(response.pages);
          // this.helpersService.loadChatWidget();
        },
        (error) => {
          this.helpersService.showResponseErrorMessage(error);
        }
      );
    AOS.init();
  }
}
