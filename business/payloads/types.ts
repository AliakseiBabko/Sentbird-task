export interface CartOptionsInput {
  address: {
    country: string;
  };
  priceSelection: {
    country: string;
  };
  purchaseLevel: string;
}

export interface CartModifyInput {
  productItems: {
    productLineItemUid: string;
    quantity: number;
  }[];
  metadata: {
    page: string;
    pageType: string;
    placement: string;
  };
  options: CartOptionsInput;
}

export interface CartModifyPayload {
  operationName: string;
  variables: {
    input: CartModifyInput;
  };
  query: string;
}

export interface FetchCartPayload {
  operationName: string;
  variables: {
    input: CartOptionsInput;
  };
  query: string;
}

export interface DiscountLineItem {
  label: string;
  note?: string;
  unit?: string;
  amount: number;
  coupon?: {
    code: string;
    origin: string;
    __typename: string;
  };
  __typename: string;
}

export interface Cart {
  subscription: any | null;
  giftSubscription: any | null;
  giftCard: any | null;
  ecommercePromos: any | null;
  products: any | null;
  queueItems: any | null;
  subscriptionPromos: any[];
  limitedDropItems: any | null;
  discounts: DiscountLineItem[] | null;
  shipping: any | null;
  credits: any[];
  purchaseProgress: any | null;
  subTotal: number;
  total: number;
  __typename: string;
}