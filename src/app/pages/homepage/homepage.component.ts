import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {Subscription} from 'rxjs';
import {ApiService} from '../../shared/services/api.service';
import {Slick} from '../../shared/constants/Slick.config';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {HomepageModel} from '../../shared/models/Homepage.model';
import {Colors} from '../../shared/constants/config.constants';
import {Quicklinks} from '../../shared/models/quicklinks';
import {AlgoliaService} from '../../shared/services/algolia.service';
import {KitSizes, Messages} from '../../shared/constants/constants';
import {Kit, KitSliders} from '../../shared/interfaces/kits.interface';
import {Testimonials} from '../../shared/interfaces/testimonials.interface';
import {Videos} from '../../shared/interfaces/videos.interface';
import {DataService} from '../../shared/services/data.service';

declare var $: any;
declare var scrollToKits: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  homepageSubscription: Subscription;
  homepageData: HomepageModel;
  manufacturers: any[] = [];
  currentPackagePrice: number;
  blogSliderConfig = Slick.blogSlider;
  categorySliderConfig = Slick.categorySlider;
  testimonialTextSliderConfig = Slick.homeTextTestimonials;
  subsliderConfig = Slick.subsliderimage;
  query = '';
  quickLinks: Array<Quicklinks> = [];
  hits: any[] = [];
  kits: Kit[] = [];
  kitSliders: KitSliders[] = [];
  testimonials: Testimonials[] = [];
  videos: Videos[] = [];
  rating: any;
  index: any;
  noRecordFound = false;
  loading = false;
  readonly Colors = Colors;
  readonly MESSAGES = Messages;
  showBookDownloadButton: boolean;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  body = document.getElementsByTagName('body')[0];
  public selectedKit: Kit;
  public smallKit: Kit;
  public mediumKit: Kit;
  public largeKit: Kit;
  currentCategoryIndex = 0;
  isAdding = false;
  isAdding2 = false;
  isAdding3 = false;
  scrollToKitSubscription: Subscription;
  kitId: number = 0;
  slideOne: boolean = true;
  slideTwo: boolean = false;
  slideThree: boolean = false;
  showDescription = true;
  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private helpersService: HelpersService,
      private apiService: ApiService,
      private algoliaService: AlgoliaService,
      private dataService: DataService
  ) {
    this.index = algoliaService.getIndex();
    this.helpersService.dataService.setShowFooter(false);
  }

  ngOnInit(): void {
    this.helpersService.dataService.setShowSearchBar(false);
    this.helpersService.resolveTitle(this.activatedRoute);
    this.getHome();
    this.body.classList.add('home-page');
    this.scrollToKitSubscription = this.dataService.scrollToKits.asObservable().subscribe(scroll => {
      if (scroll) {
        scrollToKits();
        this.dataService.scrollToKits.next(false);
      }
    });
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
      });
    } else {
      this.hits = [];
    }
  }
  getHome(): void {
    this.homepageSubscription = this.apiService.getHomepage().subscribe(
      response => {
        this.homepageData = response.result;
        this.kits = this.homepageData.kits;
        this.kitSliders = this.homepageData.kit_sliders;
        this.testimonials = this.homepageData.testimonials;
        this.videos = this.homepageData.videos;
        this.adjustDataToShow();
        if (this.homepageData.homepage.bottom_section_download_book) {
          if (!(this.homepageData.homepage.bottom_section_download_book instanceof Array) && typeof this.homepageData.homepage.bottom_section_download_book != 'string') {
            this.homepageData.homepage.bottom_section_download_book = JSON.parse(this.homepageData.homepage.bottom_section_download_book);
          }
          if (this.homepageData.homepage.bottom_section_download_book && this.homepageData.homepage.bottom_section_download_book.length > 0) {
            this.showBookDownloadButton = true;
          }
        } else {
          this.showBookDownloadButton = false;
        }
        this.helpersService.dataService.setShowFooter(true);
        setTimeout(() => {
          this.activatedRoute.fragment.subscribe(fragment => {
            if (fragment === 'browse-kits-d') {
              scrollToKits();
            }
          });
        }, 50);
      }, error => {
          this.helpersService.showResponseErrorMessage(error);
        }
    );
  }
  adjustDataToShow(): void {
    if (this.kits && this.kits.length) {
      this.kits.forEach((kit, index) => {
        if (kit.features) {
          if (!(kit.features instanceof Array)) {
            this.kits[index].features = kit.features.split(',');
          }
          if (index === 0/*kit.size == KitSizes.small*/) {
            this.smallKit = kit;
          } else if (index === 1/*kit.size == KitSizes.medium*/) {
            this.mediumKit = kit;
          } else if(index === 2) {
            this.largeKit = kit;
          }
        }

      });
      this.currentPackagePrice  = this.smallKit.price;
    }
  }

  setManufacturers(data): void {
    Object.keys(data).forEach(key => {
      this.manufacturers.push(data[key].path);
    });
  }

  ngOnDestroy(): void {
    if (this.homepageSubscription) {
      this.homepageSubscription.unsubscribe();
    }

    this.body.classList.remove('home-page');
  }

  redirectTo(url: any, e?: any): void {
    if (url) {
      if(!url.startsWith('#')){
        this.router.navigate([url]);
      }else if(e && '#media-popup' === url){
        $('#media-popup iframe').attr("src", '/assets/video.html');
        $(e.target).closest(".home-page").addClass("show-popup");
      }
    }
  }

  resetHits() {
    this.hits = [];
  }

  /*alterDescriptionText(event, id): void {
    const element = document.getElementById(id);
    if (element.classList.contains('show-less')) {
      element.classList.remove('show-less');
      event.target.text = 'SHOW LESS';
    } else {
      element.classList.add('show-less');
      event.target.text = 'SEE MORE';
    }
  }*/

  slickGotoSlide(index, kitId): any {
   $('.subslider-track').slick('slickGoTo', index);
   this.kitId = kitId;
   /*this.slideOne = true;
   this.slideTwo = false;
   this.slideThree = false;*/
   return false;
  }
  slickGotoSlideOne() {
   $('.subslider-track').slick('slickGoTo', 0);
   this.slideOne = true;
   this.slideTwo = false;
   this.slideThree = false;
    return false;
  }

  slickGotoSlideTwo() {
    $('.subslider-track').slick('slickGoTo', 1);
    this.slideOne = false;
    this.slideTwo = true;
    this.slideThree = false;
     return false;
   }

   slickGotoSlideThree() {
    $('.subslider-track').slick('slickGoTo', 2);
    this.slideOne = false;
    this.slideTwo = false;
    this.slideThree = true;
     return false;
   }


}
