import {AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {Subscription} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showHeader = true;
  showHeaderSubscription: Subscription;

  constructor(
    private dataService: DataService,
   // private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.showHeaderSubscription = this.dataService.getShowHeader().subscribe(
      show => {
        this.showHeader = show;
       // this.changeDetectorRef.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.showHeaderSubscription) {
      this.showHeaderSubscription.unsubscribe();
    }
  }


}
