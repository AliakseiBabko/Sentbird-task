import test, { expect } from '../Fixtures/cookiesFixture';
import { Cookie } from '@playwright/test';
import { DiscountLineItem } from '../business/payloads/types';
import { fetchCart } from '../business/payloads/fetchCartHelper';
import { createCartModifyPayload } from '../business/payloads/cartModifyHelper';
import { Cart } from '../business/payloads/types';
import { serializeCookies } from '../business/payloads/utilities';

test.describe('Promo Check', () => {
  test('Check promo Buy 4, Get 1 Free and its removal', async ({ context }) => {
    // Step 0: Fetch the current cart to ensure it's empty
    const fetchCartResponse = await fetchCart(context);
    console.log('Cart data before adding products:', JSON.stringify(fetchCartResponse, null, 2));

    // Step 1: Add 5 products to the cart
    const addToCartPayload = createCartModifyPayload(
      "00000000-0000-0000-0000-0000000020cb", // productLineItemUid
      5, // quantity
      "Feed" // placement
    );

    // Send the add to cart request
    const addToCartResponse = await context.request.post(`https://api.scentbird.com/graphql?opname=CartModify`, {
      headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'cookie': serializeCookies(await context.cookies()),
        'x-csrf-token': (await context.cookies()).find((cookie: Cookie) => cookie.name === 'csrfToken')?.value || '',
        'x-locale': (await context.cookies()).find((cookie: Cookie) => cookie.name === 'scnt_locale')?.value || ''
      },
      data: addToCartPayload
    });

    const addToCartData = await addToCartResponse.json();
    console.log('Cart data after adding products:', JSON.stringify(addToCartData, null, 2));

    // Step 2: Verify the "Buy 4 Get 1 Free" discount
    const cartAfterAdd: Cart = addToCartData.data.cartModify.data.cart;
    const discount = cartAfterAdd.discounts?.find((d: DiscountLineItem) => d.label === 'Discount: Buy 4 Get 1 Free');
    expect(discount).toBeDefined();
    expect(discount?.amount).toBe(2195); // 2195 cents or $21.95
       expect(cartAfterAdd.products?.[0].quantity).toBe(5); // 5 products in the cart
    expect(cartAfterAdd.subTotal).toBe(10975); // 5 * $21.95
    expect(cartAfterAdd.total).toBe(cartAfterAdd.subTotal - (discount?.amount || 0));

    // Step 3: Remove 1 product from the cart (set quantity to 4)
    const removeFromCartPayload = createCartModifyPayload(
      "00000000-0000-0000-0000-0000000020cb", // productLineItemUid
      4, // quantity
      "Cart" // placement
    );

    // Send the remove from cart request
    const removeFromCartResponse = await context.request.post(`https://api.scentbird.com/graphql?opname=CartModify`, {
      headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'cookie': serializeCookies(await context.cookies()),
        'x-csrf-token': (await context.cookies()).find((cookie: Cookie) => cookie.name === 'csrfToken')?.value || '',
        'x-locale': (await context.cookies()).find((cookie: Cookie) => cookie.name === 'scnt_locale')?.value || ''
      },
      data: removeFromCartPayload
    });

    const removeFromCartData = await removeFromCartResponse.json();
    console.log('Cart data after removing products:', JSON.stringify(removeFromCartData, null, 2));

    // Step 4: Verify that the discount is no longer active
    const cartAfterRemove: Cart = removeFromCartData.data.cartModify.data.cart;
    const discountAfterRemove = cartAfterRemove.discounts?.find((d: DiscountLineItem) => d.label === 'Discount: Buy 4 Get 1 Free');
    expect(discountAfterRemove).toBeUndefined();
    expect(cartAfterRemove.products?.length).toBe(1);
    expect(cartAfterRemove.products?.[0].quantity).toBe(4);
    expect(cartAfterRemove.subTotal).toBe(8780); // 4 * $21.95
    expect(cartAfterRemove.total).toBe(cartAfterRemove.subTotal); // No discount applied
  });
});
