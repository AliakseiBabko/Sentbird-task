// promo-check.spec.ts
import { test, expect, BrowserContext, Cookie } from '@playwright/test';
import { ScentbirdAPI } from '../business/api-requests/ScentbirdAPI';

test.describe('Promo Check', () => {
  let context: BrowserContext;
  let cookies: Cookie[];
  let api: ScentbirdAPI;

  // Define the products to add
  const productsToAdd = [
    { productLineItemUid: "00000000-0000-0000-0000-0000000027cd", quantity: 1 },
    { productLineItemUid: "00000000-0000-0000-0000-0000000020de", quantity: 1 },
    { productLineItemUid: "00000000-0000-0000-0000-00000000225b", quantity: 1 },
    { productLineItemUid: "00000000-0000-0000-0000-000000002275", quantity: 1 },
    { productLineItemUid: "00000000-0000-0000-0000-0000000020cb", quantity: 1 },
  ];

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();

    // Send GET request to capture cookies
    await context.request.get('https://www.scentbird.com/shop/travel-size/perfumes');

    // Capture cookies from the context after the page load
    cookies = await context.cookies();

    // Filter only the essential cookies
    cookies = cookies.filter((cookie) =>
      ['datadome', 'solvvy_session', 'csrfToken', 'scnt_locale', 'scnt_session_v3'].includes(cookie.name)
    );

    // Initialize the ScentbirdAPI with context and filtered cookies
    api = new ScentbirdAPI(context, cookies);
  });

  test('Check promo Buy 4, Get 1 Free with different products', async () => {
    // Step 1: Fetch the current cart
    const cartResponse = await api.fetchCart();

    // Print the cart data after fetching the initial cart
    console.log('Cart data after fetching:', JSON.stringify(cartResponse, null, 2));

    // Update cookies if necessary
    await api.updateCookies();

    // Define metadata (you might want to parameterize these)
    const metadata = {
      page: 'Shop travel-size perfumes',
      pageType: 'Shop',
      placement: 'Feed',
    };

    // Step 2: Add multiple different products to the cart
    const addToCartResponse = await api.addToCart(productsToAdd, metadata);

    // Print the cart data after adding products
    console.log('Cart data after adding products:', JSON.stringify(addToCartResponse, null, 2));

    // Verify the "Buy 4 Get 1 Free" discount
    const cart = addToCartResponse.data.cartModify.data.cart;

    // Check that the discount label is correct
    const discount = cart.discounts?.find((d: any) => d.label === 'Discount: Buy 4 Get 1 Free');
    expect(discount).toBeDefined();
    expect(discount?.amount).toBe(2195); // The discount amount should be 2195 cents or $21.95

    // Check that there are 5 products in the cart, each with quantity 1
    expect(cart.products.length).toBe(5);
    cart.products.forEach((product: any) => {
      expect(product.quantity).toBe(1);
    });

    // Calculate the expected subtotal
    const expectedSubTotal = cart.products.reduce((acc: number, product: any) => acc + product.price * product.quantity, 0);
    expect(cart.subTotal).toBe(expectedSubTotal);

    // Check that the total is correctly calculated after the discount
    expect(cart.total).toBe(cart.subTotal - discount?.amount);
  });

  // Cleanup after each test
  test.afterEach(async () => {
    await context.close();
  });
});
