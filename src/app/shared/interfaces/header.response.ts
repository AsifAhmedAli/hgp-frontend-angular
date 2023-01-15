import {Cart} from './cart.interface';
import {StaticPage} from './pages/static-page.response';
import {Brand} from './products.model';
import {User} from './user';
import {Kit} from "./kits.interface";

export interface Child {
  id: number;
  hydro_id: any;
  hydro_parent_id: any;
  name: string;
  short_name: string;
  is_root: number;
  show_in_menu: number;
  is_active: number;
  is_featured: number;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: number;
  hydro_id: any;
  hydro_parent_id: any;
  name: string;
  short_name: string;
  is_root: number;
  show_in_menu: number;
  is_active: number;
  is_featured: number;
  deleted_at?: any;
  checked: boolean;
  created_at: Date;
  updated_at: Date;
  parent: Category;
  children: Category[];
  childs: Category[];
}


export interface Setting {
  id: number;
  key: string;
  display_name: string;
  value: string;
  details: string;
  type: string;
  order: number;
  group: string;
}

export interface SettingResponse {
  firstKit: Kit;
  pages: Array<Page>;
  categories: Category[];
  brands: Brand[];
  settings: Setting[];
  cart: Cart;
  user: User;
}
export interface Page {
  body: string;
  is_active: boolean;
  title: string;
  slug: string;
}
