import React, { useEffect } from 'react';

import { Box, Button, Divider, Typography } from '@mui/material';

// import { trackMatomoEvent } from 'src/utils/helper';

import OrderCompleteIllustration from 'src/assets/illustrations/order-complete-illustration';

import { Iconify } from 'src/components/iconify';

import { useCheckoutContext } from '../checkout/context';

export const PaymentSuccess = ({ refId }) => {
  const checkout = useCheckoutContext();
  useEffect(() => checkout.resetCart());

  // useEffect(() => trackMatomoEvent('checkout-step', { checkoutStep: 'purchased' }));

  return (
    <Box
      gap={5}
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{
        py: 5,
        m: 'auto',
        maxWidth: 480,
        textAlign: 'center',
        px: { xs: 2, sm: 0 },
      }}
    >
      <Typography variant="h4">از خرید شما متشکریم</Typography>

      <OrderCompleteIllustration />

      <Box>
        <Typography my={4}>سفارش شما ثبت شد</Typography>
        {refId && <Typography my={2}>شماره تراکنش : {refId}</Typography>}
        {/* <Link>01dc1370-3df6-11eb-b378-0242ac130002</Link> */}
        <Typography>با شما ظرف 48 ساعت کاری تماس گرفته میشود.</Typography>
        <Typography>اگر سؤالی دارید، با ما تماس بگیرید. سپاس</Typography>
      </Box>

      <Divider sx={{ width: 1, borderStyle: 'dashed' }} />

      <Box gap={2} display="flex" flexWrap="wrap" justifyContent="center">
        <Button
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          ادامه خرید
        </Button>
        <Button
          size="large"
          color="inherit"
          variant="contained"
          href="/"
          startIcon={<Iconify icon="solar:home-2-outline" />}
        >
          خانه
        </Button>

        {/* <Button
            size="large"
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-download-fill" />}
            onClick={onDownloadPDF}
          >
            دانلود فایل PDF
          </Button> */}
      </Box>
    </Box>
  );
};
