import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products.component';
import {PageTitles} from '../shared/constants/constants';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    data: {
      title: PageTitles.products
    }
  },
  {
    path: ':slug',
    component: ProductsComponent,
    data: {
      title: PageTitles.products
    }
  },
  {
    path: ':slug/:next',
    component: ProductsComponent,
    data: {
      title: PageTitles.products
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
