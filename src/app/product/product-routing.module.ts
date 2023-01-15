import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product.component';
import {PageTitles} from '../shared/constants/constants';


const routes: Routes = [
  {
    path: ':slug',
    component: ProductComponent,
    data: {
      title: PageTitles.product
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
