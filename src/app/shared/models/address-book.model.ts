export class AddressBookModel {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public street: string,
    public city: string,
    public state: string,
    public phone_no: string,
    public postal_code: string
  ) {}
}
