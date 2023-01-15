import {Routes} from '@angular/router';
import {AuthGuard} from '../shared/guards/auth.guard';

export const LayoutRouting: Routes = [
  {
    path: '',
    loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('../cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('../my-account/my-account.module').then(m => m.MyAccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'product',
    loadChildren: () => import('../product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'kit',
    loadChildren: () => import('../kits/kits.module').then(m => m.KitsModule)
  },
  {
    path: ':slug',
    loadChildren: () => import('../page/page.module').then(m => m.PageModule)
  }
];
