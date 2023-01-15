import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
declare var require: any;

const paginate = require('jw-paginate');

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() total: any;
  items: Array<any>;
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;
  @Output() goTo = new EventEmitter();
  @Input() from = 1;
  @Input() to = 10;
  query: any = {
    page: 1
  };
  pager: any = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.total) {
      this.items = Array(this.total).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
      this.setPage(this.query.page);
    }
  }


  private setPage(page: number) {
    // get new pager object for specified page
    this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);
    console.log('pager', this.pager)
    this.query.page = page
  }

  goToPage(page: any) {
    this.query.page = page;
    this.setPage(this.query.page);
    this.goTo.emit(page)
  }

  onChangePage(ev) {
    console.log('onchange event', ev)
  }
}
