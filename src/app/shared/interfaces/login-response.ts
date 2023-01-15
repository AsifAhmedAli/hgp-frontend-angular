import {Cart} from './cart.interface';
import {User} from './user';

export interface LoginResponse {
  status: boolean;
  message: string;
  result: Result;
  cart: Cart;
  sessionID: any;
}

export interface Result {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}
