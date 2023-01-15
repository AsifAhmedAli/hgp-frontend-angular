import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {HelpersService} from "../../shared/services/helpers.service";
import {DataService} from "../../shared/services/data.service";
import {StaticPage} from "../../shared/interfaces/pages/static-page.response";

@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.css']
})
export class PageTemplateComponent implements OnInit, OnDestroy {

  slug = '';
  pageTitle: string;
  pageBody: any;
  subscription: Subscription;
  isPageProcessingComplete = false;

  constructor(
      private activatedRoute: ActivatedRoute,
      private helpersService: HelpersService,
      private dataService: DataService,
  ) {
  }

  ngOnInit(): void {
    this.dataService.setShowFooter(false);
    this.activatedRoute.params.subscribe(
        (params: Params) => {
          this.slug = params.slug;
          this.resolvePage();
        }
    );

  }

  resolvePage(): void {
    if (this.slug) {
      this.helpersService.scrollToTop();
      this.helpersService.resolveCMSPage(this.slug);
      this.subscription = this.helpersService.dataService.getStaticPage().subscribe(
          (page: StaticPage) => {
            // async check
            if (page) {
              this.pageTitle = page.name;
              this.pageBody = page.body;
              this.slug = page.slug;
              if (this.pageTitle) {
                this.helpersService.setTitle(this.pageTitle);
              }
              this.helpersService.setPageMetaInfo(
                  page?.meta_title,
                  page?.meta_keywords,
                  page?.meta_description,
              );
              this.completePageProcessing();
            }
            this.dataService.setShowFooter(true);
          }
      );
    }
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
