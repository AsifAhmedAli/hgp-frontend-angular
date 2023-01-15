import {MenuItem} from '../models/menu-item';
import {OptionModel} from '../models/option.model';

export const LocalStorageConstants = {
  SESSION_ID: 'sessionID'
};
export const BrainTreeConfig = {
  fields: {
    number: {
      selector: '#card-number',
      placeholder: 'Card Number *'
    },
    cvv: {
      selector: '#cvv',
      placeholder: 'CVV *'
    },
    expirationDate: {
      selector: '#expiration-date',
      placeholder: 'MM/YY *'
    }
  },
  style: {
    input: {
      'font-size': '16px',
      'font-family': 'Helvetica, roboto, verdana, sans-serif',
      'font-weight': 'normal',
      color: '808285'
    },
    ':focus': {
      color: '808285'
    },
    '.valid': {
      color: '808285'
    },
    '.invalid': {
      color: '808285'
    }
  }
};
export const Constants = {
  errorTimeOut: 20,
  otherOption: '--- other ---',
  passwordMinLength: 8,
  passwordMaxLength: 100,
  phoneMinLength: 10,
  phoneMaxLength: 15,
  generalMaxLength: 150,
  listingExcerptLength: 250,
  blogFeaturedExcerptLength: 474,
  blogExcerptTitle: 67,
  blogExcerptListingTitle: 87,
  usernameMinLength: 3,
  bankAccountNameMaxLimit: 100,
  bankAccountNumberMaxLimit: 100,
  banRoutingNumberMaxLimit: 100,
  bankCodeMaxLimit: 20,
  maxImageSizeAddProduct: 5242880,
  maxMediaImagesAddProduct: 9,
  maxAttachments: 5,
  maxAttachmentSize: 5242880,
  minProductStock: 1,
  minWeight: 1,
  minProductPrice: 1,
  minShippingCharges: 1,
  varcharMaxLength: 150,
  descriptionMaxLength: 1200,
  productTitleExcerpt: 27,
  designerNameExcerpt: 27,
  stateMaxLength: 2,
  zipMinLength: 4,
  zipMaxLength: 5,
  numberMaxLength: 9,
  floatMaxLength: 10,
  contactUsNameMaxLength: 25,
  nicknameMaxLength: 25,
  nameMaxField: 25,
  firstNameMaxlength: 25,
  lastNameMaxlength: 25,
  companyNameMaxlength: 30,
  streetMaxlength: 100,
  cityMaxlength: 50,
};

export const Messages = {
  searchFaqs: 'Search FAQs',
  noFAQFound: "No FAQs Found",
  taxCalculatedInCheckout: 'CALCULATED IN CHECKOUT',
  noResultFound: 'No Record Found.',
  noBlogFound: 'No Blog Found',
  internetConnectionTitle: 'Internet connection error',
  internetConnectionDescription: 'Please check you internet connection.',
  internetConnectionBackTitle: 'Connected',
  internetConnectionBackDescription: 'You have active internet connection now.',
  validationErrorTitle: 'Warning!',
  validationErrorMessage: 'Validation errors occurred!',
  registerFormSubmitted: 'Account created successfully. A verification link has been sent to your email account.',
  successfullySubscribe: 'Successfully subscribed.',
  thankYou: 'Thank You!',
  registerFormSubmittedTitle: 'Thank You!',
  contactUsFormSubmittedTitle: 'Thank You!',
  contactUsFormSubmitted: 'Your request has been submitted successfully.',
  success: 'Success!',
  changedPasswordDescription: 'Password changed successfully.',
  incorrectOldPassword: 'Incorrect password.',
  blogCommentAdded: 'Comment successfully added.',
  profileUpdated: 'Profile updated successfully.',
  noPaymentMethodFound: 'No payment method found.',
  noItemFound: 'No item found',
  unAuthenticated: 'Unauthenticated',
  loginFirst: 'Please login first to add product to wish list.',
  loginFirstToAddReview: 'Please login first to add product review.',
  loginFirstToAddKitReview: 'Please login first to add kit review.',
  statusError: 'Error',
  NonceNotFound: 'Nonce expired / Not found.',
  Error: 'Error!',
  ValidationError: 'Error!',
  linkExpired: 'Link has been expired.'
};

export const Formats = {
  dateFormat: 'MM-dd-yyyy',
  dateFormatNoYear: 'MM-dd',
};

export const Paths = {
  notFound: '/404'
};

export const KitSizes = {
  small: '5x5',
  medium: '5x5',
  large: '5x5',
};
export const PageTitles = {
  homepage: 'Home Page',
  notFound: '404 - Not Found',
  aboutUs: 'About Us',
  howItWorks: 'How It Works',
  termsAndConditions: 'Terms and Conditions',
  returns: 'Returns',
  shippingInfo: 'Shipping Information',
  privacyPolicy: 'Privacy Policy',
  manuals: 'Manuals',
  blog: 'Blog',
  blogDetail: 'Blog Detail',
  cart: 'Cart',
  orderConfirmation: 'Order Confirmation',
  checkout: 'Checkout',
  thankYou: 'Thank You',
  faq: 'FAQs',
  forgotPassword: 'Forgot Password',
  resetPassword: 'Reset Password',
  contactUs: 'Contact Us',
  profile: 'Profile',
  addressBook: 'Addresses',
  addAddressBook: 'Add New Address',
  editAddressBook: 'Edit Address',
  paymentMethods: 'Payments',
  addPaymentMethod: 'Add Payment Method',
  orders: 'Orders',
  orderDetail: 'Order Details',
  changePassword: 'Change Password',
  wishlist: 'Wish List',
  products: 'Products',
  product: 'Product Detail',
  kit: 'Kit Detail',
  manufacturers: 'Manufacturers',
  registerLogin: 'Login/Register',
  searchDetails: 'Search Details',
  serviceCenter: 'Service Center',
  accountVerify: 'Account Verify',
  compare: 'Compare'
};

export const ValidationMessages = {
  required: 'This field is required.',
  cardNumberIsInvalid: 'Card number is invalid',
  expirationDateIsInvalid: 'Expiration date is invalid',
  cvvIsInvalid: 'CVV is invalid',
  positiveValue: 'Amount must be positive.',
  image: 'This must be a valid image.',
  email: 'Email must be a valid email address.',
  emailTaken: 'This email has already been taken!',
  usernameTaken: 'This username has already been taken!',
  nickNameAlreadyTaken: 'This nickname has already been taken!',
  bankAccountNumberAlreadyTaken: 'This bank account number has already been taken!',
  minPasswordLength: `Password must be at least ${Constants.passwordMinLength} characters long.`,
  maxPasswordLength: `Password must have at most ${Constants.passwordMaxLength} characters.`,
  firstNameMaxField: `First Name must have at most ${Constants.nameMaxField} characters.`,
  passwordAdvanceValidation: `Password must contain at least one uppercase character, one lowercase character and one number.`,
  lastNameMaxField: `Last Name must have at most ${Constants.nameMaxField} characters`,
  generalMaxLength: `Email must have at most ${Constants.generalMaxLength} characters`,
  contactUsNameMaxLength: `Name must have at most ${Constants.contactUsNameMaxLength} characters`,
  phoneMinLength: `Phone must be ${Constants.phoneMinLength} characters long.`,
  phoneMaxLength: `Phone must have at most ${Constants.phoneMaxLength} characters.`,
  maxBankAccountNameLength: `Account Name can have maximum ${Constants.bankAccountNameMaxLimit} characters.`,
  maxBankAccountNumberLength: `Account Number can have maximum ${Constants.bankAccountNumberMaxLimit} characters.`,
  maxBankRoutingNumberLength: `Account routing Number can have maximum ${Constants.banRoutingNumberMaxLimit} characters!`,
  maxBankCodeLength: `Code can have maximum ${Constants.bankCodeMaxLimit} characters!`,
  usernamePatternError: `username can only contain alphabets, numbers and _`,
  confirm_password: 'New Password and Confirm Password must be same!',
  onlyNumber: 'This field can only contain numeric values',
  minProductStock: `Product minimum stock should be at least ${Constants.minProductStock}.`,
  minProductPrice: `Product minimum price should be at least $${Constants.minProductPrice}.`,
  minShippingCharges: `Minimum shipping charges should be at least $${Constants.minShippingCharges}.`,
  varcharMaxLength: `Maximum length should be ${Constants.varcharMaxLength} characters.`,
  varcharMaxLengthForProject: `Maximum length should be ${Constants.descriptionMaxLength}.`,
  featuredImage: 'Please select featured image',
  stateMaxLength: `Maximum length should be ${Constants.stateMaxLength} (ISO2).`,
  numberMaxLength: `Maximum length should be ${Constants.numberMaxLength} characters.`,
  floatMaxLength: `Maximum length should be ${Constants.floatMaxLength} characters.`,
  minWeight: `Product weight must be at least ${Constants.minWeight} pound.`,
  zipMinLength: `Zip Code must be at least ${Constants.zipMinLength} characters.`,
  zipMaxLength: `Zip Code must be ${Constants.zipMaxLength} characters.`,
  nicknameMaxLength: `Nickname must be ${Constants.nicknameMaxLength} characters`,
  firstNameMaxlength: `First Name must be ${Constants.firstNameMaxlength} characters`,
  lastNameMaxlength: `Last Name must be ${Constants.lastNameMaxlength} characters`,
  companyNameMaxlength: `Company Name must be ${Constants.companyNameMaxlength} characters`,
  streetMaxlength: `Street must be ${Constants.streetMaxlength} characters`,
  cityMaxlength: `City must be ${Constants.cityMaxlength} characters`,
  passwordNumber: 'Must contain at least 1 number!',
  capitalCharacter: 'Must contain at least 1 in Capital Case!',
  lowerCharacter: 'Must contain at least 1 Letter in Small Case!',
  specialCharacter: 'Must contain at least 1 Special Character!',
  restrictedProduct: 'Shipping for this product is restricted to this state',
  restrictedKit: 'Shipping for this kit is restricted to this state',
};


export const ProductSortingOptions: Array<OptionModel> = [
  new OptionModel('Newest', 'newest'),
  new OptionModel('Price Low to High', 'price-low-to-high'),
  new OptionModel('Price High to Low', 'price-high-to-low'),
  new OptionModel('Alphabetically, A-Z', 'alphabetically-a-z'),
  new OptionModel('Product SKU', 'sku'),
];

export const HydroKitSizes = {
  '5x5': '5x5',
  '5x9': '5x9',
  '10x10': '10x10',
};
export const DefaultKitSize = '5x5';
