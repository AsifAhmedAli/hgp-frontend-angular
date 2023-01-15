import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HelpersService } from '../shared/services/helpers.service';
import { ApiService } from '../shared/services/api.service';

import { IAlbum, Lightbox } from 'ngx-lightbox';
import {
  Colors,
  SlickProduct,
  SlickProductThumb,
} from '../shared/constants/config.constants';
import { isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { Breadcrumb } from '../shared/models/breadcrumb';
import { DataService } from '../shared/services/data.service';
import { SelectedVariantModel } from '../shared/models/selected-variant.model';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { optional } from '../shared/types/types';
import { Messages, ValidationMessages } from '../shared/constants/constants';
import { FormGroup } from '@angular/forms';
import { FormsService } from '../shared/services/forms.service';
import { closeCartSidebar } from '../shared/functions/core.function';
import { Product, Review } from '../shared/interfaces/products.model';
import { Slick } from '../shared/constants/Slick.config';
import { Setting } from '../shared/interfaces/header.response';
import { closeMobileMegaMenu } from '../shared/functions/project.function';

declare var lightGallery: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  settings: Setting[];
  title: string;
  sku: string;
  product: Product;
  currentPath = '/product';
  fragment: string;
  media: Array<IAlbum> = [];
  readonly slideConfig = SlickProduct;
  readonly slickThumbConfig = SlickProductThumb;
  readonly Colors = Colors;
  shareURL: string;
  crumbs: Array<Breadcrumb> = [];
  quantity = 1;
  isAddingToCart = false;
  variantParams: HttpParams = new HttpParams();
  getVariantApiSubscription: Subscription;
  getSelectedVariantsSubscription: Subscription;
  alreadyGottenPrices: Array<any> = [];
  messages = ValidationMessages;
  notifications = Messages;
  isSubmitting = false;
  addRatingForm: FormGroup;
  private reviewSubscription: Subscription;
  pleaseSelectRating = false;
  rating = 0;
  private productId: number;
  private authSubscription: Subscription;
  isAuthenticated = false;
  reviewsEnable = false;
  relatedSliderConfig = Slick.relatedSlider;
  optionsLoader = false;
  private isOptionDropdownSelected = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private apiService: ApiService,
    private lightbox: Lightbox,
    private titleCasePipe: TitleCasePipe,
    @Inject(PLATFORM_ID) private platformID,
    private dataService: DataService,
    private formService: FormsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSettings();
    this.helpersService.dataService.setShowFooter(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.addRatingForm = this.formService.addRatingForm();
    this.activatedRoute.params.subscribe((params: Params) => {
      if (isPlatformBrowser(this.platformID)) {
        closeCartSidebar();
        closeMobileMegaMenu();
      }
      this.sku = params.slug;
      this.helpersService.scrollToTop();
      // this.resetEverything();
      this.resolvePage();
      this.helpersService.hideMobileMegaMenu();
    });
    this.activatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.fragment = fragment;
      } else {
        this.fragment = 'description';
      }
    });
    this.getSelectedVariantsSubscription = this.dataService
      .getSelectedVariants()
      .subscribe((selected) => {
        this.resolvePriceParams(selected);
        if (this.product) {
          // this.getVariantPrice();
        }
      });
    this.authSubscription = this.helpersService.authService
      .getIsAuthenticated()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
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

  /*getVariantPrice(): void {
    const alreadyGotten = this.getLocalVariantPrice();
    if (alreadyGotten) {
      this.product.price.retailPrice = alreadyGotten;
    } else {
      if (this.getVariantApiSubscription) {
        this.getVariantApiSubscription.unsubscribe();
      }
      this.getVariantApiSubscription = this.apiService.getVariantPrice(this.product, this.variantParams).subscribe(
        res => {
          this.product.price.retailPrice = res.formatted;
          this.alreadyGottenPrices[this.variantParams.toString()] = res.formatted;
        }
      );
    }
  }*/

  getLocalVariantPrice(): optional {
    return this.alreadyGottenPrices[this.variantParams.toString()];
  }

  resolvePriceParams(selectedVariants: Array<SelectedVariantModel>): void {
    let params = new HttpParams();

    for (const selectedVariant of selectedVariants) {
      let options = `options[${selectedVariant.option.id}]`;
      if (selectedVariant.type === 'checkbox') {
        options += '[]';
      }
      params = params.append(options, selectedVariant.value.id.toString());
    }

    this.variantParams = params;
  }

  resolvePage(): void {
    if (this.isOptionDropdownSelected) this.optionsLoader = true;
    this.apiService.getProduct(this.sku).subscribe(
      (response) => {
        this.resetEverything();
        this.currentPath += `/${this.sku}`;
        this.fragment = 'description';
        this.product = response.product;
        this.setBarCode();
        this.setDimensions();
        this.helpersService.setProductMetaInfo(this.product);
        // this.reviewsEnable = response.reviews_enabled;
        // this.productId = response.product[0].id;
        // this.product.categories = convertCategoriesNamesAndPaths(this.product.categories);
        this.helpersService.setTitle(this.product.name);
        this.resolveBreadCrumb();
        this.makeLightboxAlbum();
        this.resolveShareUrl();
        if (isPlatformBrowser(this.platformID)) {
          setTimeout(
            () =>
              lightGallery(document.getElementById('lightgallery'), {
                selector: '.slide a',
                share: false,
                autoplay: false,
                autoplayControls: false,
                actualSize: false,
                download: false,
              }),
            1000
          );
        }
        this.optionsLoader = false;
        this.helpersService.dataService.setShowFooter(true);
      },
      (error) => {
        this.helpersService.dataService.setShowFooter(true);
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }

  setBarCode = () => {
    const barCodesArr = [];
    this.product.bar_codes.forEach((barCode) => {
      barCodesArr.push(`${barCode.barcode} (${barCode.barcodeType})`);
    });
    const barcodes = barCodesArr.join('<br>');
    this.product.specifications.push({
      product_recid: this.product.recid,
      attribute: 'Barcodes',
      value: barcodes,
      dataType: 7,
    });
  };

  setDimensions = () => {
    const dimension = this.product.dimensions.find(
      (x) =>
        x.uom.toLocaleLowerCase() ===
        this.product.defaultuom.toLocaleLowerCase()
    );
    if (dimension) {
      this.product.specifications.unshift({
        product_recid: dimension.product_recid,
        attribute: 'Package Dimensions',
        value: `${dimension.depth}L x ${dimension.width}W x ${dimension.height}H`,
        dataType: 5,
      });

      this.product.specifications.unshift({
        product_recid: dimension.product_recid,
        attribute: 'Shipping Weight',
        value: `${dimension.weight} lbs.`,
        dataType: 5,
      });
    }
  };

  onRatingSet = (selectedRating) => {
    this.rating = selectedRating;
    this.pleaseSelectRating = false;
  };

  // tslint:disable-next-line:typedef
  unAuthorizeMessage() {
    this.helpersService.error(
      this.notifications.loginFirstToAddReview,
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
        .addProductReview(
          this.product.id,
          this.addRatingForm.value.review,
          this.rating
        )
        .subscribe(
          (response) => {
            this.product.reviews = response.result;
            this.isSubmitting = false;
            this.rating = 0;
            this.addRatingForm.reset();
            this.helpersService.success(response.message, 'Success !');
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

  makeLightboxAlbum(): void {
    this.media = [];
    for (const item of this.product.images) {
      this.media.push({
        src: item.url,
        caption: item.docName,
        thumb: item.url,
      });
    }
  }

  openLightbox(i: number): void {
    this.lightbox.open(this.media, i);
  }

  trackReviewById(index: number, review: Review): number {
    return review?.id;
  }

  trackRelatedProductById(index: number, product: Product): number {
    return product.id;
  }

  trackProductAttributeById(index: number, productAttribute: any): number {
    return productAttribute.id;
  }

  resolveShareUrl(): void {
    if (isPlatformBrowser(this.platformID)) {
      const baseURL = window.location.origin;
      this.shareURL = `${baseURL}/product/${this.product.sku}`;
    }
  }

  resolveBreadCrumb(): void {
    const crumbs: Array<Breadcrumb> = [];
    if (this.product) {
      /*for (const category of this.product.categories) {
        if (category.parent) {
          crumbs.push(new Breadcrumb(category.parent.name, `/products/${category.parent.slug}`));
        }
        crumbs.push(new Breadcrumb(category.fullName, category.fullPath));
      }*/
      if (this.product.category.parent) {
        crumbs.push(
          new Breadcrumb(this.product.category.parent.name, `/products`, {
            categories: this.product.category.parent.short_name,
          })
        );
      }
      crumbs.push(
        new Breadcrumb(this.product.category.name, `/products`, {
          categories: this.product.category.short_name,
        })
      );
      crumbs.push(new Breadcrumb(this.product.name));
    }

    this.crumbs = crumbs;
    this.helpersService.dataService.setShowFooter(true);
  }

  increaseQty(): void {
    if (this.quantity) {
      if (this.quantity < this.product.qty) {
        this.quantity += 1;
      }
    }
  }

  decreaseQty(): void {
    if (this.quantity && this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  onAddingToCart(isAdding): void {
    this.isAddingToCart = isAdding;
  }

  onAddedToCart(): void {
    this.quantity = 1;
  }

  resetEverything(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.product = null;
    this.dataService.setSelectedVariants([]);
    this.variantParams = new HttpParams();
    this.dataService.setRequiredUnfilledIDs([]);
    this.quantity = 1;
    this.alreadyGottenPrices = [];
    this.currentPath = '/product';
  }

  ngOnDestroy(): void {
    this.resetEverything();
    if (this.getSelectedVariantsSubscription) {
      this.getSelectedVariantsSubscription.unsubscribe();
    }
    if (this.getVariantApiSubscription) {
      this.getVariantApiSubscription.unsubscribe();
    }
  }

  onOptionSelection = (sku) => {
    this.isOptionDropdownSelected = true;
    this.router.navigate(['/product', sku]);
  };
}
