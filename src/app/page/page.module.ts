import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplateComponent } from './page-template/page-template.component';
import {PageRoutingModule} from "./page-routing-module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [PageTemplateComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule
  ]
})
export class PageModule { }
