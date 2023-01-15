export interface AddressBooksResponse {
  status: boolean;
  message: string;
  result: [AddressBook];
  books: Array<AddressBook>;
}

export interface SingleAddressBooksResponse {
  "status": boolean,
  "message": string,
  "result": AddressBook
}

export interface AddressBook {
  id: number;
  nickname: string;
  first_name: string;
  last_name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  phone_no: string;
  postal_code: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

