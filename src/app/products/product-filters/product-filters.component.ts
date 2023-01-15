import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Brand} from '../../shared/interfaces/products.model';
import {ActivatedRoute, Params} from '@angular/router';
import {Category} from '../../shared/interfaces/header.response';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.css']
})
export class ProductFiltersComponent implements OnInit {

  @Input() categories: Array<Category>;
  @Input() brands: Array<Brand>;
  @Input() queryParams: Params;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilters = new EventEmitter();

  constructor(private route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      if (params ) {
          this.queryParams = params;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.categories.length && this.queryParams.categories && this.queryParams.categories.length) {
      this.checkCategoryFilters();
    }

    if (this.brands.length && this.queryParams.brands && this.queryParams.brands.length) {
      this.checkBrandFilters();
    }
  }


  ngOnInit(): void {
  }

  checkCategoryFilters = () => {
    const categories = this.queryParams.categories.split(',');
    this.categories.forEach(category => {
      if (categories.includes(category.short_name)) {
        category.checked = true;
      }
      category.childs.forEach(categoryChild => {
        if (categories.includes(categoryChild.short_name)) {
          categoryChild.checked = true;
        }
      });
    });
  }
  checkBrandFilters = () => {
    const brands = this.queryParams.brands.split(',');
    this.brands.forEach(brand => {
      if (brands.includes(brand.name)) {
        brand.checked = true;
      }
    });
  }

  onSelectCategory = (event: any, item) => {
    if (event.target.checked) {
      item.checked = true;
    } else {
      item.checked = false;
    }
    let categories: any = [];
    this.categories.forEach(elem => {
      if (elem.checked) {
        categories.push(elem.short_name);
      }
      elem.childs.forEach(elemChild => {
        if (elemChild.checked) {
          categories.push(elemChild.short_name);
        }
      });
    });

    categories = categories.join(',');
    this.queryParams = {...this.queryParams, categories };
    this.onFilters.emit(this.queryParams);
  }

  onSelectBrand = (event: any, item) => {
    if (event.target.checked) {
      item.checked = true;
    } else {
      item.checked = false;
    }

    let brands: any = [];
    this.brands.forEach(elem => {
      if (elem.checked) {
        brands.push(elem.name);
      }
    });

    brands = brands.join(',');
    this.queryParams = {...this.queryParams, brands};
    this.onFilters.emit(this.queryParams);
  }
}
