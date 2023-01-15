import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {Subscription} from 'rxjs';
import {DataService} from '../../shared/services/data.service';
import {exists, resolveDataNotFound} from '../../shared/functions/core.function';
import {ApiService} from '../../shared/services/api.service';
import {DocumentInterface, PaginatedDocuments} from '../../shared/interfaces/pages/static-page.response';
import {first} from 'rxjs/operators';
import {Category} from '../../shared/interfaces/header.response';
import {closeMobileMegaMenu} from "../../shared/functions/project.function";

@Component({
  selector: 'app-manuals',
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.css']
})
export class ManualsComponent implements OnInit, OnDestroy {
  title: string;
  private categoriesSubscription: Subscription;
  categories: Array<Category> = [];
  currentPath = '/manuals';
  fragment: any ;
  private firstCategoryId: number;
  documents: Array<DocumentInterface> = [];
  paginatedDocuments: PaginatedDocuments;
  private apiSubscription: Subscription;
  private currentPage = 1;
  queryParams: Params;
  dataNotFound = false;
  discovering = false;
  isPageProcessingComplete = false;
  selectedCategoryId: any;
  private fragmentSubscription: Subscription;
  private queryParamsSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.categoriesSubscription = this.dataService.getCategories().pipe(first()).subscribe(
      categories => {
        this.categories = categories;
        if (exists(this.categories)) {
          this.firstCategoryId = this.categories[0].id;
          this.fragment = this.firstCategoryId;
          this.selectedCategoryId = this.firstCategoryId
        }
      }
    );
    this.fragmentSubscription = this.activatedRoute.fragment.subscribe(
      fragment => {
        if (fragment) {
          this.fragment = fragment;
          this.selectedCategoryId = this.fragment
        }
      }
    );

    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        closeMobileMegaMenu();
        this.queryParams = queryParams;
        this.currentPage = 1;
        this.documents = [];
        this.resolvePage();
      }
    );
  }

  resolvePage(): void {
    this.apiSubscription = this.apiService.getDocuments(
      {category_id: this.selectedCategoryId, page: this.currentPage, ...this.queryParams}
    ).subscribe(
      response => {
        this.paginatedDocuments = response.documents;
        if (this.documents.length) {
          this.documents = this.documents.concat(this.paginatedDocuments.data);
        } else {
          this.documents = this.paginatedDocuments.data;
        }
        resolveDataNotFound(this.documents, notFound => this.dataNotFound = notFound);
        this.pageProcessingCompleted();
        this.helpersService.dataService.setShowFooter(true);
      },
      error => {
        this.pageProcessingCompleted();
        this.helpersService.showResponseErrorMessage(error);
        this.helpersService.dataService.setShowFooter(true);
      }
    );
  }
  getDocumentsByCategory(id): void {
    this.selectedCategoryId = id;
    this.documents = [];
    this.isPageProcessingComplete = false;
    this.currentPage = 1;
    this.discovering = false
    this.resolvePage();
  }
  next(): void {
    ++this.currentPage;
    this.discovering = true;
    this.resolvePage();
  }

  pageProcessingCompleted():void {
    this.isPageProcessingComplete = true;
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
