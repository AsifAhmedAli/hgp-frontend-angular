import { Component, OnInit } from '@angular/core';
import {ValidationMessages} from '../../shared/constants/constants';
import {ApiService} from '../../shared/services/api.service';
import {HelpersService} from '../../shared/services/helpers.service';
import {DataService} from '../../shared/services/data.service';
import {resolveErrorMessage} from '../../shared/functions/core.function';

@Component({
  selector: 'app-apply-coupon',
  templateUrl: './apply-coupon.component.html',
  styleUrls: ['./apply-coupon.component.css']
})
export class ApplyCouponComponent implements OnInit {
  code: string;
  errorMessage: string;
  isApplying = false;
  constructor(
    private apiService: ApiService,
    private helperService: HelpersService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  onCodeChange(): void {
    if (this.code) {
      this.errorMessage = null;
    } else {
      this.errorMessage = ValidationMessages.required;
    }
  }

  apply(): void {
    if (this.code) {
      this.isApplying = true;
      this.errorMessage = null;
      this.apiService.applyCoupon(this.helperService.resolveSessionID(), this.code).subscribe(
        response => {
          this.dataService.setCart(response.cart);
          this.code = null;
          this.helperService.success(response.message);
          this.isApplying = false;
        },
        error => {
          this.errorMessage = resolveErrorMessage(error);
          this.isApplying = false;
          this.helperService.resetCart(error);
        }
      );
    } else {
      this.errorMessage = ValidationMessages.required;
    }
  }

}
