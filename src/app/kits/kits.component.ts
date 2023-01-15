import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Colors } from '../shared/constants/config.constants';
import { Breadcrumb } from '../shared/models/breadcrumb';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import {
  Messages,
  ValidationMessages,
  HydroKitSizes,
  DefaultKitSize,
} from '../shared/constants/constants';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HelpersService } from '../shared/services/helpers.service';
import { ApiService } from '../shared/services/api.service';
import { isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { DataService } from '../shared/services/data.service';
import { FormsService } from '../shared/services/forms.service';
import { closeMobileMegaMenu } from '../shared/functions/project.function';
import { Kit, Review } from '../shared/interfaces/kits.interface';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../shared/interfaces/products.model';
declare const FloatLabel: any;

@Component({
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.css'],
})
export class KitsComponent implements OnInit, OnDestroy {
  title: string;
  id: string;
  kit: Kit;
  oneAtATime = true;
  products: Product[];
  currentPath = '/kit';
  fragment: string;
  readonly Colors = Colors;
  crumbs: Array<Breadcrumb> = [];
  messages = ValidationMessages;
  notifications = Messages;
  isSubmitting = false;
  addRatingForm: FormGroup;
  private reviewSubscription: Subscription;
  pleaseSelectRating = false;
  rating = 0;
  private authSubscription: Subscription;
  isAuthenticated = false;
  optionsLoader = false;
  private isOptionDropdownSelected = false;
  isAdding = false;
  pageLoading = true;
  kits: Array<Kit>;
  attachment: any;
  showReviews = 5;
  loadReviews = false;
  reviews: Review[];
  searchKeyword: string;
  reviewsInput: string;
  kitName: string;
  sizes: {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private apiService: ApiService,
    private titleCasePipe: TitleCasePipe,
    @Inject(PLATFORM_ID) private platformID,
    private dataService: DataService,
    private formService: FormsService,
    private router: Router,
    private location: Location,
    private toastr: ToastrService
  ) {
    this.sizes = HydroKitSizes;
  }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.addRatingForm = this.formService.addRatingForm();
    FloatLabel.init();
    this.activatedRoute.params.subscribe((params: Params) => {
      if (isPlatformBrowser(this.platformID)) {
        closeMobileMegaMenu();
        this.id = params.id;
        this.helpersService.scrollToTop();
        this.helpersService.hideMobileMegaMenu();
      }
    });
    this.resolvePage();
    this.activatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.fragment = fragment;
      } else {
        this.fragment = 'description';
      }
    });
    this.authSubscription = this.helpersService.authService
      .getIsAuthenticated()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  changeKitSize(value): void {
    this.getKitSize(value);
  }
  resolvePage(): void {
    if (this.isOptionDropdownSelected) {
      this.optionsLoader = true;
    }
    this.getKit();
    this.allKits();
  }

  getKit(): void {
    this.apiService.getKit(this.id).subscribe(
      (response) => {
        this.pageLoading = false;
        this.resetEverything();
        this.currentPath += `/${this.id}`;
        this.kit = response.result;
        this.products = response.result.products;
        this.reviews = this.kit.reviews;
        this.helpersService.setTitle(this.kit.name);
        this.resolveBreadCrumb();
        this.resolveShareUrl();
        this.optionsLoader = false;
        this.helpersService.dataService.setShowFooter(true);
      },
      (error) => {
        this.pageLoading = false;
        this.helpersService.dataService.setShowFooter(true);
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }

  getKitSize(size): void {
    if (size !== '') {
      this.apiService.getKitSize(this.kit.name, size).subscribe(
        (response) => {
          if (response.status) {
            this.pageLoading = false;
            this.resetEverything();
            this.currentPath += `/${this.id}`;
            this.kit = response.result;
            this.products = response.result.products;
            this.reviews = this.kit.reviews;
            this.helpersService.setTitle(this.kit.name);
            this.resolveBreadCrumb();
            this.resolveShareUrl();
            this.changeParam();
            this.optionsLoader = false;
            this.helpersService.dataService.setShowFooter(true);
          } else {
            this.toastr.error(response.message);
          }
        },
        (error) => {
          this.pageLoading = false;
          this.helpersService.dataService.setShowFooter(true);
          this.helpersService.showResponseErrorMessage(error);
        }
      );
    }
  }
  changeParam(): void {
    this.location.replaceState(`/kit/${this.kit.id}`);
  }
  onRatingSet = (selectedRating) => {
    this.rating = selectedRating;
    this.pleaseSelectRating = false;
  };

  // tslint:disable-next-line:typedef
  unAuthorizeMessage() {
    this.helpersService.warning(
      this.notifications.loginFirstToAddKitReview,
      this.notifications.unAuthenticated
    );
  }

  // tslint:disable-next-line:typedef
  onAddReview() {
    if (!this.isAuthenticated) {
      this.unAuthorizeMessage();
      return;
    }
    if (this.addRatingForm.valid) {
      if (!this.rating) {
        this.pleaseSelectRating = true;
        return;
      }
      this.isSubmitting = true;
      // tslint:disable-next-line:max-line-length
      this.reviewSubscription = this.helpersService.authService
        .addKitReview(
          this.id,
          this.addRatingForm.value.review,
          this.rating,
          this.addRatingForm.value.image
        )
        .subscribe(
          (response) => {
            this.isSubmitting = false;
            this.attachment = null;
            this.rating = 0;
            this.addRatingForm.reset();
            this.helpersService.success(response.message, 'Success !');
            this.kit.reviews.push(response.review);
          },
          (error) => {
            this.isSubmitting = false;
          }
        );
    } else {
      this.addRatingForm.markAllAsTouched();
      if (!this.rating) {
        this.pleaseSelectRating = true;
      }
    }
  }
  resolveShareUrl(): void {
    if (isPlatformBrowser(this.platformID)) {
      const baseURL = window.location.origin;
    }
  }

  resolveBreadCrumb(): void {
    const crumbs: Array<Breadcrumb> = [];
    this.crumbs = crumbs;
    this.helpersService.dataService.setShowFooter(true);
  }

  resetEverything(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.kit = null;
    this.currentPath = '/kit';
  }

  ngOnDestroy(): void {
    this.resetEverything();
  }

  allKits(): void {
    this.apiService.allKits().subscribe((response) => {
      this.kits = response.result;
      this.kits[0].active = true;
    });
  }

  onSelectKit(kit: Kit): void {
    this.kit = kit;
    this.reviews = this.kit.reviews;
    this.getKitSize(DefaultKitSize);
    this.changeParam();
  }

  onAttachment(event): void {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.addRatingForm.patchValue({ image: event.target.result });
          this.attachment = event.target.result;
        };
        if (event.target.files[i].type.indexOf('image') !== -1) {
          reader.readAsDataURL(event.target.files[i]);
        }
      }
    }
  }

  loadMore(): void {
    this.loadReviews = true;
    setTimeout(() => {
      this.showReviews = this.showReviews + 5;
      this.loadReviews = false;
    }, 1000);
  }

  onSearch(event): void {
    if (event.target.value) {
      this.reviews = this.kit.reviews.filter((x) =>
        x.comment.includes(event.target.value)
      );
    } else {
      this.reviews = this.kit.reviews;
    }
  }
}
