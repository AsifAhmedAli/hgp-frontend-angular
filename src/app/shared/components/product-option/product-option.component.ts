import {Component, Input, EventEmitter, OnInit, Output, SimpleChanges, OnChanges} from '@angular/core';
import {Family} from '../../interfaces/products.model';

@Component({
  selector: 'app-product-option',
  templateUrl: './product-option.component.html',
  styleUrls: ['./product-option.component.css']
})
export class ProductOptionComponent implements OnInit, OnChanges {
  @Input() family: Family;
  @Input() sku: string;
  @Output() optionsSelected = new EventEmitter<Array<any>>();
  showOptions: any;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeFamily = (event) => {
    this.optionsSelected.emit(event.target.value);
  }

  ngOnChanges(changes: SimpleChanges){
    this.showOptions = this.family.items.find(x => x.is_continued);
  }

}
