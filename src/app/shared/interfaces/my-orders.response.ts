import {Amount, Option, Product} from './products.response';
import {Media} from './media';
import {Kit} from "./kits.interface";

export interface MyOrdersResponse {
  orders: MyOrdersPaginated;
  message?: string;
}

export interface MyOrderResponse {
  order?: MyOrder;
  message?: string;
}

export interface MyOrdersPaginated {
  current_page: number;
  data: Array<MyOrder>;
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

export interface MyOrder {
  id: number;
  order_number: string;
  tracking_number: string;
  customer_id: number;
  customer_email: string;
  guest_email: string;
  customer_phone: string;
  customer_first_name: string;
  customer_last_name: string;
  is_different_billing: any;
  contact_information_first_name: string;
  contact_information_last_name: string;
  contact_information_email: string;
  contact_information_phone: string;
  billing_first_name: string;
  billing_last_name: string;
  billing_address_phone: string;
  billing_address_email: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_state: string;
  billing_address_state_type: string;
  billing_zip: string;
  billing_country: string;
  billing_address_country_id: number;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_address_company: string;
  shipping_address_phone: string;
  shipping_address_email: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_address_state_type: string;
  shipping_zip: string;
  shipping_country: string;
  shipping_address_country_id: number;
  sub_total: Amount;
  shipping_method: string;
  shipping_charges: number;
  allow_free_shipping: boolean;
  shipping_cost: Amount;
  coupon_id: number;
  coupon_code: string;
  discount: Amount;
  total: Amount;
  tax: Amount;
  card_holder_name: string;
  expiration_month: string;
  expiration_year: string;
  bin: string;
  card_type: string;
  card_number: string;
  type: string;
  saved_payment_method_token: string;
  payment_method: string;
  last_four: string;
  last_two: string;
  description: string;
  email: string;
  first_name: string;
  last_name: string;
  payer_id: string;
  country_code: string;
  currency: string;
  currency_rate: string;
  locale: string;
  status: string;
  order_status: string;
  note: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  products: Array<MyOrderProduct>;
}

export interface MyOrderProduct {
  hydro_product_id: number;
  id: number;
  brand_id: number;
  status: string;
  order_id: number;
  product_id: number;
  name: string;
  base_image: string;
  unit_price: Amount;
  price: string;
  variant_price: number;
  variants_json: Array<Option>;
  qty: number;
  line_total: number;
  slug: string;
  sku: string;
  product: Product;
  base: Media;
  kit: Kit
}
