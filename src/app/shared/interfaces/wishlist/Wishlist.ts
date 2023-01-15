import {Product} from '../products.model';

export interface WishlistResponse {
  'status': boolean;
  'message': string;
  'result': {
    'current_page': number,
    data: [Wishlist],
    'first_page_url': string,
    'from': number,
    'last_page': number,
    'last_page_url': string,
    'next_page_url': string,
    'path': string,
    'per_page': number,
    'prev_page_url': string,
    'to': number,
    'total': number
  };
}

export interface Wishlist {
  id: number;
  user_id: number;
  hydro_product_id: number;
  created_at: string;
  updated_at: string;
  product: Product;
}
