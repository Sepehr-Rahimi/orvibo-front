import React from 'react';

import { Box, Button, Divider, Typography } from '@mui/material';

import { PaymentFailedIllustration } from 'src/assets/illustrations/validate-error';

import { Iconify } from 'src/components/iconify';

export const PaymentError = ({ message }) => (
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
    <Typography variant="h4">پرداخت ناموفق</Typography>

    <PaymentFailedIllustration />

    <Typography>
      {/* <Link>01dc1370-3df6-11eb-b378-0242ac130002</Link> */}
      {message ??
        'در ثبت سفارش مشکلی پیش آمده. اگر مبلغی پرداخت شده، طی ۷۲ ساعت به حساب شما بازخواهد گشت '}
      <br />
      اگر سؤالی دارید، با ما تماس بگیرید. سپاس
    </Typography>

    <Divider sx={{ width: 1, borderStyle: 'dashed' }} />

    <Box gap={2} display="flex" flexWrap="wrap" justifyContent="center">
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
