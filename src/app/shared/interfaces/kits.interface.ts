import {Product} from './products.model';

export interface Kit {
  id: number;
  name: string;
  title: string;
  mini_title: string;
  short_description: string;
  description: string;
  price: number;
  images: string;
  image: string;
  is_active: number;
  features: any;
  kit_features: any;
  size: string;
  discount: any;
  cta_1_title: string;
  cta_1_url: string;
  cta_2_title: string;
  cta_2_url: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
  reviews: Review[];
  products: Product[];
  active: true;
}
export interface KitCompare {
  id: number;
  title: string;
  short_description: string;
  kit_name_1: string;
  kit_name_2: string;
  kit_name_3: string;
  image_1: string;
  image_2: string;
  image_3: string;
  price_1: number;
  price_2: number;
  price_3: number;
  content_1: string;
  content_2: string;
  content_3: string;
}
export interface KitProducts {
  id: number;
  name: string;
  products: Product[];
}

export interface KitSliders {
  id: number;
  name: string;
  cta_url: string;
  image: string;
  active: true;
}

export interface Review {
  id: number;
  kit_id: number;
  rating: number;
  reviewer_name: string;
  comment: string;
  image: string;
  is_approved: number;
  created_at?: any;
  updated_at?: any;
}

export interface KitsInterface {
  status: boolean;
  message: string;
  result: Kit[];
}

export interface MyKitsInterface {
  status: boolean;
  message: string;
  result: MyKits[];
}


export interface MyKits {
  id: number;
  kit_id: number;
  created_at: Date;
  kit: Kit;
}
