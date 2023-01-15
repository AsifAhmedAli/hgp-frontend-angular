import {Component, Input, OnInit} from '@angular/core';
import {Faq} from "../../../shared/interfaces/faq";

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.css']
})
export class FaqItemComponent implements OnInit {
  @Input() faq: Faq
  @Input() index: number
  constructor() { }

  ngOnInit(): void {
  }

}
