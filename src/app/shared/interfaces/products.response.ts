import {Media} from './media';
import {Review} from './review.interface';
import {optional} from '../types/types';
import {Category} from './header.response';

export interface ProductResponse {
  reviews_enabled: boolean;
  product: Product;
  message: string;
}

export interface ProductsResponse {
  products: PaginatedProducts;
  category: Category;
  subCategory: Category;
  counter: number;
  message: string;
}

interface PaginatedProducts {
  current_page: number;
  data: Array<Product>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface Product {
  image: ProductImage;
  is_favorite_count: number;
  id: number;
  brand_id: string;
  tax_class_id: number;
  slug: string;
  price: Amount;
  weight: number;
  special_price: Amount;
  special_price_type: string;
  special_price_start: string;
  special_price_end: string;
  selling_price: Amount;
  sku: string;
  model_number: string;
  manage_stock: boolean;
  qty: number;
  in_stock: boolean;
  viewed: number;
  is_active: boolean;
  new_from: string;
  additional_information: string;
  new_to: string;
  created_at: string;
  updated_at: string;
  base_image: Media;
  formatted_price: optional;
  rating_percent: number;
  is_in_stock: boolean;
  is_out_of_stock: boolean;
  is_new: boolean;
  has_percentage_special_price: boolean;
  special_price_percent: number;
  name: string;
  description: string;
  short_description: string;
  translations: Array<ProductTranslation>;
  files: Array<Media>;
  additionalImage: Media;
  categories: Array<Category>;
  tags: Array<Tag>;
  attributes: Array<ProductAttribute>;
  options: Array<Option>;
  related_products: Array<Product>;
  up_sell_products: Array<Product>;
  reviews: Array<Review>;
  documents: Array<Document>;
}


export interface Amount {
  amount: string;
  formatted: string;
  currency: string;
  inCurrentCurrency: InCurrentCurrency;
}

export interface InCurrentCurrency {
  amount: number;
  formatted: string;
  currency: string;
}
export interface ProductImage {
  url: string;
  product_recid: number
}
export interface ProductTranslation {
  id: number;
  product_id: number;
  locale: string;
  name: string;
  description: string;
  short_description: string;
}

export interface Tag {
  id: number;
  slug: string;
  created_at: string;
  updated_at: string;
  name: string;
  pivot: {
    product_id: number;
    tag_id: number;
  };
  translations: Array<TagTranslation>;
}

export interface TagTranslation {
  id: number;
  tag_id: number;
  locale: string;
  name: string;
}

export interface ProductAttribute {
  id: number;
  product_id: number;
  attribute_id: number;
  name: string;
  attribute: Attribute;
  values: Array<ProductValue>;
}

export interface Attribute {
  id: number;
  attribute_set_id: number;
  is_filterable: boolean;
  created_at: string;
  updated_at: string;
  slug: string;
  name: string;
  translations: Array<AttributeTranslation>;
  attribute_set: AttributeSet;
}

export interface AttributeTranslation {
  id: number;
  attribute_id: number;
  locale: string;
  name: string;
}

export interface AttributeSet {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  translations: Array<AttributeSetTranslation>;
}

export interface AttributeSetTranslation {
  i: number;
  attribute_set_id: number;
  local: string;
  nam: string;
}

export interface ProductValue {
  product_attribute_id: number;
  attribute_value_id: number;
  value: string;
  attribute_value: AttributeValue;
}

export interface AttributeValue {
  id: number;
  attribute_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  value: string;
  translations: Array<AttributeValueTranslation>;
}

export interface AttributeValueTranslation {
  id: number;
  attribute_value_id: number;
  locale: string;
  value: string;
}

export interface Document {
  id: number;
  category_id: number;
  user_id: number;
  filename: string;
  disk: string;
  path: string;
  extension: string;
  mime: string;
  size: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  name: string;
  translations: Array<DocumentTranslation>;
}

export interface DocumentTranslation {
  id: number;
  document_id: number;
  locale: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Option {
  id: number;
  type: string;
  is_required: boolean;
  is_global: boolean;
  position: number;
  created_at: string;
  updated_at: string;
  name: string;
  translations: Array<OptionTranslation>;
  values: Array<OptionValue>;
}

export interface OptionTranslation {
  id: number;
  option_id: number;
  locale: string;
  name: string;
}

export interface OptionValue {
  id: number;
  option_id: number;
  price: Amount;
  price_type: string;
  position: number;
  created_at: string;
  updated_at: string;
  label: string;
  translations: Array<OptionValueTranslation>;
}

export interface OptionValueTranslation {
  id: number;
  option_value_id: number;
  locale: string;
  label: string;
}
