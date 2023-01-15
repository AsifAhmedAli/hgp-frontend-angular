import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataSeries: DataService
  ) { }

  ngOnInit(): void {
    this.dataSeries.setShowHeader(false);
    this.helpersService.resolveTitle(this.activatedRoute);
  }
  ngOnDestroy(): void {
    this.dataSeries.setShowHeader(true);
  }

}
