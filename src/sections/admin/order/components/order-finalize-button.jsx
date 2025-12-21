'use client';

import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const OrderFinalizeButton = ({ orderId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleFinalizeOrder = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(endpoints.orders.finalizeOrder, {
        id: orderId,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}${paths.product.checkout_Result}`,
      });
      if (res.data?.success === true && res.data?.paymentUrl) {
        router.push(res.data.paymentUrl);
      } else {
        toast.info(res.data?.message);
      }
    } catch (error) {
      toast.error('یه مشکلی پیش اومد!');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <LoadingButton
      loading={isLoading}
      variant="contained"
      color="inherit"
      onClick={handleFinalizeOrder}
      startIcon={<Iconify width={16} height={16} icon="solar:check-circle-broken" />}
    >
      پرداخت سفارش
    </LoadingButton>
  );
};
