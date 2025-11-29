'use client';

import React, { useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useGetorder } from 'src/actions/orders';
import { CheckoutSummary } from '../checkout-summary';

export default function CheckoutFinalizeView({ orderId }) {
  const router = useRouter();

  const { order, orderLoading } = useGetorder(orderId);
  useEffect(() => {
    if (!orderLoading && (!order || order?.status !== '1')) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fff',
        color: '#1a1a1a',
        px: { xs: 2, md: 6 },
        py: 6,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 700 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          تکمیل سفارش
        </Typography>

        <Paper elevation={1} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            محدودیت مبلغ پرداخت آنلاین
          </Typography>

          <Typography mb={4} lineHeight={1.9} color="text.secondary">
            به دلیل محدودیت در درگاه پرداخت، امکان پرداخت آنلاین برای سفارش‌هایی با مبلغ بیش از
            <Typography component="span" fontWeight={600} ml={0.5}>
              ۲۰۰ میلیون تومان
            </Typography>
            وجود ندارد. لطفاً از طریق یکی از روش‌های زیر پرداخت خود را انجام دهید.
          </Typography>

          {/* کارت به کارت */}
          {/* <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography fontWeight={600} mb={1.5}>
              ۱. انتقال کارت به کارت
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={2}>
              شماره کارت:
              <br />
              <Typography component="span" fontWeight={700} fontSize="1.1rem">
                6037-xxxx-xxxx-xxxx
              </Typography>
            </Typography>
          </Paper> */}

          {/* شماره شبا */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography fontWeight={600} mb={1.5}>
              1. واریز از طریق شماره شبا
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={2}>
              شماره شبا:
              <br />
              <Typography
                component="span"
                fontWeight={700}
                sx={{ fontSize: { md: '1.1rem', xs: '0.9rem' } }}
                fontSize="1.1rem"
              >
                IR69 0560 6118 2800 5646 5873 01
              </Typography>
            </Typography>
          </Paper>

          {/* ارسال رسید */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography fontWeight={600} mb={1.5}>
              2. ارسال رسید پرداخت
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={2} mb={3}>
              پس از انجام واریز، تصویر رسید به همراه شماره سفارش را ارسال کنید:
            </Typography>

            <Button
              fullWidth
              variant="contained"
              href="https://wa.me/989362172533?text=سلام، رسید پرداخت سفارش شماره: "
              target="_blank"
              sx={{ py: 1.4, backgroundColor: '#1fae4b', ':hover': { backgroundColor: '#15963e' } }}
            >
              ارسال از طریق واتساپ
            </Button>
          </Paper>

          {order && (
            <Paper
              variant="outlined"
              sx={{ mt: 4, p: 2.5, borderRadius: 2, backgroundColor: '#fafafa' }}
            >
              <Typography variant="body2" color="text.secondary">
                شماره سفارش شما:
              </Typography>
              <Typography fontWeight={700} fontSize="1.2rem">
                {order.id}
              </Typography>
            </Paper>
          )}
          <Box my={3}>
            <CheckoutSummary
              checkout={{
                total: order.total_cost,
                shipping: order.shipping_cost,
                guarantee: order.guarantee_cost,
                services: order.service_cost,
                businessProfit: order.business_profit,
                subtotal: order.products_cost,
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
