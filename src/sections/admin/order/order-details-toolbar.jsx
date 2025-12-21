import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDateTime } from 'src/utils/format-time';
import axiosInstance, { endpoints } from 'src/utils/axios';

import { blockedTransitions, ORDER_PAYMENT_STATUS, ORDER_STATUS_OPTIONS } from 'src/_mock';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { LogoBlack } from 'src/components/logo/logoBlack';
import { usePopover } from 'src/components/custom-popover';

import { OrderStatusSelect } from './order-status-select';
import { DeleteConfirmDialog } from './delete-confirm-dialog';
import { OrderFinalizeButton } from './components/order-finalize-button';
import { OrderPrintButton } from './components/order-print-button';
import { OrderSelectPdfDownlowd } from './order-select-pdf-download';

// ----------------------------------------------------------------------

export function OrderDetailsToolbar({
  status,
  paymentStatus,
  typeOfPayment,
  backLink,
  createdAt,
  orderNumber,
  statusOptions,
  paymentStatusOptions,
  onChangeStatus,
  isAdmin,
  choosedAccount,
}) {
  const router = useRouter();

  const dialog = useBoolean();

  const statusFull = statusOptions.find((s) => +s.value === +status);
  const paymentStatusFull = paymentStatusOptions.find((s) => s.value === +paymentStatus);
  // console.log(paymentStatus);
  // console.log(paymentStatusFull);

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        className="print-flex-container"
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <Stack spacing={1} direction="row" alignItems="flex-start">
          <IconButton component={RouterLink} href={backLink} className="printOff">
            <Iconify icon="eva:arrow-ios-forward-fill" />
          </IconButton>

          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h4"> سفارش {orderNumber} </Typography>
              {/* <Label
                variant="soft"
                color={
                  (status === '2' && 'success') ||
                  // (status === 'pending' && 'warning') ||
                  (status === '3' && 'error') ||
                  'default'
                }
              >
                {statusFull?.label}
              </Label> */}

              <Typography variant="body1" mt={0.5}>
                {statusFull?.label}{' '}
                <Typography component="span" color="text.secondary">
                  / {paymentStatusFull?.label}
                </Typography>
              </Typography>
            </Stack>

            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {fDateTime(createdAt)}
            </Typography>
          </Stack>
        </Stack>
        <LogoBlack className="print-only" />

        <Stack
          flexGrow={1}
          spacing={1.5}
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          justifyItems="center"
          alignContent="center"
          className="printOff"
        >
          <Stack direction="row" gap={1} height={40} width={1} justifyContent="end">
            <OrderSelectPdfDownlowd
              choosedAccount={choosedAccount}
              isAdmin={isAdmin}
              orderNumber={orderNumber}
            />

            {!isAdmin && paymentStatus === 0 && <OrderFinalizeButton orderId={orderNumber} />}
          </Stack>
          {isAdmin && (
            <>
              <Stack direction="row" gap={1}>
                {statusFull && (
                  <OrderStatusSelect
                    handleStatusChange={(event) => onChangeStatus(event.target.value, 'status')}
                    menuItemDisabled={(option) =>
                      !blockedTransitions[statusFull.value].includes(option.value)
                    }
                    options={ORDER_STATUS_OPTIONS}
                    selectedStatus={statusFull}
                  />
                )}
                {paymentStatusFull && (
                  <OrderStatusSelect
                    handleStatusChange={(event) =>
                      onChangeStatus(event.target.value, 'payment_status')
                    }
                    menuItemDisabled={(option) =>
                      typeOfPayment === '1' && [0, 1].includes(option.value)
                    }
                    options={ORDER_PAYMENT_STATUS}
                    selectedStatus={paymentStatusFull}
                  />
                )}
              </Stack>
              <Stack direction="row" width={1} gap={1} justifyContent="space-between">
                <Button
                  sx={{ height: 40, flex: 1 }}
                  color="primary"
                  variant="contained"
                  startIcon={<Iconify icon="solar:pen-bold" />}
                  onClick={() => router.push(paths.adminDashboard.factor.edit(orderNumber))}
                >
                  ویرایش
                </Button>
                {statusFull && paymentStatusFull && (
                  <Button
                    color="error"
                    variant="contained"
                    sx={{ height: 40, flex: 1 }}
                    startIcon={<Iconify icon="solar:trash-bin-minimalistic-broken" />}
                    disabled={!(statusFull.value === '1' && paymentStatusFull.value === 0)}
                    onClick={dialog.onTrue}
                  >
                    حذف
                  </Button>
                )}
                <Box>
                  <Link
                    href="./en"
                    underline="none"
                    sx={{
                      fontWeight: 'bold',
                      color: 'primary.main',
                      cursor: 'pointer',
                      // ml: 2,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    EN
                  </Link>
                </Box>
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
      <DeleteConfirmDialog
        open={dialog.value}
        onClose={dialog.onFalse}
        orderId={orderNumber}
        mutateData={() => {
          router.prefetch(`${paths.adminDashboard.order.root}`);
          router.push(`${paths.adminDashboard.order.root}`);
        }}
      />
    </>
  );
}
