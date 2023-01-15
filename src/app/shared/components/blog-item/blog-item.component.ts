import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../interfaces/products.model";
import {Subscription} from "rxjs";
import {Messages} from "../../constants/constants";
import {Blog} from "../../interfaces/blog/blog.response";

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {
  @Input() blog: Blog
  subscription: Subscription;
  isAuthenticated = false;
  MESSAGES = Messages;
  constructor() { }

  ngOnInit(): void {
  }

}
