import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {DataService} from '../../shared/services/data.service';
import {MyOrder} from '../../shared/interfaces/my-orders.response';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  title: string;
  page = 'my-order-detail';
  order: MyOrder;
  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.dataService.setPage(this.page);
    const orderNumber = this.activatedRoute.snapshot.params.orderNumber;
    this.resolvePage(orderNumber);
  }
  resolvePage(orderNumber: string): void {
    this.authService.getMyOrderDetail(orderNumber).subscribe(
      response => {
        this.order = response.order;
        this.helpersService.dataService.setShowFooter(true);
      },
      error => {
        this.helpersService.showResponseErrorMessage(error);
        this.helpersService.dataService.setShowFooter(true);
      }
    );
  }
}
