import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {BrainTreeCreditCard} from '../../../shared/interfaces/user-payment/saved-payment-methods.response';
import {Subscription} from 'rxjs';
import {HelpersService} from '../../../shared/services/helpers.service';

@Component({
  selector: 'app-account-payment-item',
  templateUrl: './account-payment-item.component.html',
  styleUrls: ['./account-payment-item.component.css']
})
export class AccountPaymentItemComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  connectionSubscription: Subscription;
  isConnected = true;
  @Input() card: BrainTreeCreditCard;
  isDeleting = false;
  isSubmitting = false;
  @Output() onRemainingCards = new EventEmitter<Array<BrainTreeCreditCard>>();
  constructor(public helpersService: HelpersService) { }

  ngOnInit(): void {
  }
  onDeletePaymentMethod = () => {
    let res = confirm("Are you sure want to delete this payment method?");
    if(!res) {
      return;
    }
      this.isDeleting = true;
      this.subscription = this.helpersService.authService.deletePaymentMethod(this.card.token).subscribe(
        response => {
          this.isDeleting = false;
          this.onRemainingCards.emit(response.customer.creditCards);
          this.helpersService.toastrService.success(response.message);
        },
        error => {
          this.isDeleting = false;
          this.helpersService.showResponseErrorMessage(error);
        }
      );
  };
  onDefaultChange = (event) => {
    if (this.card.default) {
      this.helpersService.success('Payment method already marked as default');
      event.target.checked = true;
    } else {
        this.isSubmitting = true;
        this.subscription = this.helpersService.authService.makeDefaultPaymentMethod(this.card.token).subscribe(
          response => {
            this.isSubmitting = false;
            this.onRemainingCards.emit(response.customer.creditCards);
            this.helpersService.success(response.message);
          },
          error => {
            this.isSubmitting = false;
            this.helpersService.showResponseErrorMessage(error);
          }
        );
    }
  };
  ngOnDestroy(): void {
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
