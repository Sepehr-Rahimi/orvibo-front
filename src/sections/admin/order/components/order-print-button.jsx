import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Iconify } from 'src/components/iconify';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const OrderPrintButton = ({
  lang,
  orderNumber,
  choosedAccount,
  isAdmin,
  withoutPricing = false,
  buttonText,
  sx,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePrintRequest = async () => {
    setIsLoading(true);
    try {
      const requestParams = new URLSearchParams({
        lang,
        bank: choosedAccount,
        isAdmin,
        byPricing: withoutPricing,
      });
      const res = await axiosInstance.get(
        `${endpoints.orders.pdf(orderNumber)}?${requestParams.toString()}`,
        {
          responseType: 'arraybuffer',
          headers: {
            Accept: 'application/pdf',
          },
        }
      );

      const blob = new Blob([res.data], { type: 'application/pdf' });
      if (!blob) {
        toast.error('somthing is wrong with this');
        return;
      }
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `order-${orderNumber}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('یه مشکلی هست');
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
      onClick={handlePrintRequest}
      startIcon={<Iconify width={20} height={20} icon="solar:printer-2-broken" />}
      sx={{ textAlign: 'center', alignItems: 'center', alignContent: 'center', ...sx }}
    >
      {buttonText || (lang === 'en' ? 'print' : 'پرینت')}
    </LoadingButton>
  );
};
