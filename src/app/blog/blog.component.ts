import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HelpersService} from '../shared/services/helpers.service';
import {Subscription} from 'rxjs';
import {Constants, Messages} from '../shared/constants/constants';
import {Blog, BlogPagination} from '../shared/interfaces/blog/blog.response';
import {ApiService} from '../shared/services/api.service';
import {exists, resolveDataNotFound} from '../shared/functions/core.function';
import {closeMobileMegaMenu} from "../shared/functions/project.function";
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  title: string;
  subscription: Subscription;
  blogs: Array<Blog> = [];
  paginatedRecords: BlogPagination;
  readonly CONSTANTS = Constants;
  readonly Messages = Messages ;
  currentPage = 1;
  dataNotFound = true;
  isPageProcessingComplete = false;
  private queryParams: Params;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private apiService: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformID: any,
  ) {
  }

  ngOnInit(): void {
    this.helpersService.showSearchField();
    this.helpersService.scrollToTop();
    this.helpersService.dataService.setShowFooter(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        if (isPlatformBrowser(this.platformID)) {
          closeMobileMegaMenu()
          this.queryParams = params;
          this.currentPage = params.page;
          if (this.currentPage == 1) {
            this.helpersService.scrollToTop()
          } else {
            this.helpersService.scrollToTop(500, 500);
            this.isPageProcessingComplete = false;
          }
          this.resolvePage();
        }

      }
    );
  }
  resolvePage(): void {
    this.subscription = this.apiService.getBlog({page: this.currentPage, ...this.queryParams}).subscribe(
      response => {
        this.paginatedRecords = response.blogs;
        this.blogs = this.paginatedRecords.data;
        if (this.blogs.length === 0 && this.currentPage > 1) {
          this.router.navigate(['/blog'], {queryParams: {page: +this.currentPage - 1}});
        }
        resolveDataNotFound(this.blogs, notFound => this.dataNotFound = notFound);
        this.completePageProcessing();
        this.helpersService.dataService.setShowFooter(true);
      },
      error => {

        this.completePageProcessing();
        this.helpersService.dataService.setShowFooter(true);
        if (error.status === 400) {
          this.helpersService.redirectTo404();
        } else {
          this.helpersService.showResponseErrorMessage(error);
        }
        resolveDataNotFound(this.blogs, notFound => this.dataNotFound = notFound);

      }
    );
  }

  completePageProcessing(): void {
    this.isPageProcessingComplete = true;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
