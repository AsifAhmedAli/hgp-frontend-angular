import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {DataService} from '../../shared/services/data.service';
import {Subscription} from 'rxjs';
import {BrainTreeCreditCard} from '../../shared/interfaces/user-payment/saved-payment-methods.response';
import {Messages} from '../../shared/constants/constants';
import {resolveDataNotFound} from '../../shared/functions/core.function';

@Component({
  selector: 'app-my-account-payment-methods',
  templateUrl: './my-account-payment-methods.component.html',
  styleUrls: ['./my-account-payment-methods.component.css']
})
export class MyAccountPaymentMethodsComponent implements OnInit, OnDestroy {
  title: string;
  page = 'payment-methods';
  subscription: Subscription;
  cards: Array<BrainTreeCreditCard> = [];
  dataNotFound = false;
  MESSAGES = Messages;
  isPageProcessingDone = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.dataService.setPage(this.page);
    this.resolvePage();
  }
  pageProcessingIsdone(): void{
    this.isPageProcessingDone = true;
  }
  updateCards = (cards) => {
    this.cards = cards;
    resolveDataNotFound(this.cards, (notFond) => this.dataNotFound = notFond);
  }
  resolvePage = () => {
      this.subscription = this.helpersService.authService.fetchPaymentMethods().subscribe(
        response => {
          this.cards = response.customer.creditCards;
          resolveDataNotFound(this.cards, (notFond) => this.dataNotFound = notFond);
          this.pageProcessingIsdone();
          this.helpersService.dataService.setShowFooter(true);
        },
        error => {
          resolveDataNotFound(this.cards, (notFond) => this.dataNotFound = notFond);
          this.helpersService.showResponseErrorMessage(error);
          this.pageProcessingIsdone();
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
