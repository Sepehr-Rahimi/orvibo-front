import { toast } from 'sonner';
import React, { useState } from 'react';

import { Box, Button, Menu, MenuItem, CircularProgress } from '@mui/material';

import axiosInstance, { endpoints } from 'src/utils/axios';

import { Iconify } from 'src/components/iconify';

const downloadOptions = [
  {
    title: 'کل فاکتور',
    enTitle: 'all invoice',
    onDownload: (handle) => handle?.({ withoutPricing: false }),
  },
  {
    title: 'لیست محصولات',
    enTitle: 'items list',
    onDownload: (handle) => handle?.({ withoutPricing: true }),
  },
];

export const OrderSelectPdfDownlowd = ({ isAdmin, orderNumber, choosedAccount, lang = 'fa' }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handlePrintRequest = async ({ withoutPricing }) => {
    setIsLoading(true);
    handleClose();

    try {
      const requestParams = new URLSearchParams({
        lang,
        bank: choosedAccount,
        isAdmin,
        withoutPricing,
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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} disabled={isLoading} variant="outlined">
        {isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <Iconify icon="solar:download-minimalistic-broken" width={20} height={20} />
        )}
      </Button>

      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        {downloadOptions.map((singleOption) => (
          <MenuItem
            onClick={() => singleOption.onDownload(handlePrintRequest)}
            key={singleOption.title}
          >
            {lang === 'en' ? singleOption.enTitle : singleOption.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
