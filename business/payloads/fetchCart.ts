import { FetchCartPayload } from './types';

export const fetchCartPayload: FetchCartPayload = {
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
            ...Cart
            __typename
          }
          __typename
        }
        error {
          ... on SecurityError {
            securityErrorCode: errorCode
            message
            __typename
          }
          ... on ServerError {
            serverErrorCode: errorCode
            message
            __typename
          }
          __typename
        }
        __typename
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

    fragment CartSubscription on SubscriptionLineItem {
      label
      note
      price
      plan {
        name
        productsPerPeriod
        __typename
      }
      coupon {
        id
        type
        code
        origin
        discountAmount
        discountPercentage
        shouldCharge
        freeProduct {
          ...CartProduct
          __typename
        }
        __typename
      }
      __typename
    }

    fragment CartGiftRecipient on GiftCardRecipient {
      name
      email
      message
      date
      __typename
    }

    fragment CartGiftSubscription on GiftSubscriptionLineItem {
      label
      offer {
        description
        freeProductsAmount
        image
        priceOfferText
        whatYouAreGetting
        __typename
      }
      price
      plan {
        billingPeriod
        __typename
      }
      recipient {
        ...CartGiftRecipient
        __typename
      }
      __typename
    }

    fragment CartGiftSender on GiftCardSender {
      name
      email
      __typename
    }

    fragment CartGiftCard on GiftCardLineItem {
      product {
        id
        uid
        __typename
      }
      type
      label
      price
      recipient {
        ...CartGiftRecipient
        __typename
      }
      sender {
        ...CartGiftSender
        __typename
      }
      __typename
    }

    fragment CartProducts on ProductLineItem {
      id
      uid
      quantity
      offer
      price
      parentPurchaseTradingItemId
      parentPurchaseTradingItemUid
      product {
        ...CartProduct
        __typename
      }
      drift {
        description
        image
        name
        starterSet
        price {
          amountCents
          currencyCode
          __typename
        }
        discountPrice {
          amountCents
          currencyCode
          __typename
        }
        __typename
      }
      variety {
        description
        image
        name
        __typename
      }
      __typename
    }

    fragment CartQueueItems on QueueLineItem {
      id
      price
      product {
        ...CartProduct
        __typename
      }
      __typename
    }

    fragment CartSubscriptionPromos on SubscriptionPromo {
      title
      amount
      promo {
        id
        uid
        image
        name
        unit
        volume
        rebrandImage
        __typename
      }
      __typename
    }

    fragment CartLimitedDropItems on LimitedDropLineItem {
      countdownState
      expiredDate
      id
      uid
      image
      isPromo
      price
      product {
        ...CartProduct
        __typename
      }
      productState
      quantity
      giftProducts {
        title
        __typename
      }
      __typename
    }

    fragment CartDiscounts on DiscountLineItem {
      label
      note
      unit
      amount
      coupon {
        code
        origin
        __typename
      }
      __typename
    }

    fragment CartShipping on ShippingLineItem {
      label
      note
      price
      freeShippingRemain
      freeShippingProgress
      __typename
    }

    fragment CartCredits on CreditLineItem {
      label
      amount
      __typename
    }

    fragment CartPurchaseProgress on PurchaseProgress {
      ecommercePromoProgress {
        promoId
        freeEcommercePromoGoal
        freeEcommercePromoProgress
        freeEcommercePromoRemain
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
    }
  `
};
