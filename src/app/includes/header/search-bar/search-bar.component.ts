import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

declare var require: any;
import algoliasearch from 'algoliasearch/lite';
import {AlgoliaService} from '../../../shared/services/algolia.service';
import {Subscription} from 'rxjs';
import {DataService} from '../../../shared/services/data.service';
import {Category} from '../../../shared/interfaces/header.response';
import {resolveDataNotFound} from "../../../shared/functions/core.function";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  query = '';
  hits: any[] = [];
  index: any;
  noRecordFound = false;
  categoriesSubscription: Subscription;
  categories: Array<Category> = [];
  loading = false;

  constructor(private router: Router, private algoliaService: AlgoliaService, private dataService: DataService) {
    this.index = algoliaService.getIndex();
  }

  ngOnInit(): void {

  }


  onQuery(event) {
    this.query = event.target.value;
    this.hits = [];
    this.noRecordFound = false;
    if (this.query != '') {
      this.loading = true;
      this.index.search(this.query).then(({ hits }) => {
        this.hits = hits;
        this.loading = false;
        if (!hits.length) {
          this.noRecordFound = true;
        } else {
          this.noRecordFound = false;
        }
      },
        error => {
          console.log(error);
        }
      );
    } else {
      this.hits = [];
    }
  }


  ngOnDestory() {
    this.categoriesSubscription.unsubscribe();
  }

  resetHits() {
    this.hits = [];
  }
}
