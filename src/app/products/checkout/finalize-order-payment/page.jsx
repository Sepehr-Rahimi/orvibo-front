import React from 'react';
import { getOrder } from 'src/actions/orders-ssr';
import CheckoutFinalizeView from 'src/sections/checkout/view/checkout-finalize-view';

const Page = async ({ searchParams }) => {
  const orderId = searchParams?.orderId;

  return <CheckoutFinalizeView orderId={orderId} />;
};

export default Page;
