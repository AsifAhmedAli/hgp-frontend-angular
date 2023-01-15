import {Component, OnDestroy, OnInit} from '@angular/core';
import {resolveDataNotFound} from "../../shared/functions/core.function";
import {ActivatedRoute} from "@angular/router";
import {HelpersService} from "../../shared/services/helpers.service";
import {Subscription} from "rxjs";
import {Faq} from "../../shared/interfaces/faq";
import {HowItWork} from "../../shared/interfaces/how-it-work";
import {Messages} from "../../shared/constants/constants";

@Component({
    selector: 'app-how-it-work',
    templateUrl: './how-it-work.component.html',
    styleUrls: ['./how-it-work.component.css']
})
export class HowItWorkComponent implements OnInit, OnDestroy {
    isPageProcessingIsdDone: boolean;
    title: string;
    private subscription: Subscription;
    faqs: Faq[] = [];
    page: HowItWork;
    NoFaqFound = false;
    showBookDownloadButton = false;
    private query: any;
    searchLoading = false;
    private allFaqs: Faq[];
    readonly MESSAGES = Messages;

    constructor(
        private activatedRoute: ActivatedRoute,
        private helpersService: HelpersService
    ) {
    }

    ngOnInit(): void {
        this.helpersService.dataService.setShowFooter(false);
        // this.title = this.helpersService.resolveTitle(this.activatedRoute);
        this.resolvePage();
    }

    pageProcessingIsDone(): void {
        this.isPageProcessingIsdDone = true;
    }

    resolvePage(): void {
        this.helpersService.scrollToTop();
        this.subscription = this.helpersService.apiService.getHowItWork().subscribe(
            response => {
                this.faqs = response.faqs;
                this.allFaqs = response.faqs;
                this.page = response.how_it_work;
                this.helpersService.setTitle(this.page?.name);
                if (this.page.upload_book && !(this.page.upload_book instanceof Array)) {
                    this.page.upload_book = JSON.parse(this.page.upload_book);
                    if (this.page.upload_book && this.page.upload_book.length > 0) {
                        this.showBookDownloadButton = true;
                    }
                } else {
                    this.showBookDownloadButton = false
                }
                this.pageProcessingIsDone();
                resolveDataNotFound(this.faqs, notFound => this.NoFaqFound = notFound);
                this.helpersService.dataService.setShowFooter(true);
                this.helpersService.setPageMetaInfo(
                    this.page?.meta_title,
                    this.page?.meta_keywords,
                    this.page?.meta_description,

                );
            },
            error => {
                this.pageProcessingIsDone();
                this.helpersService.showResponseErrorMessage(error);
                this.helpersService.dataService.setShowFooter(true);
            }
        );

    }

    redirectTo(url: string) {
        if (url)
            window.location.href = url
    }

    onQuery(event) {
        this.query = event.target.value;
        if (this.query !== '') {
            this.searchFaqs()
        }else {
            this.faqs = this.allFaqs
            resolveDataNotFound(this.faqs, notFound => this.NoFaqFound = notFound);
        }
    }

    searchFaqs(): void {
        this.startSearchLoading();
        this.subscription = this.helpersService.apiService.searchFaqsFromHowItWork(this.query).subscribe(
            response => {
                this.faqs = response.faqs;
                this.checkFaqExistOrNot()
                this.stopSearchLoading()
            },
            error => {
                this.stopSearchLoading()
                this.helpersService.showResponseErrorMessage(error);
            }
        );

    }

    startSearchLoading() {
        this.searchLoading = true
    }

    stopSearchLoading() {
        this.searchLoading = false
    }

    onResetSearch() {
        this.faqs = this.allFaqs;
        this.checkFaqExistOrNot()
    }

    private checkFaqExistOrNot() {
        resolveDataNotFound(this.faqs, notFound => this.NoFaqFound = notFound);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
