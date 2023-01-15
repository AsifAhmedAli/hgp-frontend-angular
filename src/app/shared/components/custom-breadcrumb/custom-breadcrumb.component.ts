import {Component, Input, OnInit} from '@angular/core';
import {Breadcrumb} from '../../models/breadcrumb';

@Component({
  selector: 'app-custom-breadcrumb',
  templateUrl: '../breadcrumb/breadcrumb.component.html',
  styleUrls: ['./custom-breadcrumb.component.css']
})
export class CustomBreadcrumbComponent implements OnInit {
  @Input() crumbs: Array<Breadcrumb> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
