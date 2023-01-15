export interface SavedPaymentMethodsResponse {
  message: string;
  customer?: BrainTreeCustomer;
}

export interface BrainTreeCustomer {
  id: number;
  merchantId: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  fax: string;
  website: string;
  createdAt: BrainTreeTime;
  updatedAt: BrainTreeTime;
  globalId: string;
  creditCards: Array<BrainTreeCreditCard>;
}

export interface BrainTreeTime {
  date: any;
  timezone_type: number;
  timezone: string;
}

export interface BrainTreeCreditCard {
  bin: string;
  expirationMonth: string;
  expirationYear: string;
  expirationDate: any;
  last4: string;
  cardType: string;
  cardholderName: string;
  commercial: string;
  countryOfIssuance: string;
  createdAt: BrainTreeTime;
  customerId: string;
  customerLocation: string;
  debit: string;
  default: boolean;
  durbinRegulated: string;
  expired: boolean;
  globalId: string;
  healthcare: string;
  imageUrl: string;
  issuingBank: string;
  payroll: string;
  prepaid: string;
  productId: string;
  subscriptions: [];
  token: string;
  uniqueNumberIdentifier: string;
  updatedAt: BrainTreeTime;
  venmoSdk: boolean;
  verifications: Array<BrainTreeVerification>;
  maskedNumber: string;
}

export interface BrainTreeVerification {
  status: string;
  cvvResponseCode: string;
  avsErrorResponseCode: string;
  avsPostalCodeResponseCode: string;
  avsStreetAddressResponseCode: string;
  gatewayRejectionReason: string;
  merchantAccountId: string;
  processorResponseCode: string;
  processorResponseText: string;
  amount: string;
  currencyIsoCode: string;
  processorResponseType: string;
  threeDSecureInfo: string;
  id: string;
  billing: BrainTreeBilling;
}

export interface BrainTreeBilling {
  firstName: string;
  lastName: string;
  company: string;
  streetAddress: string;
  extendedAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  countryName: string;
}

export interface GetBrainTreeTokenResponse {
  token: string;
  customer: BrainTreeCustomer;
}
