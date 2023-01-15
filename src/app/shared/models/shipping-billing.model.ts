export class ShippingBillingModel {
  constructor(
    public createAccount: boolean,
    public shippingFirstName: string,
    public shippingLastName: string,
    public shippingAddress1: string,
    public shippingState: string,
    public shippingCity: string,
    public shippingZip: string,
    public shippingEmail: string,
    public shippingPhone: string,
    public billingFirstName: string,
    public billingLastName: string,
    public billingAddress1: string,
    public billingState: string,
    public billingCity: string,
    public billingZip: string,
    public billingEmail: string,
    public billingPhone: string,
    public isDifferentBilling: boolean = false
  ) {}
}
