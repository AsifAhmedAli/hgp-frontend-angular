import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitsRoutingModule } from './kits-routing.module';
import { KitsComponent } from './kits.component';
import {SharedModule} from "../shared/shared.module";
// import {NgxStarsModule} from "ngx-stars";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LightboxModule} from "ngx-lightbox";
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [KitsComponent],
  imports: [
    CommonModule,
    KitsRoutingModule,
    SharedModule,
    // NgxStarsModule,
    ReactiveFormsModule,
    LightboxModule,
    FormsModule,
    AccordionModule
  ]
})
export class KitsModule { }
