'use client';

import React, { useState, useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';

import { Box, Stack, Container, CircularProgress } from '@mui/material';

import { useVerifyPayment } from 'src/actions/orders';

import { PaymentError } from '../payment-error';
import { PaymentSuccess } from '../payment-success';

export const PaymentResultView = () => {
  const params = useSearchParams();
  const authority = params.get('Authority');
  const status = params.get('Status');
  // const theme = useTheme();

  const { verifyPayment, verifyPaymentError, verifyPaymentLoading } = useVerifyPayment(authority);

  const isSuccess = verifyPayment?.verifyStatus === 'OK';

  if (!authority || !status) redirect('/');

  if (status !== 'OK') return <PaymentError />;

  return (
    <Container maxWidth="sm">
      <Stack alignItems="center" justifyContent="center" height="90vh">
        {verifyPaymentLoading && <CircularProgress />}
        {!verifyPaymentLoading && (
          <Box>
            {isSuccess ? (
              <PaymentSuccess refId={verifyPayment?.ref_id} />
            ) : (
              <PaymentError message={verifyPaymentError?.message} />
            )}
          </Box>
        )}
      </Stack>
    </Container>
  );
};
