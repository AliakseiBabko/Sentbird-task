import { test, expect, BrowserContext } from '@playwright/test';

// Define the types for the cookies
interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None' | undefined;
}

// Define types for the GraphQL response data structure
interface Product {
  id: string;
  quantity: number;
  price: number;
  offer: Offer | null;
}

interface Offer {
  title: string;
  amount: number;
  promo: Promo | null;
}

interface Promo {
  name: string;
  freeProductsAmount: number;
}

interface Cart {
  products: Product[];
  subTotal: number;
  total: number;
}

interface GraphQLResponse {
  data: {
    currentUser: {
      data: {
        cart: Cart;
      };
    };
  };
}

test.describe('Promo Check', () => {
  let context: BrowserContext;
  let cookies: Cookie[];

  // Setup fixture to create a context and save cookies
  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    // Send GET request to capture cookies
    const response = await context.request.get('https://www.scentbird.com/shop/travel-size/perfumes');
    cookies = await context.cookies();
  });

  test('Check promo Buy 4, Get 1 Free', async () => {
    // Add cookies to the context
    await context.addCookies(cookies);

    console.log(`Cookies: ${JSON.stringify(cookies, null, 2)}`);

    // Extract required cookies
    const csrfToken = cookies.find(cookie => cookie.name === 'csrfToken')?.value;
    const datadomeCookie = cookies.find(cookie => cookie.name === 'datadome')?.value;
    const solvvySession = cookies.find(cookie => cookie.name === 'solvvy_session')?.value;
    const locale = cookies.find(cookie => cookie.name === 'scnt_locale')?.value;
    const dynamicallyExtractedCookies = `datadome=${datadomeCookie}; solvvy_session=${solvvySession}; scnt_locale=${locale};`;

    // console.log(`CSRF Token: ${csrfToken}`);
    // console.log(`Datadome Cookie: ${datadomeCookie}`);
    // console.log(`Solvvy Session: ${solvvySession}`);
    // console.log(`Locale: ${locale}`);
    // console.log('Dynamically extracted cookies:', dynamicallyExtractedCookies);


    // Ensure cookies are defined (basic error handling)
    if (!csrfToken || !datadomeCookie || !solvvySession || !locale) {
      throw new Error('Required cookies not found');
    }

    // Send GraphQL request to get the cart and check the promo
    const response = await context.request.post('https://api.scentbird.com/graphql?opname=Cart', {
      headers: {
        'accept': '*/*',
        'content-type': 'application/json',
        'x-csrf-token': csrfToken, // Use dynamically extracted csrfToken
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'cookie': `datadome=${datadomeCookie}; solvvy_session=${solvvySession}; scnt_locale=${locale};` // Set cookies dynamically
      },
      data: {
        operationName: "Cart",
        variables: {
          input: {
            address: { country: "US" },
            priceSelection: { country: "US" },
            purchaseLevel: "ALL"
          }
        },
        query: `
          query Cart($input: CartOptionsInput!) {
            currentUser {
              data {
                cart(input: $input) {
                  products {
                    id
                    quantity
                    price
                    offer {
                      title
                      amount
                      promo {
                        name
                        freeProductsAmount
                      }
                    }
                  }
                  subTotal
                  total
                }
              }
            }
          }
        `
      }
    });

    // Type the response as GraphQLResponse to ensure proper typing
    const data: GraphQLResponse = await response.json();
    // const cart = data.data.currentUser.data.cart;

    console.log('Cart', JSON.stringify(data));

    // console.log('Cart Products:', cart.products);
    // console.log('Subtotal:', cart.subTotal);
    // console.log('Total:', cart.total);
    // console.log('Promotions:', cart.products.map(product => product.offer));

    // // Check if the promo is applied (Buy 4, Get 1 Free)
    // const promoApplied = cart.products.some(product => 
    //   product.offer && product.offer.promo && product.offer.promo.name.includes('Buy 4, Get 1 Free')
    // );

    // // Validate the promo logic
    // expect(promoApplied).toBe(true);
    
    // // Further check cart totals based on promo (example: Buy 4 Get 1 Free)
    // const expectedTotal = cart.products.length * cart.products[0].price - cart.products[0].price;
    // expect(cart.total).toBeCloseTo(expectedTotal, 2);
  });
});
