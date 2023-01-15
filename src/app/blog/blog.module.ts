import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelect2Module} from 'ng-select2';


@NgModule({
  declarations: [
    BlogComponent,
    BlogDetailComponent
  ],
    imports: [
        CommonModule,
        BlogRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NgSelect2Module,
        FormsModule
    ]
})
export class BlogModule { }
