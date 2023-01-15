import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from "../product/product.component";
import {PageTitles} from "../shared/constants/constants";
import {KitsComponent} from "./kits.component";

const routes: Routes = [
  {
    path: ':id',
    component: KitsComponent,
    data: {
      title: PageTitles.kit
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitsRoutingModule { }
