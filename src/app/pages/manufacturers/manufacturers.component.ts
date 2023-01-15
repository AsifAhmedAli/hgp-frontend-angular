import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {Subscription} from 'rxjs';
import {BrandInterface, PaginatedBrands} from '../../shared/interfaces/pages/static-page.response';
import {ApiService} from '../../shared/services/api.service';
import {resolveDataNotFound} from '../../shared/functions/core.function';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit, OnDestroy {

  title: string;
  brands: Array<BrandInterface> = [];
  paginatedBrands: PaginatedBrands;
  private apiSubscription: Subscription;
  private currentPage = 1;
  queryParams: Params;
  dataNotFound = false;
  discovering = false;
  isPageProcessingComplete = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.resolvePage();
  }

  resolvePage(): void {
    this.apiSubscription = this.apiService.getBrands(
      {page: this.currentPage, ...this.queryParams}
    ).subscribe(
      response => {
        this.paginatedBrands = response.brands;
        if (this.brands.length) {
          this.brands = this.brands.concat(this.paginatedBrands.data);
        } else {
          this.brands = this.paginatedBrands.data;
        }
        resolveDataNotFound(this.brands, notFound => this.dataNotFound = notFound);
        this.pageProcessingCompleted();
        this.helpersService.dataService.setShowFooter(true);
      },
      error => {
        this.pageProcessingCompleted();
        this.helpersService.dataService.setShowFooter(true);
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }

  next(): void {
    ++this.currentPage;
    this.discovering = true;
    this.resolvePage();
  }

  pageProcessingCompleted(): void {
    this.isPageProcessingComplete = true;
  }

  ngOnDestroy(): void {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }

}
