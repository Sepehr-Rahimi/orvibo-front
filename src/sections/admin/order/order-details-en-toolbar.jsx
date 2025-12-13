import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Box, Button, Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDateTime, fENDateTime } from 'src/utils/format-time';
import axiosInstance, { endpoints } from 'src/utils/axios';

import { blockedTransitions, ORDER_PAYMENT_STATUS_EN, ORDER_STATUS_OPTIONS_EN } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { LogoBlack } from 'src/components/logo/logoBlack';
import { usePopover } from 'src/components/custom-popover';

import { OrderStatusSelect } from './order-status-select';
import { DeleteConfirmDialog } from './delete-confirm-dialog';

// ----------------------------------------------------------------------

export function OrderDetailsToolbarEn({
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

  const [printLoadint, setPrintLoading] = useState(false);

  const handlePrintRequest = async () => {
    setPrintLoading(true);
    try {
      const requestParams = new URLSearchParams({
        bank: choosedAccount,
        en: true,
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
      setPrintLoading(false);
    }
  };

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
              <Typography variant="h4"> order {orderNumber} </Typography>
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

            <Box width="fit-content">
              <Typography variant="body2" sx={{ color: 'text.disabled', direction: 'rtl' }}>
                {fENDateTime(createdAt)}
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <LogoBlack className="print-only" />

        <Stack
          flexGrow={1}
          spacing={1.5}
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          justifyItems="center"
          alignContent="center"
          className="printOff"
        >
          {isAdmin && (
            <>
              {/* <Button
                color="inherit"
                variant="outlined"
                endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                onClick={popover.onOpen}
                sx={{ textTransform: 'capitalize', height: 40 }}
              >
                {statusFull?.label}
              </Button> */}
              <Stack direction={{ xs: 'column', md: 'row' }} gap={1}>
                <Stack direction="row" gap={1}>
                  {statusFull && (
                    <OrderStatusSelect
                      handleStatusChange={(event) => onChangeStatus(event.target.value, 'status')}
                      menuItemDisabled={(option) =>
                        !blockedTransitions[statusFull.value].includes(option.value)
                      }
                      options={ORDER_STATUS_OPTIONS_EN}
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
                      options={ORDER_PAYMENT_STATUS_EN}
                      selectedStatus={paymentStatusFull}
                    />
                    // <FormControl variant="outlined" sx={{ width: 170, height: 40 }} size="small">
                    //   <InputLabel id="paymentStatusLabel">وضعیت پرداخت</InputLabel>
                    //   <Select
                    //     // labelId="paymentStatusLabel"
                    //     sx={{ height: 40 }}
                    //     size="small"
                    //     value={paymentStatusFull?.value}
                    //     defaultValue={paymentStatusFull?.value}
                    //     onChange={(event) => onChangeStatus(event.target.value, 'payment_status')}
                    //     variant="outlined"
                    //     disabled={typeOfPayment === '1'}
                    //   >
                    //     {ORDER_PAYMENT_STATUS.map((option) => (
                    //       <MenuItem
                    //         value={option.value}
                    //         // defaultChecked={option.value === paymentStatusFull?.value}
                    //       >
                    //         {option.label}
                    //       </MenuItem>
                    //     ))}
                    //   </Select>
                    // </FormControl>
                  )}
                </Stack>
                <Stack direction="row" gap={1} justifyContent="space-between">
                  <Button
                    color="inherit"
                    variant="contained"
                    startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
                    sx={{ height: 40 }}
                    onClick={handlePrintRequest}
                    disabled={printLoadint}
                  >
                    print
                  </Button>
                  <Button
                    sx={{ height: 40 }}
                    color="primary"
                    variant="contained"
                    startIcon={<Iconify icon="solar:pen-bold" />}
                    onClick={() => router.push(paths.adminDashboard.factor.edit(orderNumber))}
                  >
                    edit
                  </Button>
                  {statusFull && paymentStatusFull && (
                    <Button
                      color="error"
                      variant="contained"
                      sx={{ height: 40 }}
                      startIcon={<Iconify icon="solar:trash-bin-minimalistic-broken" />}
                      disabled={!(statusFull.value === '1' && paymentStatusFull.value === 0)}
                      onClick={dialog.onTrue}
                    >
                      delete
                    </Button>
                  )}
                  <Box>
                    <Link
                      href="../"
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
                      FA
                    </Link>
                  </Box>
                </Stack>
              </Stack>
            </>
          )}

          {/* <Button color="inherit" variant="contained" startIcon={<Iconify icon="solar:pen-bold" />}>
            Edit
          </Button> */}
        </Stack>
      </Stack>

      {/* <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'top-right' } }}
      >
        <MenuList>
          {statusOptions.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === status}
              disabled={!blockedTransitions[statusFull?.value]?.includes(option.value)}
              onClick={() => {
                popover.onClose();
                onChangeStatus(option.value, 'status');
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover> */}
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
