export class AttachPaymentNonceRequest {
  constructor(
    public nonce: string,
    public cardHolderName: string,
    public expirationMonth: string,
    public expirationYear: string,
    public bin: string,
    public cardType: string,
    public type: string,
    public lastFour: string,
    public lastTwo: string,
    public description: string
  ) {}
}
