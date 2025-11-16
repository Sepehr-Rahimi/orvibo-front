'use client';

import { useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { trackMatomoEvent } from 'src/utils/helper';

import { getProduct } from 'src/actions/product-ssr';
import { PRODUCT_CHECKOUT_STEPS } from 'src/_mock/_product';

import { CheckoutCart } from '../checkout-cart';
import { useCheckoutContext } from '../context';
import { CheckoutSteps } from '../checkout-steps';
import { CheckoutPayment } from '../checkout-payment';
import { CheckoutOrderComplete } from '../checkout-order-complete';
import { CheckoutBillingAddress } from '../checkout-billing-address';

// ----------------------------------------------------------------------

export function CheckoutView() {
  const checkout = useCheckoutContext();

  useEffect(() => {
    checkout.initialStep();

    // if (window._mtm) {
    //   // console.log(window._mtm);
    //   window._mtm.push({
    //     event: 'checkout-start',
    //   });
    // }
    // trackMatomoEvent('checkout-start');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   // update checkout items price and discount_price
  //   const checkoutItems = checkout.items;
  //   if (!checkoutItems || checkoutItems.length <= 0) return;
  //   // checkout.resetCart();
  //   async function updateCheckoutPrices() {
  //     // console.log(checkout);

  //     const updatedCheckout = await Promise.all(
  //       checkoutItems?.map(async (checkoutItem) => {
  //         // console.log(checkoutItem);
  //         const res = await getProduct(checkoutItem.id);

  //         // if (!res) checkout.resetCart();
  //         const product = res?.data;

  //         // console.log(product);
  //         return { ...checkoutItem, price: product?.price, discount_price: product.discount_price };
  //       })
  //     );

  //     // console.log(updatedCheckout);

  //     if (updatedCheckout.length <= 0) return;
  //     checkout.onUpdateItems(updatedCheckout);
  //   }
  //   updateCheckoutPrices();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [checkout.items?.map((i) => i.id).join(',')]);

  return (
    <Container sx={{ mb: 10 }}>
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        تسویه حساب
      </Typography>

      <Grid container justifyContent={checkout.completed ? 'center' : 'flex-start'}>
        <Grid xs={12} md={8}>
          <CheckoutSteps activeStep={checkout.activeStep} steps={PRODUCT_CHECKOUT_STEPS} />
        </Grid>
      </Grid>

      <>
        {checkout.activeStep === 0 && <CheckoutCart />}

        {checkout.activeStep === 1 && <CheckoutBillingAddress />}

        {checkout.activeStep === 2 && <CheckoutPayment />}

        {checkout.completed && (
          <CheckoutOrderComplete open onReset={checkout.onReset} onDownloadPDF={() => {}} />
        )}
      </>
    </Container>
  );
}
