import {Component, Input, OnInit} from '@angular/core';
import {range} from '../../functions/core.function';

@Component({
  selector: 'app-blog-pagination',
  templateUrl: './blog-pagination.component.html',
  styleUrls: ['./blog-pagination.component.css']
})
export class BlogPaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() lastPage: number;
  @Input() link: string;
  pages: Array<number> = [];
  constructor() { }

  ngOnInit(): void {
    this.pages = range(this.lastPage);
  }

}
