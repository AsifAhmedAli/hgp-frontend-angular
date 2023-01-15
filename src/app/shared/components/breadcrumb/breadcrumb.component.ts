import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BreadCrumbs} from '../../constants/data';
import {Breadcrumb} from '../../models/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnChanges {

  @Input() page: string;
  crumbs: Array<Breadcrumb> = [];
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.crumbs = BreadCrumbs[this.page];
  }
}
