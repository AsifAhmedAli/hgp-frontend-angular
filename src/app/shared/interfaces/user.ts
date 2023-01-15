

export interface UserResponse {
  status: boolean;
  message: string;
  result: User;
}

export interface User {
  id: number;
  role_id: number;
  name: string;
  first_name: string;
  last_name: string;
  street_address_1: string;
  city: string;
  zip_code: string;
  email: string;
  status: string;
  avatar: string;
  email_verified_at?: any;
  settings: any[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: any;
  stripe_id: string;
  card_brand?: any;
  card_last_four?: any;
  trial_ends_at?: any;
  phone_number?: any;
  state: string;
}
