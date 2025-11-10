import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { useCheckoutContext } from './context';
import { CheckoutCartProductList } from './checkout-cart-product-list';
import { CheckoutProductCardList } from './checkout-product-card-list';

export const CheckoutProductListWrapper = () => {
  const [isMobile, setIsMobile] = useState();

  const checkout = useCheckoutContext();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <CheckoutProductCardList />
      ) : (
        <CheckoutCartProductList
          products={checkout.items}
          onDelete={checkout.onDeleteCart}
          onIncreaseQuantity={checkout.onIncreaseQuantity}
          onDecreaseQuantity={checkout.onDecreaseQuantity}
        />
      )}
    </>
  );
};
