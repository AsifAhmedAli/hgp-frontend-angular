import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {DataService} from '../../shared/services/data.service';
import {AuthService} from '../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationMessages} from '../../shared/constants/constants';
import {MyOrder, MyOrdersPaginated} from '../../shared/interfaces/my-orders.response';
import {exists, getSortDirection, resolveDataNotFound} from '../../shared/functions/core.function';
import {Select2Model} from '../../shared/models/select2.model';
import {closeMobileMegaMenu} from "../../shared/functions/project.function";
import {Subscription} from "rxjs";
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  title: string;
  paginatedRecords: MyOrdersPaginated;
  orders: Array<MyOrder> = [];
  page = 'orders';
  currentPage: number;
  queryParams: Params = {page: 1};
  searchForm: FormGroup;
  MESSAGES = ValidationMessages;
  isSubmitting = false;
  formSubmitted = false;
  dataNotFound = false;
  private orderSubscription: Subscription;
  private routeSubscription: Subscription;
  searchByData = [
    new Select2Model('order_number', 'Order Number'),
    new Select2Model('tracking_number', 'Tracking Number'),
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformID,
  ) {
  }

  ngOnInit(): void {
    this.searchForm = this.buildSearchMyOrdersForm();
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.dataService.setPage(this.page);
    this.subscribe();
  }

  buildSearchMyOrdersForm(): FormGroup {
    return this.formBuilder.group({
      searchBy: [this.queryParams.searchBy, Validators.required],
      term: [this.queryParams.term, Validators.required]
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.router.navigate(['/my-account/orders'], {
        queryParams: {
          page: 1,
          ...this.searchForm.value
        },
        queryParamsHandling: 'merge'
      });
    } else {
      this.formSubmitted = true;
      this.searchForm.markAllAsTouched();
    }
  }

  subscribe(): void {
    this.routeSubscription = this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        if (isPlatformBrowser(this.platformID)) {
          closeMobileMegaMenu();
          this.queryParams = params;
          this.currentPage = this.queryParams.page;
          if (!exists(this.currentPage)) {
            this.currentPage = 1;
          }
          this.formSubmitted = false;
          this.resolvePage();
        }

      }
    );
  }

  resolvePage(): void {
    this.searchForm = this.buildSearchMyOrdersForm();
    this.orders = [];
    this.dataNotFound = false;
    this.orderSubscription = this.authService.getMyOrders(this.queryParams).subscribe(
      response => {
        this.paginatedRecords = response.orders;
        this.orders = this.paginatedRecords.data;
        this.isSubmitting = false;
        if (this.orders.length === 0 && this.currentPage > 1) {
          this.router.navigate(['/my-account/orders'], {queryParams: {page: +this.currentPage - 1}});
        }
        resolveDataNotFound(this.orders, notFound => this.dataNotFound = notFound);
        this.helpersService.dataService.setShowFooter(true);
      },
      error => {
        this.paginatedRecords = null;
        this.orders = [];
        this.isSubmitting = false;
        this.helpersService.showResponseErrorMessage(error);
        resolveDataNotFound(this.orders, notFound => this.dataNotFound = notFound);
        this.helpersService.dataService.setShowFooter(true);
      }
    );
  }

  getSortDirection(current: string = 'asc'): string {
    if (!current) {
      return 'desc';
    }
    return current === 'asc' ? 'desc' : 'asc';
  }

  onReset(): void {
    if (this.searchForm) {
      this.resetFields();
      this.router.navigateByUrl('/my-account/orders');
    }
  }

  private resetFields(): void {
    this.searchForm.get('term').setValue('');
    this.searchForm.get('searchBy').setValue('');
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) { this.routeSubscription.unsubscribe(); }
    if (this.orderSubscription) { this.orderSubscription.unsubscribe(); }
  }
}
