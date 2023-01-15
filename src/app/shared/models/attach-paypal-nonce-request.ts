export class AttachPaypalNonceRequest {
  constructor(
    public nonce: string,
    public firstName: string,
    public lastName: string,
    public payerId: string,
    public countryCode: string,
    public type: string
  ) {}
}
