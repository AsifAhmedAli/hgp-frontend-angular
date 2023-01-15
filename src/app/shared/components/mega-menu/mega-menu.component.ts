import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Subscription} from 'rxjs';
import {Category, Setting} from '../../interfaces/header.response';
import {Brand} from '../../interfaces/products.model';
import {Router} from '@angular/router';
import {Kit} from "../../interfaces/kits.interface";
import {closeMegaMenu} from "../../functions/project.function";

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.css']
})
export class MegaMenuComponent implements OnInit {

  categoriesSubscription: Subscription;
  brandsSubscription: Subscription;
  settings: Setting[];
  categories: Category[];
  brands: Brand[];
  private smallKitSubscription: Subscription;
  smallKit: Kit = null;

  constructor(
      private dataService: DataService,
      private router: Router
  ) {
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.dataService.getCategories().subscribe(
        (categries) => {
          this.categories = categries;
        }
    );

    this.brandsSubscription = this.dataService.brandsSubject.asObservable().subscribe(
        brands => {
          this.brands = brands;
        }
    );

    this.smallKitSubscription = this.dataService.getFirstKit().subscribe((kit: Kit) => {
      this.smallKit = kit;
    })
  }
  redirectToProducts = (event) => {
    this.router.navigate(['/products'], {queryParams: { brands: event.target.value }});
  }

  goToKitDetail(kitURL: string): void {
    closeMegaMenu();
    this.router.navigateByUrl(kitURL);
  }
  hidePopup(): void {
    closeMegaMenu();
  }
  ngOnDestroy() {
    if (this.brandsSubscription) {
      this.brandsSubscription.unsubscribe();
    }

    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
    if (this.smallKitSubscription) {
      this.smallKitSubscription.unsubscribe()
    }
  }

  scrollToKits() {
    this.dataService.scrollToKits.next(true)
  }
}
