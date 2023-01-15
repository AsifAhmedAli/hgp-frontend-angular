import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/products.model';
import { Colors } from '../../constants/config.constants';
import { Media } from '../../interfaces/media';
import { imageFromAdditional } from '../../functions/project.function';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Setting } from '../../interfaces/header.response';
import { Messages } from '../../constants/constants';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  readonly Colors = Colors;
  @Input() product: Product;
  subscription: Subscription;
  isAuthenticated = false;
  MESSAGES = Messages;
  settings: Setting[];
  currentUrl: string;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUrl();
    this.getSettings();
  }
  getCurrentUrl(): void {
    this.currentUrl = this.router.url;
  }

  changeTitle(e) {
    var title = e.target.title;
    if (title) {
      var titles = title.split(' ');
      var string = '';
      for (let t = 0; t < titles.length; t++) {
        if (t % 4 == 0) {
          string += '\n' + titles[t];
        } else {
          string += ' ' + titles[t];
        }
      }
      e.target.title = string;
    }
  }

  resetTitle(e, title) {
    if (title) {
      e.target.title = title;
    }
  }

  getSettings(): void {
    this.dataService.getSettings().subscribe((settings) => {
      this.settings = settings;
    });
  }
  getSettingValue = (key) => {
    const setting = this.settings && this.settings.find((x) => x.key === key);
    if (setting) {
      return setting.value;
    }
    return '';
  };
}
