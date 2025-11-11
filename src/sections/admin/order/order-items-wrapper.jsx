import React, { useState, useEffect } from 'react';

import { OrderItemsMobileList } from './order-items-mobile-list';
import { OrderItemsDesktopList } from './order-items-desktop-list';

export const OrderItemsWrapper = ({ items }) => {
  const [isMobile, setIsMobile] = useState();

  //   const checkout = useCheckoutContext();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? <OrderItemsMobileList items={items} /> : <OrderItemsDesktopList items={items} />}
    </>
  );
};
