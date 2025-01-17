import { CartModifyPayload } from './types';
import { cartModifyQuery } from './queries';

/**
 * Creates a CartModify payload for adding or removing products.
 * @param productLineItemUid - The UID of the product line item.
 * @param quantity - The desired quantity (set to 0 to remove).
 * @param placement - The placement context ('Feed' or 'Cart').
 * @returns A CartModifyPayload object.
 */
export const createCartModifyPayload = (
  productLineItemUid: string,
  quantity: number,
  placement: 'Feed' | 'Cart'
): CartModifyPayload => ({
  operationName: "CartModify",
  variables: {
    input: {
      productItems: [
        {
          productLineItemUid,
          quantity
        }
      ],
      metadata: {
        page: "Shop travel-size perfumes",
        pageType: "Shop",
        placement
      },
      options: {
        address: { country: "US" },
        priceSelection: { country: "US" },
        purchaseLevel: "ALL"
      }
    }
  },
  query: cartModifyQuery
});
