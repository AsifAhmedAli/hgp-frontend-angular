import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HelpersService } from '../shared/services/helpers.service';
import { optionalString } from '../shared/types/types';
import { ApiService } from '../shared/services/api.service';
import {
  isEmpty,
  resolveDataNotFound,
  resolveValue,
} from '../shared/functions/core.function';
import { ProductSortingOptions } from '../shared/constants/constants';
import { Subscription } from 'rxjs';
import { Breadcrumb } from '../shared/models/breadcrumb';
import { Colors } from '../shared/constants/config.constants';
import {
  PaginatedProducts,
  Product,
} from '../shared/interfaces/products.model';
import { Category } from '../shared/interfaces/header.response';
import { closeMobileMegaMenu } from '../shared/functions/project.function';
import { BreadcrumbPipe } from '../shared/pipes/breadcrumb.pipe';
import { isPlatformBrowser } from '@angular/common';
import { DataService } from '../shared/services/data.service';
import { Setting } from '../shared/interfaces/header.response';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  title: string;
  slug: optionalString;
  nextSlug: optionalString;
  products: Array<Product> = [];
  paginatedProducts: PaginatedProducts;
  counter: number;
  currentPage = 1;
  discovering = false;
  sortOptions = ProductSortingOptions;
  queryParams: Params;
  apiSubscription: Subscription;
  dataNotFound = false;
  crumb: Array<Breadcrumb> = [];
  isLoading = true;
  readonly Colors = Colors;
  selectedBrand = '';
  selectedCategory: '';
  categories: Array<Category> = [];
  brands: Array<any>;
  showDescriptionText = false;
  private settings: Setting[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private apiService: ApiService,
    private router: Router,
    private dataService: DataService,
    private breadcrumbPipe: BreadcrumbPipe,
    @Inject(PLATFORM_ID) private platformID
  ) {}

  ngOnInit(): void {
    this.helpersService.showSearchField();
    this.getSettings();
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if (isPlatformBrowser(this.platformID)) {
        closeMobileMegaMenu();
        this.helpersService.dataService.setShowFooter(false);
        this.queryParams = queryParams;
        this.currentPage = 1;
        this.products = [];
        /* if (isEmpty(this.queryParams.sort)) {
             this.queryParams = {sort: 'recently-added', ...this.queryParams};
           }*/
        this.isLoading = true;
        this.resolvePage();
      }
    });
  }
  showDescription(): void {
    this.showDescriptionText = true;
  }
  getSettings(): void {
    this.dataService.getSettings().subscribe((settings) => {
      this.settings = settings;
    });
  }
  getSettingValue = (key) => {
    const setting = this.settings && this.settings.find((x) => x.key === key);
    if (setting) {
      return setting.value;
    }
    return '';
  };
  resolvePage(): void {
    this.discovering = true;
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
    this.apiSubscription = this.apiService
      .getProducts({ ...this.queryParams, page: this.currentPage })
      .subscribe(
        (response) => {
          this.paginatedProducts = response.products;
          if (this.products.length) {
            this.products = this.products.concat(this.paginatedProducts.data);
          } else {
            this.products = this.paginatedProducts.data;
          }
          console.log(this.products);
          
          this.discovering = false;
          this.counter = response.counter;
          this.getCategories();
          this.brands = response.brands;
          // this.resolveCurrentCategory();
          this.resolveBreadCrumb();
          resolveDataNotFound(
            this.products,
            (notFound) => (this.dataNotFound = notFound)
          );
          this.isLoading = false;
          this.helpersService.dataService.setShowFooter(true);
        },
        (error) => {
          this.helpersService.dataService.setShowFooter(true);
          resolveDataNotFound([], (notFound) => (this.dataNotFound = notFound));
          this.helpersService.showResponseErrorMessage(error);
          this.isLoading = false;
          this.discovering = false;
        }
      );
  }
  getCategories(): void {
    this.apiService
      .getCategories({ ...this.queryParams, page: this.currentPage })
      .subscribe(
        (response) => {
          this.categories = response.categories;
        },
        (error) => {}
      );
  }

  next(): void {
    ++this.currentPage;
    this.discovering = true;
    this.resolvePage();
  }

  onSortingChange(event): void {
    this.router.navigate([this.getPath()], {
      queryParams: { sort: event.target.value },
      queryParamsHandling: 'merge',
    });
  }

  getPath(): string {
    let path = `/products`;
    if (this.slug) {
      path += `/${this.slug}`;
    }
    if (this.nextSlug) {
      path += `/${this.nextSlug}`;
    }

    return path;
  }

  resolveBreadCrumb(): void {
    const crumb = [];
    crumb.push(new Breadcrumb('Products'));
    if (this.queryParams.brands) {
      crumb.push(
        new Breadcrumb(this.breadcrumbPipe.transform(this.queryParams.brands))
      );
    } else if (this.queryParams.categories) {
      crumb.push(
        new Breadcrumb(
          this.breadcrumbPipe.transform(this.queryParams.categories)
        )
      );
    }
    this.crumb = crumb;
  }

  trackById = (index: number, product: Product): number => product?.id;

  onFilter = (params) => {
    params.page = 1;
    this.queryParams = params;
    this.router.navigate(['/products'], {
      queryParams: this.queryParams,
      queryParamsHandling: 'merge',
    });
  };
}
