import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GiveAwayComponent } from './give-away/give-away.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: LayoutRouting
  // },
  {
    path: '',
    component: GiveAwayComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
  // {
  //   path: 'not-found',
  //   redirectTo: Paths.notFound,
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: Paths.notFound,
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      anchorScrolling: 'disabled',
      scrollPositionRestoration: 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
