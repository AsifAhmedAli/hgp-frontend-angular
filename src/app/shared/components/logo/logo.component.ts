import {Component, Input, OnInit} from '@angular/core';
import {getSettingValue} from '../../functions/core.function';
import {Setting} from '../../interfaces/header.response';
import {DataService} from '../../services/data.service';
import {Subscription} from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  getSettingValue = getSettingValue;
  settings: Setting[];
  @Input() class = '';
  headerSettingsSubscription: Subscription;
  imageUrl:string = environment.baseURL + "images/hgp-Logo.png";

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.resolveHeader();
  }

  resolveHeader(): void {
    this.headerSettingsSubscription = this.dataService.getSettings().subscribe(
      (settings) => {
        this.settings = settings;
      }
    );
  }
}
