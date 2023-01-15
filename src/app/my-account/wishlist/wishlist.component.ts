import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {DataService} from '../../shared/services/data.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {Wishlist} from '../../shared/interfaces/wishlist/Wishlist';
import {Messages} from '../../shared/constants/constants';
import {resolveDataNotFound} from '../../shared/functions/core.function';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  title: string;
  page = 'wishlist';
  MESSAGES = Messages;
  dataNotFound = false;
  wishlistSubscription: Subscription;
  wishlist: [Wishlist];
  wishlistPagination: any;
  query: any = {
    page: 1,
  };
  isPageProcessingDone = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.dataService.setPage(this.page);
    this.getMyWishlist();
  }

  getMyWishlist() {
    this.wishlistSubscription = this.authService.myWishlist(this.query).subscribe(
      response => {
        this.wishlist = response.result.data;
        this.wishlistPagination = response.result;
        resolveDataNotFound(this.wishlist, (notFond) => this.dataNotFound = notFond);
        //this.helpersService.scrollToTop(0, 400);
        this.pageProcessingIsdone();
      }, error => {
        this.pageProcessingIsdone();
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }
  pageProcessingIsdone(){
    this.isPageProcessingDone = true;
    this.helpersService.dataService.setShowFooter(true);
  }

  goToPage(page: any) {
    this.query.page = page;
    this.getMyWishlist();
  }

  delete = (prouctId: number, id) => {

    const confirmation = confirm('Are you sure want to delete product from Wish List?');

    const index = this.wishlist.findIndex(x => x.id === id)
    if (!confirmation) { return; }
    this.wishlistSubscription = this.authService.delteProductFromWishlist(prouctId).subscribe(
      response => {
        this.helpersService.success(response.message);
        this.wishlist = response.result.data;
        // this.wishlist.splice(index, 1);
        this.wishlistPagination = response.result;
        resolveDataNotFound(this.wishlist, (notFond) => this.dataNotFound = notFond);
      }, error => {
        this.helpersService.showResponseErrorMessage(error);
      }
    );
  }
}
