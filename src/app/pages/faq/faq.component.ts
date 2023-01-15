import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {Subscription} from 'rxjs';
import {Faq, FaqCategory} from '../../shared/interfaces/faq';
import {resolveDataNotFound} from '../../shared/functions/core.function';
import {Messages} from '../../shared/constants/constants';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, OnDestroy {
  title: string;
  private subscription: Subscription;
  faqCategories: FaqCategory[] = [];
  isPageProcessingIsdDone = false;
  faqs: Faq[] = [];
  currentPath = '/faqs';
  private fragmentSubscription: Subscription;
  private categorySlug = null;
  private query: any;
  searchLoading = false;
  private selectedFaqCategoryId: number;
  fragment: string;
  dataNotFound = false;
  readonly MESSAGES = Messages;
  private selectCategoryFaqs: Faq[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService
  ) {
  }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.fragmentSubscription = this.activatedRoute.fragment.subscribe(
        categorySlug => {
          if (categorySlug) {
            this.categorySlug = categorySlug;
            this.fragment = categorySlug;
            this.faqsByCategory();
          }else {
            this.resolvePage();
          }
        }
    );
  }

  onQuery(event): void {
    this.query = event.target.value;
    if (this.query != '') {
      this.searchFaqs();
    } else {
      this.stopSearchLoading();
      if (this.categorySlug){
        this.faqsByCategory();
      }else {
        this.resolvePage();
      }
    }
  }
  startSearchLoading(){
    this.searchLoading = true;
  }

  stopSearchLoading() {
    this.searchLoading = false;
  }
  searchFaqs(): void {
    this.startSearchLoading();
    this.subscription = this.helpersService.apiService.searchFaqs(this.query, this.categorySlug).subscribe(
      response => {
        this.faqs = response.faqs;
        this.faqCategories = response.faqCategories;
        this.stopSearchLoading();
        this.checkFaqsFoundOrNot();
      },
      error => {
        this.stopSearchLoading();
        this.helpersService.showResponseErrorMessage(error);
      }
    );

  }
  checkFaqsFoundOrNot(){
    resolveDataNotFound(this.faqs, notFound => this.dataNotFound = notFound);
  }
  faqsByCategory(): void {
    this.subscription = this.helpersService.apiService.getFAQsByCategory(this.categorySlug).subscribe(
      response => {
        this.faqs = response.faqs;
        this.selectCategoryFaqs = response.faqs;
        this.faqCategories = response.faqCategories;
        this.pageProcessingIsDone();
        this.checkFaqsFoundOrNot();
      },
      error => {
        this.dataNotFound = true;
        this.pageProcessingIsDone();
        this.helpersService.showResponseErrorMessage(error);
      }
    );

  }
  resolvePage(): void {
    this.helpersService.scrollToTop();
    this.subscription = this.helpersService.apiService.getFAQS().subscribe(
      response => {
        this.faqs = response.faqs;
        this.selectCategoryFaqs = this.faqs;
        this.faqCategories = response.faqCategories;
        this.categorySlug = response.openCategorySlug;
        this.fragment = this.categorySlug;
        this.pageProcessingIsDone();
        this.helpersService.dataService.setShowFooter(true);
        this.checkFaqsFoundOrNot();
      },
      error => {
        this.dataNotFound = true;
        this.pageProcessingIsDone();
        this.helpersService.dataService.setShowFooter(true);
      }
    );

  }
  pageProcessingIsDone(): void {
    this.isPageProcessingIsdDone = true;
  }
  onResetSearch() {
    this.faqs = this.selectCategoryFaqs;
    this.checkFaqsFoundOrNot();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
