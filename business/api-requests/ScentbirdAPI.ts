// scentbirdAPI.ts
import { BrowserContext, Cookie } from '@playwright/test';

interface CartOptionsInput {
  address: { country: string };
  priceSelection: { country: string };
  purchaseLevel: string;
}

interface CartOperationInput {
  productItems: { productLineItemUid: string; quantity: number }[];
  metadata: { page: string; pageType: string; placement: string };
  options: CartOptionsInput;
}

export class ScentbirdAPI {
  private context: BrowserContext;
  private cookies: Cookie[];
  private csrfToken: string;
  private datadomeCookie: string;
  private solvvySession: string;
  private locale: string;
  private scntSessionV3: string;

  constructor(context: BrowserContext, cookies: Cookie[]) {
    this.context = context;
    this.cookies = cookies;

    // Extract necessary cookies
    this.csrfToken = this.getCookieValue('csrfToken');
    this.datadomeCookie = this.getCookieValue('datadome');
    this.solvvySession = this.getCookieValue('solvvy_session');
    this.locale = this.getCookieValue('scnt_locale');
    this.scntSessionV3 = this.getCookieValue('scnt_session_v3');
  }

  private getCookieValue(name: string): string {
    const cookie = this.cookies.find((c) => c.name === name);
    if (!cookie) {
      throw new Error(`Cookie "${name}" not found`);
    }
    return cookie.value;
  }

  private getHeaders(): Record<string, string> {
    return {
      'accept': '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      'cookie': `datadome=${this.datadomeCookie}; solvvy_session=${this.solvvySession}; scnt_session_v3=${this.scntSessionV3}; scnt_locale=${this.locale}`,
      'x-csrf-token': this.csrfToken,
      'x-locale': this.locale,
    };
  }

  // Method to fetch the current cart
  async fetchCart(): Promise<any> {
    const response = await this.context.request.post('https://api.scentbird.com/graphql?opname=Cart', {
      headers: this.getHeaders(),
      data: {
        operationName: 'Cart',
        variables: {
          input: {
            address: { country: 'US' },
            priceSelection: { country: 'US' },
            purchaseLevel: 'ALL',
          },
        },
        query: `query Cart($input: CartOptionsInput!) {
          currentUser {
            data {
              cart(input: $input) {
                products {
                  id
                  uid
                  quantity
                  price
                  product {
                    id
                    uid
                    name
                    price
                    image
                    __typename
                  }
                  __typename
                }
                discounts {
                  label
                  amount
                  __typename
                }
                subTotal
                total
                __typename
              }
              __typename
            }
            error {
              __typename
            }
          }
        }`,
      },
    });

    return response.json();
  }

  // Method to modify the cart by adding products
  async addToCart(
    productItems: { productLineItemUid: string; quantity: number }[],
    metadata: { page: string; pageType: string; placement: string }
  ): Promise<any> {
    const response = await this.context.request.post('https://api.scentbird.com/graphql?opname=CartModify', {
      headers: this.getHeaders(),
      data: {
        operationName: 'CartModify',
        variables: {
          input: {
            productItems,
            metadata,
            options: {
              address: { country: 'US' },
              priceSelection: { country: 'US' },
              purchaseLevel: 'ALL',
            },
          },
        },
        query: `mutation CartModify($input: CartOperationInput!) {
          cartModify(input: $input) {
            data {
              cart {
                products {
                  id
                  uid
                  quantity
                  price
                  product {
                    id
                    uid
                    name
                    price
                    image
                  }
                }
                discounts {
                  label
                  amount
                }
                subTotal
                total
              }
            }
          }
        }`,
      },
    });

    return response.json();
  }

  // Update cookies
  async updateCookies(): Promise<void> {
    const newCookies = await this.context.cookies();
    const newDatadome = newCookies.find((c) => c.name === 'datadome')?.value;
    if (newDatadome) {
      this.datadomeCookie = newDatadome;
    }
  }
}
