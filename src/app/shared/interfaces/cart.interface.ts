import { Product} from './products.model';
import {Kit} from "./kits.interface";

export interface CartResponse {
  cart: Cart;
  message: string;
}

export interface Cart {
  id: number;
  session_id: string;
  user_id: number;
  guest_email: string;
  create_account: boolean;
  tax: string;
  shipping_method: string;
  shipping_charges: number;
  allow_free_shipping: boolean;
  total_price: number;
  total_qty: number;
  coupon_code: string;
  coupon_id: number;
  discount: number;
  contact_information_first_name: string;
  contact_information_last_name: string;
  contact_information_email: string;
  contact_information_phone: string;
  shipping_address_first_name: string;
  shipping_address_last_name: string;
  shipping_address_address1: string;
  shipping_address_address2: string;
  shipping_address_country_id: number;
  shipping_address_state: string;
  shipping_address_state_type: string;
  shipping_address_city: string;
  shipping_address_zip: string;
  shipping_address_phone: string;
  shipping_address_email: string;
  is_different_billing: string;
  billing_address_first_name: string;
  billing_address_last_name: string;
  billing_address_address1: string;
  billing_address_address2: string;
  billing_address_country_id: string;
  billing_address_state: string;
  billing_address_state_type: string;
  billing_address_city: string;
  billing_address_zip: string;
  billing_address_phone: string;
  billing_address_email: string;
  payment_nonce: string;
  payment_method: string;
  card_holder_name: string;
  expiration_month: string;
  expiration_year: string;
  bin: string;
  card_type: string;
  type: string;
  saved_payment_method_token: string;
  last_four: string;
  last_two: string;
  description: string;
  email: string;
  first_name: string;
  last_name: string;
  payer_id: string;
  country_code: string;
  created_at: string;
  updated_at: string;
  sub_total: number;
  products: Array<CartProduct>;
  kit_products: Product[];
}

export interface CartProduct {
  isRestrictedKit: boolean;
  id: number;
  cart_id: number;
  product: Product;
  hydro_product_id: number;
  kit_id: number;
  kit: Kit;
  price: number;
  variant_price: number;
  attributes: string;
  shipping_charges: number;
  quantity: number;
  user_note: string;
  created_at: string;
  updated_at: string;
  total_price: number;
  isRestricted: boolean;
}
