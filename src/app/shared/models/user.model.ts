export class UserModel {
  constructor(
    public social_id: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public phone_no: string,
    public stripe_customer_id: string,
    public state_id: number,
    public city: string,
    public postal_code: string,
    public street_address_1: string,
    public street_address_2: string
  ) {}
}
