import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';

import { OrderItemsDesktopListEn } from './order-items-en-desktop-list';
import { OrderItemsMobileListEn } from './order-items-en-mobile-list';

export const OrderItemsWrapperEn = ({ items }) => {
  const [isMobile, setIsMobile] = useState();

  //   const checkout = useCheckoutContext();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ overflowX: 'auto' }}>
      {isMobile ? (
        <OrderItemsMobileListEn items={items} />
      ) : (
        <OrderItemsDesktopListEn items={items} />
      )}
    </Box>
  );
};
