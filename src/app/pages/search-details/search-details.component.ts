import {Component, HostListener, OnInit} from '@angular/core';
import {Product} from '../../shared/interfaces/products.response';
import {AlgoliaService} from '../../shared/services/algolia.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductSortingOptions} from '../../shared/constants/constants';
import {environment} from '../../../environments/environment';
import algoliasearch from 'algoliasearch';

const client = algoliasearch(environment.algoliaApplicationId, environment.searchOnlyKey);
let index = client.initIndex(environment.indexes.default);

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {

  dataNotFound: any = false;
  isLoading: any = false;
  products: any[] = [];
  index: any;
  query: any;
  hits: any[] = [];
  sortOptions = ProductSortingOptions;
  queryParams: any = {
    query: '',
    // page: 0,
    sortBy: 'default',
    sortOrder: 'asc',
    append: true
  };
  nbPages = 1;
  total: number;
  discovering = false;
  private isPageLoaded = false;
  page = 0;

  constructor(private algoliaService: AlgoliaService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.index = algoliaService.getIndex();
    activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.queryParams = Object.assign({}, params);
        this.setIndex(this.queryParams.sortBy);
        this.onQuery();
      }
    });
  }

  ngOnInit(): void {
   /* this.queryParams.page = 0
    this.router.navigate([], {queryParams: this.queryParams, queryParamsHandling: 'merge'});
    this.isPageLoaded = true*/
  }

  // tslint:disable-next-line:no-shadowed-variable
  trackById(index: number, product: Product): number {
    return product?.id;
  }

  onQuery(): void {
    index.search(this.queryParams.query, {
      facets: [ '*', 'price.amount', 'product.categories.name', 'product.created_at'],
      page: this.page
    }).then(({ hits, nbPages, nbHits, page }) => {
      this.discovering = false;
      this.isLoading = false;
      if (this.isPageLoaded) {
        this.hits = hits;
      }
      else if (this.queryParams.hasOwnProperty('append') && this.queryParams.append != 'false') {
        this.hits = [...this.hits, ...hits];
      } else {
        this.hits = hits;

      }
      this.nbPages = nbPages;
      this.page = page;
      this.total = nbHits;
    });
  }

  onSortingChange(event): void {
    this.isLoading = true;
    this.hits = [];
    this.queryParams.sortBy = event.target.value;
    this.queryParams.append = false;
    this.page = 0;
    this.setIndex(event.target.value);
    this.router.navigate([], {queryParams: this.queryParams, queryParamsHandling: 'merge'});
    this.onQuery();
  }

  setIndex(value): void {
    switch (value) {
      case 'price-low-to-high':
        index = client.initIndex(environment.indexes.low_to_high);
        break;
      case 'price-high-to-low':
        index = client.initIndex(environment.indexes.high_to_low);
        break;
      case 'alphabetically-a-z':
        index = client.initIndex(environment.indexes.alphabetically_a_z);
        break;
      case 'sku':
        index = client.initIndex(environment.indexes.sku);
        break;
      default:
        index = client.initIndex(environment.indexes.default);
    }
  }

  onDiscoverMore(): void {
    this.isPageLoaded = false;
    ++this.page;
    this.queryParams.append = true;
    this.discovering = true;
    this.router.navigate([], {queryParams: this.queryParams, queryParamsHandling: 'merge'});
    this.onQuery();

  }

}
