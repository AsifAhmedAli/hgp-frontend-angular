import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HelpersService} from '../shared/services/helpers.service';
import {Subscription} from 'rxjs';
import {DataService} from '../shared/services/data.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy {
  pageSubscription: Subscription;
  page: string;

  constructor(
    private helpersService: HelpersService,
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.pageSubscription = this.dataService.getPage().subscribe(
      page => {
        this.page = page;
        this.changeDetectorRef.detectChanges();
      }
    );
  }
  ngOnDestroy(): void {
    if (this.pageSubscription) { this.pageSubscription.unsubscribe(); }
  }

  onActivate(event: any): void {
    // this.helpersService.scrollToTop();
  }

}
