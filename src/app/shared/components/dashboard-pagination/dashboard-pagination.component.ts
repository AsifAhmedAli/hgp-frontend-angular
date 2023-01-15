import {Component, Input, OnInit} from '@angular/core';
import {range} from '../../functions/core.function';

@Component({
  selector: 'app-dashboard-pagination',
  templateUrl: './dashboard-pagination.component.html',
  styleUrls: ['./dashboard-pagination.component.css']
})
export class DashboardPaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() lastPage: number;
  @Input() link: string;
  pages: Array<number> = [];
  constructor() { }

  ngOnInit(): void {
    this.pages = range(this.lastPage);
  }

}
