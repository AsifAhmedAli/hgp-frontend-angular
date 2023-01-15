import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-data-not-found',
  templateUrl: './data-not-found.component.html',
  styleUrls: ['./data-not-found.component.css']
})
export class DataNotFoundComponent implements OnInit {

  @Input() text = 'No Data Found';
  @Input() dataNotFound = true;
  @Input() description: string;
  @Input() link: string;
  @Input() linkText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
