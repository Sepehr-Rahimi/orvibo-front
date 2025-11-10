import React from 'react';

import { Box } from '@mui/material';

import { useCheckoutContext } from './context';
import { CheckoutProductCard } from './checkout-product-card';

export const CheckoutProductCardList = () => {
  const checkout = useCheckoutContext();
  return (
    <>
      {checkout?.items?.map((item) => (
        <CheckoutProductCard
          product={item}
          onDelete={checkout.onDeleteCart}
          onIncreaseQuantity={checkout.onIncreaseQuantity}
          onDecreaseQuantity={checkout.onDecreaseQuantity}
        />
      ))}
    </>
  );
};
