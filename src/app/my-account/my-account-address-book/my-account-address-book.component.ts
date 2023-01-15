import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {DataService} from '../../shared/services/data.service';
import {AuthService} from '../../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {AddressBook} from '../../shared/interfaces/address-books/address-books.response';
import {States} from '../../shared/services/States';

@Component({
  selector: 'app-my-account-address-book',
  templateUrl: './my-account-address-book.component.html',
  styleUrls: ['./my-account-address-book.component.css']
})
export class MyAccountAddressBookComponent implements OnInit, OnDestroy {
  title: string;
  page = 'address-book';
  addressBookSubscription: Subscription;
  addressBooks: [AddressBook];
  isPageProcessingDone = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.dataService.setPage(this.page);
    this.getAddressBooks();
    this.helpersService.dataService.setShowFooter(true);
  }

  pageProcessingIsDone(): void {
    this.isPageProcessingDone = true;
  }

  getAddressBooks(): void {
    this.addressBookSubscription = this.authService.getAddressBooks().subscribe(
      response => {
        this.pageProcessingIsDone();
        this.addressBooks = response.result;
      }, error => {
        this.pageProcessingIsDone();
        // this.helpersService.showResponseErrorMessage(error);
      }
    );
  }


  onDelete(id: number): void {
    const retVal = confirm('Are you sure you want to delete address');
    if (!retVal) {
      return;
    }
    this.addressBookSubscription = this.authService.deleteAddress(id).subscribe(
      response => {
        this.helpersService.success(response.message);
        const index = this.addressBooks.findIndex(x => x.id == id);
        this.addressBooks.splice(index, 1);
      }, error => {
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }

  showFullStateName(state: string): string {
    const stateObj = States.find(item => item.abbreviation.toLowerCase() === state.toLowerCase());
    if (stateObj) {
      return stateObj.name;
    } else {
      return '';
    }

  }

  ngOnDestroy(): void {
    if (this.addressBookSubscription) {
      this.addressBookSubscription.unsubscribe();
    }
  }
}
