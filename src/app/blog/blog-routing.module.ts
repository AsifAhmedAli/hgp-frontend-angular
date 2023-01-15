import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogComponent} from './blog.component';
import {PageTitles} from '../shared/constants/constants';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';


const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    data: {
      title: PageTitles.blog
    }
  },
  {
    path: ':slug',
    component: BlogDetailComponent,
    data: {
      title: PageTitles.blogDetail
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
