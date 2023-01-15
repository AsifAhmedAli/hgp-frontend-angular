import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {of, Subscription} from 'rxjs';
import {AboutUsPage, BrandInterface, Distribution, Offer} from '../../shared/interfaces/pages/static-page.response';
import {resolveDataNotFound} from '../../shared/functions/core.function';
import {Slick} from '../../shared/constants/Slick.config';
import {Team} from '../../shared/models/Homepage.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, OnDestroy {

  title: string;
  aboutPage: AboutUsPage;
  distributions: Array<Distribution> = [];
  teams: Array<Team> = [];
  offers: Array<Offer> = [];
  isPageProcessingIsdDone = false;
  private subscription: Subscription;
  brands: Array<BrandInterface> = [];
  dataNotFound = false;
  isVideoPlaying = false;
  readonly sliderConfig = Slick.aboutSlider;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService
  ) {
  }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.resolvePage();
  }

  pageProcessingIsDone(): void {
    this.isPageProcessingIsdDone = true;
  }

  resolvePage(): void {
    this.helpersService.scrollToTop();
    this.subscription = this.helpersService.apiService.getAboutUsPage().subscribe(
      response => {
        this.aboutPage = response.result.page;
        this.distributions = response.result.distributions;
        this.offers = response.result.offers;
        this.offers.forEach(x => {
          x.readMore = false;
        });
        this.teams = response.result.teams;
        this.pageProcessingIsDone();
        resolveDataNotFound(this.brands, notFound => this.dataNotFound = notFound);
        this.helpersService.dataService.setShowFooter(true);
      },
      error => {
        this.pageProcessingIsDone();
        this.helpersService.showResponseErrorMessage(error);
        this.helpersService.dataService.setShowFooter(true);
      }
    );

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
