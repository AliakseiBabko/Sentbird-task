export const cartModifyTemplate = (productUid: string, quantity: number, placement: string) => ({
  operationName: "CartModify",
  variables: {
    input: {
      productItems: [
        {
          productLineItemUid: productUid,
          quantity: quantity
        }
      ],
      metadata: {
        page: "Shop travel-size perfumes",
        pageType: "Shop",
        placement: placement
      },
      options: {
        address: { country: "US" },
        priceSelection: { country: "US" },
        purchaseLevel: "ALL"
      }
    }
  },
  query: `mutation CartModify($input: CartOperationInput!) {
    cartModify(input: $input) {
      data {
        cart {
          ...Cart
          __typename
        }
        __typename
      }
      error {
        __typename
      }
    }
  }
  
  fragment CartProduct on Product {
    id
    uid
    image
    rebrandImage
    skuImage: image(fullSizeImage: false)
    fullName
    name
    brandInfo {
      name
      __typename
    }
    volume
    unit
    gender
    theEdit
    category
    typeGroup
    type
    upchargePrice
    rebrandLabels {
      marketing
      extra
      characteristic
      __typename
    }
    __typename
  }
  
  fragment Cart on Cart {
    subscription {
      ...CartSubscription
      __typename
    }
    giftSubscription {
      ...CartGiftSubscription
      __typename
    }
    giftCard {
      ...CartGiftCard
      __typename
    }
    ecommercePromos {
      ...CartProducts
      __typename
    }
    products {
      ...CartProducts
      futureDiscounts {
        key
        __typename
      }
      __typename
    }
    queueItems {
      ...CartQueueItems
      __typename
    }
    subscriptionPromos {
      ...CartSubscriptionPromos
      __typename
    }
    limitedDropItems {
      ...CartLimitedDropItems
      __typename
    }
    discounts {
      ...CartDiscounts
      __typename
    }
    shipping {
      ...CartShipping
      __typename
    }
    credits {
      ...CartCredits
      __typename
    }
    purchaseProgress {
      ...CartPurchaseProgress
      __typename
    }
    subTotal
    total
    __typename
`
});